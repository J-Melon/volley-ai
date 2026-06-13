---
name: Never merge challenges, Josh does it
description: Only Josh merges pull requests; never run gh pr merge or similar
type: feedback
originSessionId: ffa92701-f757-4e1b-90c6-86676b3c3fbf
---
Never merge pull requests. Stop at "pushed" or "challenge updated"; merging is Josh's call.

**Why:** Explicitly stated during SH-104. Merging is a release-gate decision the user owns.

**How to apply:** Do not run `gh pr merge`, `git merge` into main, or any squash/rebase-merge command. After pushing or updating a challenge, report the URL and stop. If asked "are we ready to merge?", answer with status but do not execute the merge.
