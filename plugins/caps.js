// Output-length caps, ported from the four *-body-cap hooks. Each denies when
// THIS call sets a field longer than its cap; state-only saves (field absent)
// pass. Fail closed on anything unparseable.
//
//   linear-issue-body-cap     : mcp linear save_issue, description > 600
//   linear-comment-body-cap   : mcp linear save_comment, body > 300
//   synthesis-body-cap        : bash, gh ... bot-review.yml, -f body= > 300
//   reviewer-inline-comment-cap: bash, gh api pulls/.../{reviews,comments} POST
//                                + gh pr review --body / --body-file / heredoc
//                                any body > 300
//
// MCP tool names are matched loosely (/linear/ + save_issue/save_comment) since
// the exact namespaced name depends on the configured server id.

const ISSUE_CAP = 600
const COMMENT_CAP = 300
const SYNTH_CAP = 300
const INLINE_CAP = 300

/**
 * Extract the review body from a gh pr review command.
 * Returns the body string, null (unparseable -- fail closed), or undefined (no body flag).
 */
function _extractReviewBody(cmd) {
  // --body-file or -F: cannot read file content, signal fail-closed.
  if (/--body-file\b/.test(cmd) || /(?:^|\s)-F\s/.test(cmd)) {
    return null
  }

  // --body "$(cat <<'MARKER' ...)" heredoc form. Check before simple quoted
  // string: the $(cat ...) value sits inside quotes and may itself contain
  // embedded quotes, which would truncate the simple match early.
  const heredoc = cmd.match(
    /--body\s*\$\(cat <<'?(\w+)'?[\s\S]*?\n([\s\S]*?)\n\s*\1\s*\)/
  )
  if (heredoc) {
    return heredoc[2].trim()
  }

  // --body "..." or --body '...' with optional escape sequences.
  const simple = cmd.match(/--body\s+(['"])((?:\\\1|(?!\1)[\s\S])*?)\1/)
  if (simple) {
    return simple[2].replace(/\\(['"\\])/g, "$1")
  }

  return undefined
}

/** @type {import("@opencode-ai/plugin").Plugin} */
export const Caps = async () => {
  return {
    "tool.execute.before": async (input, output) => {
      const tool = input.tool
      const args = output?.args || {}

      // Linear issue body cap (only when description is being set).
      if (/linear/i.test(tool) && /save_issue/i.test(tool)) {
        const d = args.description
        if (typeof d === "string" && d.length > ISSUE_CAP) {
          throw new Error(
            `Issue body is ${d.length} chars; the cap is ${ISSUE_CAP}. Trim the body to the ask + AC and move the depth (options, rationale, design detail) into a designs/ doc linked via the issue links field.`
          )
        }
        return
      }

      // Linear comment body cap.
      if (/linear/i.test(tool) && /save_comment/i.test(tool)) {
        const b = args.body
        if (typeof b === "string" && b.length > COMMENT_CAP) {
          throw new Error(
            `Comment body is ${b.length} chars; the cap is ${COMMENT_CAP}. Collapse to the clause that matters; push depth into the issue body, a linked designs/ doc, or the git log.`
          )
        }
        return
      }

      // Bash-gated caps.
      if (tool === "bash") {
        const cmd = typeof args.command === "string" ? args.command : ""
        if (!cmd) return

        // synthesis-body-cap: gated to bot-review.yml, the -f body=... value.
        if (cmd.includes("bot-review.yml")) {
          const m = cmd.match(/-f body=(['"])([\s\S]*?)\1/)
          if (m && m[2].length > SYNTH_CAP) {
            throw new Error(
              `Synthesis verdict body is ${m[2].length} chars; the cap is ${SYNTH_CAP}. Collapse to the resolved-findings clause and the verdict; the inline threads carry the detail.`
            )
          }
        }

        // reviewer-inline-comment-cap: POST to pulls/.../{reviews,comments},
        // worst "body":"..." value.
        if (/pulls\/[^ ]*\/(reviews|comments)/.test(cmd) && /(-X )?POST/.test(cmd)) {
          const bodies = [...cmd.matchAll(/"body"\s*:\s*"((?:[^"\\]|\\.)*)"/g)]
          let worst = 0
          for (const b of bodies) {
            let v = b[1]
            try {
              v = JSON.parse('"' + b[1] + '"')
            } catch {}
            worst = Math.max(worst, v.length)
          }
          if (worst > INLINE_CAP) {
            throw new Error(
              `An inline review comment is ${worst} chars; the cap is ${INLINE_CAP}. A finding is one clause: name the concern and the fix, anchored to the line. Push the reasoning into the dispatcher report, not the PR thread.`
            )
          }
        }

        // reviewer-inline-comment-cap: gh pr review form (--body, --body-file,
        // heredoc). Exists alongside the REST API form above.
        if (/\bgh pr review\b/.test(cmd)) {
          const body = _extractReviewBody(cmd)
          if (body === null) {
            throw new Error(
              `Review body provided via --body-file or -F; the cap validator cannot inspect file content. Use --body "..." with inline text so the ${INLINE_CAP}-char cap can be checked.`
            )
          }
          if (typeof body === "string" && body.length > INLINE_CAP) {
            throw new Error(
              `A gh pr review body is ${body.length} chars; the cap is ${INLINE_CAP}. A finding is one clause: name the concern and the fix, anchored to the line. Push the reasoning into the dispatcher report, not the PR thread.`
            )
          }
        }
      }
    },
  }
}
