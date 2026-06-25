---
name: No amending, no force pushing
description: always add a new commit on top instead of amending; never force-push even with --force-with-lease
type: feedback
originSessionId: 63a922cb-9834-46c0-b48d-fd28a7512bb9
---
Always create a new commit on top instead of amending, even when the amend would make the challenge history tidier. Do not force-push, including with `--force-with-lease`.

**Why:** Amending rewrites history and forces a push, which rewrites other collaborators' fetched state and loses the review trail. A noisy history with a follow-up commit is better than a clean history that required a force-push. Josh flagged this on 2026-04-20 after I amended a commit in challenge #260 to fold a Title Case correction into the rename commit.

**How to apply:**
- If a challenge needs a follow-up change, add a new commit and push normally.
- Only use `--amend` / `--force-push` when Josh explicitly asks for it (e.g. to fix a commit message on an unpushed commit, or squash before a specific request).
- When tempted to "clean up" a branch with a force push, resist. GitHub's squash-merge collapses the history at merge time, so the intermediate commits are disposable anyway.

**Exception that requires explicit ack from Josh:** when a CI gate (e.g. DCO sign-off mismatch) cannot be fixed by a forward-only commit and the branch is genuinely solo (no other agent or PR depends on it), force-push is allowed *only* with one-time consent. 2026-04-30 (Goggle Squad PR #558): I briefed two consecutive Slartibartfast dispatches with `Signed-off-by: Josh Hartley <josh@shuck.gg>`, but the DCO check requires the sign-off name to match `git config user.name` (which is `Josh`). DCO checks every commit, so a follow-up commit alone could not have unblocked the merge gate. With Josh's explicit consent, I rebased --exec to rewrite the trailers and force-pushed-with-lease. Don't normalise this exception; it is the case where the rule has to break.
