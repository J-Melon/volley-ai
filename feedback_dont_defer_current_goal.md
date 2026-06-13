---
name: feedback_dont_defer_current_goal
description: "Filing a follow-up issue is for genuinely new unscoped work; if a finding is for the current goal directly, fix it in the current PR. Don't punt to make the PR shippable."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

When a reviewer flags a real issue that's part of the current goal, fix it in the current PR. Don't file a follow-up to defer the work.

**Why:** Josh corrected 2026-04-27 after I filed SH-311 deferring Burns's mid-rally partner-bind block on PR #506. The block was directly part of the per-ball ownership refactor SH-288 was already doing. I punted because two attempts at the fix broke ggut and I gave up tracing the failure (turned out cwd had drifted to the wrong worktree). Wrong call. The correct move was to debug the failure and apply the fix.

**Distinguish:**
- **Same goal, must fix in this PR:** the finding is part of the AC, the regression the PR introduces, or the design rule the PR is shipping. Examples: a reviewer flags a wiring path the refactor missed; a battler finds a player-facing case the new behaviour breaks; a test reveals the impl doesn't actually fulfil the AC.
- **New unscoped work, file as follow-up:** the finding is adjacent but distinct, would expand the PR's scope materially, or surfaces a separate concern. Examples: a hardening idea in a sibling subsystem; a tooling improvement that came up while reviewing; a different bug that happens to be in the same file.

**Trivial work skips the queue.** If the fix is roughly five minutes (a one-line config flip, a stale reference, a typo, an obviously-dead block), just do it now even if it's unplanned and out of scope. Filing a Linear issue + dispatching a minion + reviewing a PR for a five-minute change costs more than the change. The "is this scope creep" filter is for work big enough that filing it costs less than doing it inline.

**How to apply:**
- Default to fixing in the current PR. Filing a follow-up is the exception.
- Before filing, ask: "would this take five minutes if I just did it?" If yes, do it.
- If the fix attempt fails, debug it. Rule out cwd drift, hydrate state, check git status, re-read the diagnosis. Don't give up after one or two attempts.
- If you do file a follow-up, justify why it's NEW WORK rather than scope expansion of the same goal AND why it's too big to do inline.

**Use the right language for state.** If a follow-up issue was filed and the work then landed in the parent PR, set it to **Dispatched** with a link to the PR, then move it to **Completed** by hand on merge (merge is no-action, [[feedback_dispatched_on_dispatch]]). Don't set to **Retired**; Retired means abandoned/cancelled. Completed work isn't retired.
