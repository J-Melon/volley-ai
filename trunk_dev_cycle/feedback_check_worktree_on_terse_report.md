---
name: Check the worktree when an agent's report is terse or signals incomplete work
parent: feedback_on_return
description: Agents sometimes run out of turns mid-task and return a fragment like "Looks good. Wait for ggut." without committing. Always inspect the worktree's `git status` before trusting that nothing's pending.
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
When an agent's return is unusually terse, ends mid-sentence, or signals "wait for X" / "verifying" / "almost done", treat the report as incomplete. The agent may have made changes that never got committed.

**Why:** Gabbro on PR #506 round 6 returned `Looks good. Wait for ggut.` and the dispatch was logged complete. PR head was unchanged. The worktree had 10 modified files sitting uncommitted; half a refactor stranded. A fresh continuation had to be dispatched to actually commit and push. 2026-04-27.

**How to apply:**
- Before claiming a dispatch is done, run `git -C <worktree> status --short` (or `cd <worktree> && git status`).
- If the worktree shows uncommitted changes, the agent didn't finish; dispatch a continuation pointing at the worktree to verify, commit, and push.
- A return like "verifying" or "wait for ggut" without a commit SHA is the trigger to check.
- Also check for stray background processes: `pgrep -af "gut_cmdln|godot.*headless"`. The "Wait for ggut" pattern leaves both uncommitted changes AND a backgrounded ggut. Kill any survivors with `pkill -f gut_cmdln`.
- Watch for poll-loop deadlocks: `until grep -qE "Run Summary|Totals" /tmp/ggut-fresh.log; do sleep 5; done`. The agent waits on a file no one is writing to (the actual ggut is piped elsewhere or to stdout). Kill the polling shell so the bash command returns, agent unblocks, and ground truth re-asserts. Rule of thumb: an agent should only poll a file IT writes to itself, with explicit redirect.
- This pairs with `feedback_hydrate_pr_state.md` (hydrate PR state before recap) and `feedback_clean_up_background_processes.md` (kill anything you spawned). All three are about not trusting in-context summaries over ground truth.
