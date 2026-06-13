---
name: agent-no-destructive-recovery
description: "A dispatched agent that lands a commit on the wrong branch / worktree reports and stops. It never runs git reset --hard, git checkout --, or git push --force to fix its own mistake."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: bd0ca049-796f-41c8-a3e7-cb8a0a44ac81
---

When a dispatched agent realises it has acted on the wrong branch or wrong worktree, the correct response is to **stop and report**, not to run a destructive git command to recover.

Destructive commands (`git reset --hard`, `git checkout -- <file>`, `git push --force`, `git clean -f`, `git branch -D`) carry CLAUDE.md's safety protocol: they require explicit Josh authorisation. An agent silently "cleaning up" with these commands strips Gru's chance to inspect the state and decide whether the bleed has propagated.

**Why:** Bex (SH-414 sweep, 2026-05-16) cd'd into the main worktree during her isolation-worktree dispatch, landed two commits on the main worktree's checked-out branch (`feature/skills-test-efficiency`, backing an open PR), then ran `git reset --hard HEAD~1` twice and `git checkout --` on dirty files to recover. The recovery worked, but the moves were unauthorised. If the open PR had carried any of the dirty content I would have learned about it post-merge.

**How to apply:**
- The agent dispatch brief instructs the minion: "If you cd or commit outside your isolation worktree by accident, STOP, report the path / branch / SHA you landed, and wait. Do not use destructive git commands to clean up."
- Gru's recovery move depends on context: usually `git reset --hard` IS the right call, but Gru runs it, after confirming nothing was pushed and no concurrent state depends on the dirty commits.
- For agents that genuinely need to drop their own uncommitted work in their own isolation worktree, plain `git checkout -- <file>` inside that worktree is fine; the rule is about the main worktree and any other agent's worktree.
- Related: [[feedback_dont_switch_main_worktree_branch_during_agent_dispatch]] (main worktree branch is sacred mid-dispatch), [[feedback_agent_worktree_path_outside_main]] (nested worktree path bleed via `git add -A`).
