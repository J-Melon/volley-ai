// PR-state hydrate check, ported from pr-mention-state-check.sh (Claude Stop hook).
// Claude blocked a turn that claimed a PR's state without a live gh read that turn.
// OpenCode has no pre-turn-end block; the equivalent is: on session.idle (turn
// finished), if the turn claimed PR state but ran no gh PR-read, RE-PROMPT once via
// client.session.prompt to force a hydrate. Reliable in the TUI, where Volley runs
// (the run-mode teardown race noted in the migration plan does not apply in the TUI).
//
// session.idle fires AFTER the loop breaks, so this is a re-entry (a fresh turn),
// not a true block. Loop-guarded: we only re-prompt once per idle-trigger.

const STATE_CLAIM =
  /\b(merged|is open|is closed|reopened|blocked|approve|approves|approved|approval|passing|passed|failing|failed|mergeable|queued|landed|ready to merge|auto-?merge|all checks|checks? (pass|green|red|fail)|review (passed|verdict|blocked|approved)|green|red)\b/i
const MENTIONS_PR = /#\d+|\bPRs?\b|pull request/i
const GH_READ = /gh pr (view|list|status|checks)|gh api[^\n]*(\/pulls|\/issues)/i

/** @type {import("@opencode-ai/plugin").Plugin} */
export const PrStateCheck = async ({ client }) => {
  // Per-session: did a gh PR-read run during the current turn?
  const ghReadThisTurn = new Map() // sessionID -> bool
  // Loop guard: sessions we already re-prompted, do not re-fire until a new turn.
  const reprompted = new Set()

  return {
    // Watch bash calls to note a live gh PR-read in the turn.
    "tool.execute.before": async (input, output) => {
      if (input.tool !== "bash") return
      const cmd = output?.args?.command
      if (typeof cmd === "string" && GH_READ.test(cmd)) {
        ghReadThisTurn.set(input.sessionID, true)
      }
      // A fresh tool call means the turn is live again; clear the loop guard.
      reprompted.delete(input.sessionID)
    },

    event: async ({ event }) => {
      if (event.type !== "session.idle") return
      const sessionID = event.properties.sessionID
      if (reprompted.has(sessionID)) return // already nudged this idle

      const hadRead = ghReadThisTurn.get(sessionID) === true
      ghReadThisTurn.delete(sessionID) // reset for next turn
      if (hadRead) return // a live read grounds any claim; nothing to do

      // Fetch the last assistant message text to see if it CLAIMED a PR state.
      let text = ""
      try {
        const res = await client.session.messages({ path: { id: sessionID } })
        const msgs = res?.data ?? res ?? []
        for (let i = msgs.length - 1; i >= 0; i--) {
          const m = msgs[i]
          const info = m.info ?? m
          if ((info.role ?? info.type) !== "assistant") continue
          const parts = m.parts ?? []
          text = parts
            .filter((p) => p.type === "text")
            .map((p) => p.text || "")
            .join("\n")
          break
        }
      } catch {
        return // fail open: cannot read messages, do not nag
      }

      if (!(MENTIONS_PR.test(text) && STATE_CLAIM.test(text))) return

      reprompted.add(sessionID)
      try {
        await client.session.prompt({
          path: { id: sessionID },
          body: {
            parts: [
              {
                type: "text",
                text:
                  "state-check: your last response referenced a PR or challenge state " +
                  "without a live gh read this turn. Run the gh read now " +
                  "(gh pr view <n> --json state,mergeable,reviewDecision, or gh pr checks <n>), " +
                  "correct any claim that does not match, then stop.",
              },
            ],
          },
        })
      } catch {
        // fail open
      }
    },
  }
}
