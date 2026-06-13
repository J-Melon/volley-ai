---
name: feedback_branch_name_drives_linear_automove
description: "the GitHub-Linear integration links/moves an issue by finding its SH-N in the branch/title/body; current convention keeps branches GitHub-facing (no SH-N) so the link is MANUAL, see feedback_design_docs_subject_first_github_ids"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

**Current convention (2026-06-03): branches are GitHub-facing (`feature/<gh-number>-slug`), so no `SH-N` lives in the branch and the auto-link does NOT fire off it.** Link the PR to the issue by hand; the Shuck PR automations then move it (draft to Dispatched, ready to Challenged, merge to no-action). The mechanism below is why that is, and why a stray Linear ID in a branch was always a hazard. Authority for the convention is [[feedback_design_docs_subject_first_github_ids]].

The mechanism (still true): Linear's GitHub integration auto-links/transitions the issue whose `SH-N` appears in the **branch name, PR title, or PR body**. When branches carried `SH-N` (the old convention), the branch name was the strong auto-mover. That is exactly why a stray Ride/umbrella ID in a branch was dangerous:

Consequences observed 2026-05-28 on SH-434 Anteater 2:
- Stream B's branch was `feature/sh-434-stream-b-ai-and-bounds`. The `sh-434` in the name made the integration bind PR #777 to **SH-434 (the Ride)** and auto-move it to Challenged when the PR opened. That violates [[feedback_ride_definition_and_lifecycle]] (the Ride stays put until Josh rides the merged build). Josh: "why was it moved?"
- PR #778's branch was `feature/sh-412-...`, so only **SH-412** auto-moved to Challenged; the sibling issues 413/433/432 (referenced in the body but not in the branch name) stayed at Dispatched and needed a manual nudge.

**How to apply:**
- Branch name is `feature/<gh-number>-slug` (GitHub issue number, no `sh-`). Link the PR to its Linear issue by hand once the PR is up; the state automations follow from the link.
- **Verify** the link landed and which issues moved (`get_issue`/`list_issues`); never assume the PR moved the issue. Multi-PR is AND-logic (moves on the FINAL `contributes` PR). Links ACCUMULATE: every PR that touched the issue stays attached (closed/superseded included), as the record of related work. Do NOT prune them; the `linkKind` (`contributes` vs `closes`) governs the transition, not which attachments exist. Link a new chunk's PR as `contributes`.
- Move laggards manually (per [[feedback_dispatched_on_dispatch]]), passing state by ID ([[feedback_linear_status_use_id]]).
- The old hazard still informs the convention: never let a Ride/umbrella `SH-N` reach any open surface that Linear scans (branch/title/body), or it links and moves the Ride. GitHub-facing branches remove that whole failure class.
