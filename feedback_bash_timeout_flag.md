---
name: Use explicit timeout flag on Bash commands that could hang
description: set the Bash tool's timeout parameter on any command that might stall (network, remote git, long hooks, merge-queue waits); defaults silently swallow 120 seconds of hang
type: feedback
originSessionId: 608651d3-3b61-4b71-9a83-894f4e86b346
---
When calling the `Bash` tool, pass an explicit `timeout` parameter on any command that could hang. Commands with no timeout default to 120 seconds of silent wait, which is long enough to freeze a session without a useful signal. The max is 600000ms (10 minutes).

**Why:** a hung command with no timeout produces "internal error" style feedback to the user and wastes a turn. A crisp timeout surfaces the problem as a TIMEOUT which is actionable. Flagged 2026-04-21 after a `git checkout main && git pull && ...` chain stalled on the pull step with no signal.

**How to apply:**
- Local-only git ops (`checkout`, `branch -d`, `status`, `log`): 15000ms.
- Remote git ops (`pull`, `push`, `fetch`, `clone`): 30000ms typical, 60000ms if the repo is large or the network is slow.
- `gh api`, `gh pr create`, `gh pr view`, `gh pr merge`: 20000ms; auto-merge queue polls can sit longer, set 60000ms if watching for state change.
- Hooks that run lint / typecheck / tests inline (via lefthook or `git commit`): 60000ms for small repos, longer for full test suites.
- Godot headless / GUT / lint in volley: 3000ms. Full GUT run is ~2.5s; past 3s is hung, abort and investigate. See `ai/skills/minions/bash-timeouts.md` (referenced from the heavy-hitter sub-agent definitions).
- Builds / exports / anything that compiles: `run_in_background: true`; do not block on them.
- Commands that wait for human action (interactive login, `gh auth login`): do not run via `Bash`; surface the `!` prefix instruction to Josh instead.

When a timeout fires, read the error, cut the chain at the step that stalled, and retry with a longer timeout or a different approach. Do not silently re-issue the same command with no adjustment.
