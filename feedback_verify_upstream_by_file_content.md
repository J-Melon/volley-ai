---
name: verify-upstream-by-file-content
description: "When an agent reports \"the work is already done because external state changed\", it must show the file content as evidence, not infer from git log or PR state."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: bd0ca049-796f-41c8-a3e7-cb8a0a44ac81
---

When a dispatched agent suspects that the upstream branch (usually `origin/main`) already contains the work it was sent to do, the verification has to be a **content check** on the actual files, not an inference from `git log`, PR state, or commit-message subjects.

A squash-merge collapses many file changes into one commit with one subject line; reading the subject does not tell you what landed. A merge that "looks like it dropped the bad change" might have merged it anyway.

**Why:** Fin (PR #696 tick-rate unwind, 2026-05-16) reported `origin/main already has the desired state. PR #696 was merged via squash and DOES NOT contain the tick-rate bump on main`. The actual main contained `Engine.physics_ticks_per_second = 120` in `tests/hooks/pre_run_hook.gd`. Fin's verification missed it. Her revert work was real and needed, but she reported it as redundant. Gru had to redo the unwind from scratch on a fresh branch.

**How to apply:**
- The verification step is `git show origin/main:<path>` and read the content, not `git log` and read the subject.
- For "is this property still set" / "is this constant still the bumped value" questions, grep the file content directly.
- If the agent cannot prove the upstream state by file content, it reports uncertainty rather than declaring the work done.
- A commit-subject claim like "(#696)" does not prove what was in the merged squash. Only the file content does.
- Related: [[feedback_hydrate_pr_state]] (hydrate by reading JSON, not from memory), [[feedback_check_pr_state_before_branch_panic]] (the squash-vs-rebase mismatch already burned us once on a different axis).
