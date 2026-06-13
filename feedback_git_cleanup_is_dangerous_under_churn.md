---
name: feedback-git-cleanup-is-dangerous-under-churn
description: "Aggressive git cleanup (reset --hard, --delete-branch, branch -D) repeatedly endangered live work; gate these"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d1325475-fd0f-4d73-9889-41c0b0763a41
---

During the skills-registration session (2026-05-30) my own git cleanup commands twice endangered live work:
- `git reset --hard origin/main` discarded 4 local-only commits that were NOT in the squash-merge; only reflog saved them.
- `gh pr close <dup> --delete-branch` cascaded and deleted the shared remote branch that ANOTHER open PR (#799) depended on, auto-closing it.

**Why:** under churn (multiple branches, duplicate PRs, agents and me touching the same tree), destructive git ops have blast radius beyond the obvious target. A squash-merge does NOT contain the same commits as the local branch; a deleted branch closes every PR whose head it is.

**How to apply:**
- Before `git reset --hard`: confirm what unique commits the current ref holds vs the target (`git log --oneline target..HEAD`). If any are real work, move them to a branch FIRST.
- `git reset --hard origin/<other-branch>` rewrites the branch you are CHECKED OUT ON to that ref, not the branch you named. Running it while on `main` to "sync a feature branch" silently moves local `main` to the feature tip. Always `git branch --show-current` first; reset only syncs the current branch. (2026-06-02: did this on `main`, moved it 39 commits onto a feature tip; caught because origin was untouched and nothing was pushed, reset back to `origin/main`.)
- Before `gh pr close --delete-branch` or `git push origin --delete`: confirm no OTHER open PR shares that head branch (`gh pr list --json number,headRefName`). Duplicate PRs off the SAME branch are not independent; deleting the branch kills both.
- Prefer non-destructive first: `git branch <save> <sha>` before any reset; close PRs without `--delete-branch` when another might share the branch.
- Stop firing long parallel batches of dependent Bash calls; they cancel each other and lose track of branch/HEAD state. One sequential step, read result, next.

Related: [[feedback_my_direct_commits_skip_standing_rules]], [[feedback_trunk_based_development]], [[feedback_worktree_isolation_dispatch_broken]].
