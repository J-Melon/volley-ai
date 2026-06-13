---
name: free-the-target-branch-from-agent-worktrees-before-playtest-checkout
description: "Pre-playtest checklist. Agent worktrees often hold the branch Josh wants to play. Remove them first so `git checkout <branch>` does not fail."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 56ba4a44-e553-4f5c-bd77-714693445ba7
---

When Josh is about to playtest a PR's branch in the main worktree, the playtest branch is frequently held by a leftover agent worktree from this session's dispatches. `git checkout` fails with `fatal: '<branch>' is already used by worktree at '...'`.

The pre-playtest checklist is:

1. **List active worktrees:** `git worktree list`. Any entry pointing at the playtest target branch needs to go.
2. **Remove the holders:** `git worktree remove <path>` (or `-f` if locked, `-f -f` if double-locked). Most agent worktrees can be safely removed once their dispatch completed; work is pushed to origin, the local checkout is debris.
3. **Prune stale references:** `git worktree prune` cleans up any worktree entries whose directories were deleted manually.
4. **Now `git checkout <branch>`** succeeds.

Volley's dispatch pattern (isolated agent worktrees per implementer) accumulates these quickly. A single mission with planner, implementer, fixer, polish can leave four locked worktrees behind. Run the cleanup before handing off to Josh's playtest.

**Why:** Reinforced 2026-05-14 on PR #651. Josh tried to `git checkout feat/sh-316-paddle-offset` for playtest and hit the lock from the kepler-sh316 worktree. Nine stale agent worktrees were sitting in `.claude/worktrees/` at that point, all from completed dispatches. The branch lock is the visible symptom; the broader hygiene gap is that nothing currently prunes finished agent worktrees.
