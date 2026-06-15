// Git/shell command guards, ported from the Claude PreToolUse(Bash) hooks.
// Each gates on the `bash` tool's command text and throws to deny (OpenCode's
// equivalent of Claude's permissionDecision:"deny"). Throwing surfaces the
// message to the agent as the block reason.
//
// Ported hooks: block-pr-merge, git-rebase-ask (degraded: ask -> block, since
// OpenCode has no return-an-ask primitive), rm-permission-reason.
// Fail open: a guard that cannot parse its input does not throw.

/** @type {import("@opencode-ai/plugin").Plugin} */
export const GitGuards = async () => {
  return {
    "tool.execute.before": async (input, output) => {
      if (input.tool !== "bash") return
      const cmd = output?.args?.command
      if (typeof cmd !== "string" || cmd.length === 0) return

      // block-pr-merge: only the maintainer merges PRs.
      if (/gh pr merge(\s|$)/i.test(cmd)) {
        throw new Error(
          "Only the maintainer merges PRs (via Merge when ready). The agent must not run gh pr merge, including --auto."
        )
      }

      // block-release-delete: never delete a GitHub release.
      if (/gh release delete(\s|$)/i.test(cmd)) {
        throw new Error(
          "Never delete a GitHub release. Recreate by publishing a new tag instead."
        )
      }

      // block-direct-push-to-main on volley game repo only, not volley-ai.
      const pushToMain = /git\s+push\s+(?:-u\s+)?\S*\s+(?:main|master)(\s|$)/.test(cmd)
      if (pushToMain && !/volley-ai/.test(cmd) && !/(?:--force|--delete)/.test(cmd)) {
        throw new Error(
          "Direct push to main/master on the game repo is blocked. Push to a feature branch and land via PR."
        )
      }

      // git-rebase-ask: rebase / pull --rebase. Claude asked; OpenCode blocks
      // with a reason (run it yourself). Matches git rebase, and git pull with
      // --rebase or -r.
      if (
        /(^|[\s&|;`(])git\s+rebase(\s|$)/.test(cmd) ||
        (/(^|[\s&|;`(])git\s+pull(\s|$)/.test(cmd) && /(--rebase|\s-r(\s|$))/.test(cmd))
      ) {
        throw new Error(
          "git rebase / git pull --rebase is not run unattended here (feedback_never_rebase). Run the rebase yourself, or confirm explicitly."
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
