---
name: Never rebase, ever
description: No git rebase, ever, under any framing (--onto, drop merged commits, tidy a stacked branch); always merge origin/main in instead
type: feedback
originSessionId: de79f3c5-5848-4f0e-a279-dd4fb9fb942d
---
Never run `git rebase`. No exceptions, no "are you sure" escape hatch. This holds even when a rebase looks like the obviously-correct tool: dropping commits that already squash-merged, retargeting onto a new base with `--onto`, tidying a stacked branch. Always use `git merge origin/main` to bring a branch up to date.

**Why:** Rebase rewrites history and breaks the squash-merge + merge-queue + DCO workflow (author drift, lost sign-off, replayed commits on shared branches). Josh prefers merge commits and intact history.

**How to apply:** Branch behind main or has conflicts → `git fetch origin && git merge origin/main`. Stacked branch whose parent already squash-merged → do NOT rebase to drop the duplicated commits; open or retarget the PR against main and let the squash absorb them (the PR diff against main comes out clean because the content already landed), or merge origin/main in. If you catch yourself reaching for `git rebase`, stop and pick one of these instead. See [[feedback_no_amend_no_force]], [[feedback_no_cherry_picking]].
