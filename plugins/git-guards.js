// Git/shell command guards for cases too complex for opencode.json permission
// patterns. Simple deny rules (gh pr merge, gh release delete, git rebase, git
// branch -D, etc.) live in opencode.json.
//
// Fail open: a guard that cannot parse its input does not throw.

/** @type {import("@opencode-ai/plugin").Plugin} */
export const GitGuards = async () => {
  return {
    "tool.execute.before": async (input, output) => {
      if (input.tool !== "bash") return
      const cmd = output?.args?.command
      if (typeof cmd !== "string" || cmd.length === 0) return

      // block-direct-push-to-main on volley game repo only, not volley-ai.
      const pushToMain = /git\s+push\s+(?:-u\s+)?\S*\s+(?:main|master)(\s|$)/.test(cmd)
      if (pushToMain && !/volley-ai/.test(cmd) && !/(?:--force|--delete)/.test(cmd)) {
        throw new Error(
          "Direct push to main/master on the game repo is blocked. Push to a feature branch and land via PR."
        )
      }

      // rm-permission-reason: rm as a command token (start, whitespace,
      // separator, slash, backslash, or subshell char before it).
      const rmInvoked = /(^|[\s&|;`($\\/])rm\s/.test(cmd)
      if (rmInvoked) {
        // Chained/piped: a separator, subshell, or newline alongside the rm.
        if (cmd.includes("\n") || /(&&|\|\||;|\||`|\$\()/.test(cmd)) {
          throw new Error(
            "rm is chained with other commands (a separator, subshell, or newline is present). A chained rm hides what it deletes in a line that is hard to review. Run the rm on its own, in a separate step."
          )
        }
        // Standalone rm -rf: recursive AND force, any spelling.
        const recursive = /(-[a-zA-Z]*[rR]|--recursive)/.test(cmd)
        const force = /(-[a-zA-Z]*f|--force)/.test(cmd)
        if (recursive && force) {
          throw new Error(
            "Recursive force-delete (rm -rf) is not run unattended. Remove a directory's contents in a reviewed step, or ask Josh."
          )
        }
        // Standalone plain rm: allowed.
      }
    },
  }
}
