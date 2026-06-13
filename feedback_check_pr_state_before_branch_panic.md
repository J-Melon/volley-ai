---
name: check-gh-pr-list-state-all-before-treating-ahead-of-main-commits-as-unpushed-work
description: "Local branches hold NO durable state under trunk-based dev; trunk + remote PRs are the only source of truth, so a local branch is disposable debris. Do not audit per-branch safety or branch-panic over ahead-of-main commits (squash-merge leaves that artifact). Check a PR's real state via gh before REPORTING on it; but for cleanup, just delete."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 56ba4a44-e553-4f5c-bd77-714693445ba7
---

**We do not hold unmerged state in local branches.** Under trunk-based development, durable work lives in exactly two places: merged into `main`, or in an open PR on `origin`. A local branch is a disposable pointer; deleting it loses nothing real. So on "clean all" / branch cleanup, just delete every local branch except `main` (and any you are actively on). Do NOT run a per-branch safety audit, do NOT cross-check each against its GitHub PR before deleting, do NOT preserve "stragglers for Josh." That over-caution is the failure (Josh 2026-06-02: "we don't hold unmerged state" after I started GitHub-PR-state-checking 35 branches one by one to decide which were safe). If a branch genuinely had unpushed work, that work was never protected by living locally anyway; trunk discipline means it should have been pushed.

When `git log main..HEAD` shows the current branch is several commits ahead of main, that does **not** mean the work is unmerged. If the PR was squash-merged (volley's default), the local branch keeps its pre-squash history while main holds a single squashed commit with the same content. The ahead-of-main count is an artifact, not a reason to hesitate.

**Why:** Reinforced 2026-05-12 on `docs/rituals-calendar`. I saw 10 commits ahead of main and stalled the next mission dispatch, asking Josh to choose between merging, pushing, or stashing — when in fact PR #647 had already been squash-merged. The local branch was harmless debris.

**How to apply:**

- Before reporting any PR's status to Josh (open, merged, CI green/red, mergeability), run `gh pr view <n> --json state,mergeStateStatus,statusCheckRollup` first. Having opened a PR is not the same as knowing its state; it may have merged, failed CI, or been dequeued since. Reported #738 as "up and pending" when it had already squash-merged to main.
- Before flagging "unpushed work" on a branch, run `gh pr list --head <branch> --state all --json number,state,title,url`.
- If a PR exists in state `MERGED`, the local branch is safe to delete and the ahead-of-main commits are already represented on main as the squash commit.
- If no PR exists OR PR state is `OPEN`/`CLOSED`-without-merge, *then* the ahead-of-main commits may be real unpushed work.
- Also check `git rev-parse --abbrev-ref @{upstream}` and `git log @{upstream}..HEAD` — if upstream is set and matches, the branch is pushed regardless of merge state.
- Don't ask Josh "should I push/merge/stash this branch?" without first running the gh-pr check; it wastes a turn and looks careless.
- Before reporting a PR "reviewer-clean" or "approved," check the actual bot synthesis review and inline review comments, not the reviewer agents' reports. Reviewers report a verdict but can drop a block summary on the main conversation thread instead of inline (seen on #740, 2026-05-25). The organiser posts the round's bot synthesis review; confirm it landed. The reviewer-dispatch discipline (brief restates inline-only, empty body, report to organiser) lives in `ai/skills/gru/dispatch.md` (Reviewer dispatch).
- **The state-check is TWO surfaces: PR state AND comment threads.** `gh pr list`/`gh pr view` gives state; it does NOT tell you whether inline findings are open, addressed, or stale. Before claiming a PR's review status, also run `gh api repos/.../pulls/<n>/comments` and `.../reviews` and read them. 2026-06-04 on #858: I checked only `gh pr view`, missed Zaphod's live inline finding hanging unaddressed, and called the PR "no review decision" when a `volley-reviewer[bot]` review sat at CHANGES_REQUESTED. The `reviewDecision` JSON field is empty even when a bot CHANGES_REQUESTED review exists, so reading `reviewDecision` alone is not reading the review; pull `.../reviews` for the real verdict.
- **A post-battle push invalidates the prior round's verdict; re-read the threads after it.** When I push a commit after reviewers ran (a fix, a test cut), their inline findings may now be outdated, resolved, or still open, and the bot review was against the old head. Re-read `.../comments` (check `outdated`/`position == null`) before claiming the PR is clean or naming what is still open. Reply to and close any finding the push addressed; do not leave a fixed thread hanging.
