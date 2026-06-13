---
name: After a challenge merges, branch fresh for follow-up work
description: never keep piling commits onto a branch whose challenge already merged; always cut a new branch off current main
type: feedback
originSessionId: 63a922cb-9834-46c0-b48d-fd28a7512bb9
---
When a challenge merges (squash or otherwise), the branch it was on is effectively retired. Never push more commits to that branch name. Always cut a fresh branch off current `origin/main` for follow-up work.

**Why:** GitHub squash-merges collapse the whole branch into a single commit on main. A local branch that started before that merge still has its old base; pushing to the old branch name recreates it on origin with the pre-squash base. When you later try to bring in main, you get add/add conflicts on files the squash introduced; the same file exists in both histories with overlapping content but no common ancestor for that file. Happened on 2026-04-20 on `docs/issue-title-length` after challenge #257 squashed and I pushed follow-up commits to the same branch.

**How to apply:**
- After `gh pr merge` or confirmation the challenge is merged, do not reuse the branch. Start the next piece of work with `git fetch origin main && git checkout -B <new-branch> origin/main`.
- If you realise mid-flow that the branch is stale, cherry-pick the new commits onto a fresh branch off `origin/main` rather than trying to merge main back into the retired branch.
- Watch for the `remote: Create a pull request for '<branch>'` hint after `git push`; if you see it on a branch you thought was live, the remote deleted it and you are pushing a recreated branch; stop and cut a fresh one.
