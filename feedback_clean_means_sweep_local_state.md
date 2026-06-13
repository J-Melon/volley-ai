---
name: ""
metadata: 
  node_type: memory
  originSessionId: 61f585fd-3e13-4f8a-ad0a-30ff3fcd71af
---

When Josh prefixes a dandori or implementation request with "clean" (e.g. "clean and dandori anteater"), he means sweep the local repo to a tidy state before opening the new branch. Just checking `git status` and confirming the working tree is clean is not enough.

**Why:** 2026-05-24 on SH-426. I created `feature/sh-426-anteater` off `origin/main` after seeing a clean working tree and stopped there. Josh corrected: "you didn't clean local?" Local still held `feature/sh-423-outline-rework` (squash-merged, upstream gone), two stale worktrees (`volley-dandori`, `volley-memory-research`) whose PRs had closed or merged, and `main` was 2 commits behind origin.

**How to apply:** on "clean" before a new mission, run a sweep in this shape:

1. `git fetch origin --prune` then `git pull --ff-only` on `main`.
2. Inventory: `git worktree list`, `git branch -vv`, and for any non-`main` branch check its PR with `gh pr list --head <branch> --state all`.
3. Squash-merged or remote-gone branches: `git branch -D` (force needed because squash merges don't share commits).
4. Worktrees whose branch has merged: `git worktree remove <path>`.
5. Closed-not-merged PRs (branch + worktree): ask Josh before dropping; he may want to revive. Confirm before pushing `--delete` to origin.
6. After the sweep, create the new feature branch off the freshly pulled `main`.

Cross-link: [[feedback_worktree_cleanup_per_stage]] handles the per-agent-stage reflex; this rule covers the user-triggered sweep at mission start. [[feedback_verify_main_clean_post_merge]] handles the post-merge leak audit.
