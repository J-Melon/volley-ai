---
name: Never assign a Linear issue
description: I never set an issue's assignee, in any state. People are joining the project; assignment is theirs, not the dispatcher's.
type: feedback
originSessionId: 63a922cb-9834-46c0-b48d-fd28a7512bb9
---
I never set the `assignee` on a Linear issue, in any state, cycle or not. Create and update issues with
assignee unset and leave it unset.

**Why:** Josh is inviting collaborators to the project, so who picks up a ticket is a human decision made
by the people on the board, not something the dispatcher's API key should impose. Josh, 2026-06-11: "not
anymore, I'm inviting people to the project so you never need to assign." This supersedes the old
"assign Josh when the issue enters the active cycle" rule (and the older CLAUDE.md "assign tech/design
issues to Josh"); both are retired.

**How to apply:**
- Creating or updating any issue: omit `assignee` entirely. Do not assign Josh, do not assign anyone.
- Do not suggest assignment as a follow-up when an issue enters a cycle. Cycle membership no longer pulls
  an assignee.
- This holds for Rides too; the old Rides-always-assign-Josh exception is gone.
