---
name: linear-project-pass-by-id-when-collisions-exist
description: "Pass project by UUID, not name, when filing or moving Linear issues. The Shuck workspace has overlapping names (`Court` and `Court 2`); name resolution silently lands on the wrong one. Same shape as [[feedback_linear_status_use_id]]."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 570a15a4-6c79-4f89-b9b2-8f3b93c2ff4b
---

When the Shuck Linear workspace has two projects whose names share a prefix or suffix (e.g. `Court` and `Court 2`), passing `project: "Court"` to `mcp__linear__save_issue` can resolve to `Court 2`. Issues land in the wrong project; milestone assignment then fails because the milestone lives in the other project.

**Why:** 2026-05-24. Filed SH-432 / SH-433 / SH-435 with `project: "Court"`; all three ended up in `Court 2`. Caught by the milestone validator rejecting `Anteater: More Ants` as cross-project, then a chain of fix-ups to move three issues plus retry the milestone assignment.

**How to apply:**
- Before `save_issue`, look up the target project's UUID once (`list_projects` or a known constant) and pass it as the `project` field.
- Court project UUID: `28b8b695-27a8-4e65-b80e-b6698df93b91`.
- If the user names a project that has any other project whose name starts with the same word, treat it as ambiguous and resolve by ID.
- Same shape as [[feedback_linear_status_use_id]]: prefer IDs over names whenever fuzzy match can land on a sibling.
