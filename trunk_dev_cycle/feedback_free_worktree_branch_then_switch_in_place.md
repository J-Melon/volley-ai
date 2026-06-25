---
name: feedback_free_worktree_branch_then_switch_in_place
description: "to switch onto a branch locked by a .claude/worktrees worktree, remove that worktree then checkout in the main worktree; don't open a separate session"
metadata: 
  parent: feedback_sending
  node_type: memory
  type: feedback
  originSessionId: 19cf16f4-8427-4e43-ad3f-a2b07defe551
---

When Josh says "switch" / "put me on" a branch that git reports is already checked out in a `.claude/worktrees/` worktree, the default move is: `git worktree remove <path>` to free the branch, then `git checkout <branch>` in the main worktree. Do not propose opening a fresh session in the worktree as the resolution.

**Why:** Josh wants to work the branch from his current session, not juggle a second one. The worktree is just a lock to clear, not a place to go.

**How to apply:** Confirm the worktree is clean / in sync with origin first (it usually is). Remove it, then check out in place. Guard still holds: keep the worktree branch fixed while an agent is running in it ([[feedback_stay_on_main_worktree_while_agent_runs]]).
