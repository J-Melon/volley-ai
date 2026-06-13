// Em-dash / spaced-hyphen prose guard, ported from em-dash-pre-tool.sh.
// Bans U+2014 and the spaced-hyphen prose connector ( word - word ) on every
// prose surface. Per feedback_no_em_dashes.
//
// Tool scanning, mirroring the Claude hook:
//   - bash: a command can legitimately CONTAIN an em dash as a search pattern,
//     so scan ONLY commands that write prose to a permanent surface (commit
//     message, PR create/edit, redirect/heredoc into a text file). Otherwise skip.
//   - edit: scan only the written side (newString), never oldString (matching a
//     dash to remove it is the cure, not the violation).
//   - write: scan the content.
//   - Linear/PR text MCP tools: scan their text args in full.

const EM = "—"
const SPACED_HYPHEN = /[^ ] - [^ ]/

// Commands that write prose to a permanent surface.
const PROSE_CMD =
  /(^|[;&|\s])(git commit|gcmsg|gc(f|x|d|h|r|t|i|st|pf|bd|v)!?)(\s|$)|gh pr (create|edit)|>>?\s*[^\s]*\.(md|txt|gd|tres|tscn|cfg|json|yml|yaml|sh)|<</

function violation(scan) {
  if (typeof scan !== "string" || scan.length === 0) return null
  if (scan.includes(EM)) {
    return "U+2014 (em dash) detected in tool input. The em dash is banned on every surface per feedback_no_em_dashes. Replace with a comma, semicolon, period, or parentheses, then retry."
  }
  if (SPACED_HYPHEN.test(scan)) {
    return "Spaced-hyphen prose connector ( word - word ) detected. A hyphen as prose punctuation is banned per feedback_no_em_dashes. Replace with a comma, semicolon, period, or parentheses, then retry."
  }
  return null
}

/** @type {import("@opencode-ai/plugin").Plugin} */
export const EmDash = async () => {
  return {
    "tool.execute.before": async (input, output) => {
      const args = output?.args || {}
      let scan = ""

      if (input.tool === "bash") {
        const cmd = typeof args.command === "string" ? args.command : ""
        if (!PROSE_CMD.test(cmd)) return // grep/sed patterns etc. are exempt
        scan = cmd
      } else if (input.tool === "edit") {
        // Only the written side. OpenCode edit args: newString (write),
        // oldString (match target, exempt).
        scan = String(args.newString ?? args.new_string ?? "")
      } else if (input.tool === "write") {
        scan = String(args.content ?? "")
      } else if (/linear/i.test(input.tool) || /pr|issue|comment/i.test(input.tool)) {
        // Linear/PR-shaped MCP text tools: scan body/description/title.
        scan = [args.body, args.description, args.title, args.content]
          .filter((v) => typeof v === "string")
          .join("\n")
      } else {
        return
      }

      const reason = violation(scan)
      if (reason) throw new Error(reason)
    },
  }
}
