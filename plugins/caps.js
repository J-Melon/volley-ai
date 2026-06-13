// Output-length caps, ported from the four *-body-cap hooks. Each denies when
// THIS call sets a field longer than its cap; state-only saves (field absent)
// pass. Fail open on anything unparseable.
//
//   linear-issue-body-cap     : mcp linear save_issue, description > 600
//   linear-comment-body-cap   : mcp linear save_comment, body > 300
//   synthesis-body-cap        : bash, gh ... bot-review.yml, -f body= > 300
//   reviewer-inline-comment-cap: bash, gh api pulls/.../{reviews,comments} POST,
//                                any "body":"..." > 300
//
// MCP tool names are matched loosely (/linear/ + save_issue/save_comment) since
// the exact namespaced name depends on the configured server id.

const ISSUE_CAP = 600
const COMMENT_CAP = 300
const SYNTH_CAP = 300
const INLINE_CAP = 300

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
      }
    },
  }
}
