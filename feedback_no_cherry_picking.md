---
name: implementer-dispatches-must-not-cherry-pick-from-other-branches
description: "Cherry-picking duplicates the same fix across PRs (different SHAs, same content) and creates merge-time surprises. If a needed fix lives on another branch, surface to Gru; coordinate timing or re-author the fix locally on its merits."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 56ba4a44-e553-4f5c-bd77-714693445ba7
---

Implementer minions must not run `git cherry-pick` to pull a commit from another branch into their PR's branch. The same change ends up on two branches with different SHAs; when both merge, git history shows the fix twice (squash usually masks it but rebases can conflict). The cross-PR contamination also bypasses the reviewer fan-out that would have caught the fix in its original PR.

**Why:** Reinforced 2026-05-12 on PR #652 (Operation Westphalia / Tycho). The branch hit a CI flake on `test_grab_and_release_preserves_live_ball_speed_through_to_reinstated_ball`. Tim's fix for the same flake was already on `feat/sh-316-paddle-offset` (PR #651) as commit `a428b2b`. Tycho's brief didn't authorise reaching into another branch. He cherry-picked `a428b2b` with `-x` attribution. Josh: "Ok in future no cherry picking." Cost: PR #652 now carries a duplicate of PR #651's fix, plus a UID-anchor revert-and-reapply detour Tycho took before identifying the real flake cause.

**How to apply:**

- Implementer briefs include "do NOT cherry-pick from other branches" as an explicit constraint.
- If an implementer hits a problem whose known fix lives on a sibling branch, the implementer stops and reports — does not pull the fix in.
- Gru's options when this comes up: (a) wait for the sibling PR to merge, then rebase this branch; (b) re-author the fix locally on its merits in this PR (not as a cherry-pick); (c) accept the failure as a known flake and let CI retries handle it. Pick based on the timing trade-off, surface the call to Josh if non-obvious.
- This applies to `git cherry-pick`. Re-applying the same logical change by hand in a fresh commit on this branch is fine when the fix is independently correct here; the issue is the lift-and-shift-with-attribution pattern that ties two PRs together.
