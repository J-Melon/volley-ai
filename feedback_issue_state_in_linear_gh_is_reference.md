---
name: feedback_issue_state_in_linear_gh_is_reference
description: "issue state changes always happen in Linear; GitHub issue numbers are only reference handles in PRs/commits, never close/reopen a GH issue to change state"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 19cf16f4-8427-4e43-ad3f-a2b07defe551
---

Any issue state change (retire, close, complete, reopen) happens on the **Linear** issue, never via `gh issue close`/`gh issue edit`. The GitHub issue number (e.g. #734) is only a reference handle that PRs and commits use for `Closes #N` linking; it is not where state lives. When Josh says "retire/close the X bug", find the Linear issue (search by title, the numbers do not line up: GH #734 = Linear SH-432) and move *its* state.

**Why:** Volley tracks work in Linear; GitHub issues exist mostly so PR `Closes #N` auto-links resolve. Reaching for `gh issue close` changes the wrong surface and skips the Linear lane discipline.

**How to apply:** "Retire" in Josh's usage means the **Retired** status (canceled type, where SH-49/SH-228 went), not Completed/Closed. Completed/Closed mean the fix shipped; Retired means not-fixing-here / superseded. Retiring from Challenged is sideways, not a backward move, so [[feedback_linear_state_forward_only]] is not violated. Queue the move for end-of-turn confirm per [[feedback_issue_edits_defer_to_end_of_turn]]. Separately: a PR `Closes #N` line claims the GH issue is fixed, so if the work is "an improvement, not a fix," drop the `Closes #N` line so the merge does not auto-close a bug that still lives (it moves to a successor ticket instead). **Do not write `Closes #N` reflexively on a feature PR.** Check first: (a) the branch name already auto-moves the Linear issue ([[feedback_branch_name_drives_linear_automove]]), so the body line is redundant as a mover; (b) if the issue carries a `spike` label or has residual/Ride scope, blanket-closing it on merge is wrong, drop the line and let Linear state move forward by hand. SH-437/#744 (2026-05-30): feature+spike, branch already moved it, so `Closes #744` was dropped from PR #803.
