// Review-verdict guard, blocking agents from posting verdict bodies to the PR
// conversation tab. The banned pattern is any call that puts a verdict body on
// the conversation-thread surface (as opposed to inline on diff lines, the
// correct channel for findings).
//
// Case 1: gh pr review --comment --body <non-empty>
//   A COMMENTED verdict on the conversation tab (the self-approval trap).
//
// Case 2: gh api path matching pulls/.../reviews with body but no comments.
//   REST-equivalent of the same trap.
//
// Fail open: unparseable input or an unhandled tool does not throw.

/** @type {import("@opencode-ai/plugin").Plugin} */
export const ReviewVerdictGuard = async () => {
  return {
    "tool.execute.before": async (input, output) => {
      if (input.tool !== "bash") return
      const cmd = output?.args?.command
      if (typeof cmd !== "string" || cmd.length === 0) return

      // Case 1: gh pr review --comment --body <non-empty>
      // Banned self-approval trap; posts a verdict body to the conversation tab.
      if (/(^|[;&|\s])gh\s+pr\s+review(\s|$)/.test(cmd)) {
        const hasComment = /--comment(\s|$)/.test(cmd)
        const hasBody = /--body(\s|=)/.test(cmd)
        if (hasComment && hasBody) {
          const m = cmd.match(/--body(?:=(\S+)|\s+(\S+))/)
          if (m) {
            const val = m[1] ?? m[2] ?? ""
            const empty =
              val === '""' || val === "''" || val.length === 0
            if (!empty) {
              throw new Error(
                "gh pr review --comment --body posts a COMMENTED verdict to the conversation tab. This is banned (reviewers skill: self-approval trap). On approve, report only to the dispatcher; on block, use the gh api reviews subresource with inline line comments, not --body."
              )
            }
          }
        }
      }

      // Case 2: gh api path matching pulls/.../reviews sends body
      // via form-flag but no comments flag. Same verdict-to-conversation
      // problem as case 1.
      if (/gh\s+api\s+.*pulls\/[^\s]*\/reviews(\s|$)/.test(cmd)) {
        const hasBodyFlag = /(^|\s)-f\s+body=/.test(cmd)
        const hasCommentsFlag = /(^|\s)-f\s+comments=/.test(cmd)
        if (hasBodyFlag && !hasCommentsFlag) {
          throw new Error(
            "gh api .../reviews with -f body= but without -f comments= posts a verdict body to the conversation tab. This is banned. Use -f comments= for inline line comments, and include body only when you also provide comments."
          )
        }
      }
    },
  }
}
