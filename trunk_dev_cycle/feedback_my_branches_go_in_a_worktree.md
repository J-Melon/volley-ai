---
name: feedback_my_branches_go_in_a_worktree
description: "any branch I cut for my own hands (feature, doc, infra) goes in a separate worktree, not a git checkout in the main tree; never park the main worktree on a feature branch; return it to main and confirm clean after. FIRES the moment I start a SECOND independent thread mid-session (a skill while a spike is live, infra while a feature is live): it is a separate feature per [[feedback_trunk_based_development]] and gets its OWN branch off main, never a ride-along on the branch currently checked out. `git branch --show-current` BEFORE the first edit of the new thread."
metadata: 
  parent: feedback_state_checks
  node_type: memory
  type: feedback
  originSessionId: 19cf16f4-8427-4e43-ad3f-a2b07defe551
---

General rule: when I am about to do my own feature/doc/infra work that needs its own branch, set it up in a separate worktree (`git worktree add .claude/worktrees/<slug> -b <branch>` or onto an existing branch), do NOT `git checkout -b` in the main worktree. Leaving the main tree parked on a feature branch silently moves Josh's editor checkout off `main`. When the work is committed and pushed, return the main worktree to `main` and confirm clean. 2026-05-30: did SH-437 doc work by checking the branch out in the main tree; Josh: "did you work tree it?" Had to checkout main + `git worktree add .claude/worktrees/sh-437 <branch>` after the fact. The work was safe (committed, pushed, PR up) but the main tree should never have left `main`. This is the same failure as the infra case below, generalised: any branch I cut for my own hands belongs in a worktree, not in the main checkout.

When editing repo infra (`.claude/agents/**`, `.claude/settings.json`, `ai/skills/**`, hooks, `.claude/rules/**`, any tooling not part of the current feature), do NOT edit it freehand in the main worktree while that worktree is parked on a feature branch. The change lands as an uncommitted modification on the feature branch, where it does not belong and would ride that PR.

Branch-first: before the infra edit, either switch the main worktree to a dedicated infra branch off main, or do it in a separate worktree. If the edit already happened on the wrong branch, stash it, branch off main, pop, commit there, then return the main worktree to its feature branch (and confirm it's clean).

**Why:** 2026-05-29, twice in one session, the style-warden infra and the root-cause-analyst agent edit, both landed as stray modifications on the SH-412 feature branch (#778) because I rewrote agent files in the main worktree without checking what branch it was on. Josh: "did you put it on a separate worktree?" Each needed a stash-branch-pop rescue.

**How to apply:** before any infra edit, `git branch --show-current`. If it's a feature branch, branch off main first (or use a worktree) so the infra change never touches the feature tree. After committing the infra branch, return the main worktree to the feature branch and confirm `git status` is clean so the next dispatch / playtest targets the right tree. Relates to [[feedback_dont_switch_main_worktree_branch_during_agent_dispatch]] (don't move the main worktree branch while an agent runs in it) and the `git add -A` trap ([[feedback_agent_worktree_path_outside_main]]).
