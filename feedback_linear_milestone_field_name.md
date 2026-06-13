---
name: Linear save_issue milestone field is `milestone` (name), not `projectMilestone`
description: To attach a Linear issue to a milestone via mcp__linear__save_issue, pass milestone="<name>"; projectMilestone is read-only in the response
type: reference
originSessionId: d15b1172-9e53-401f-b338-5c126b669606
---
When attaching a Linear issue to a milestone via `mcp__linear__save_issue`, the writable parameter is **`milestone`** (accepts the milestone name as a string). The `projectMilestone` field that appears in `get_issue` / `list_issues` responses is **read-only** for input - passing `projectMilestone` as a save parameter is silently ignored, the call returns 200, and the attachment never persists.

**Why:** Mission Pickle Jar's three issues (SH-287, SH-297, SH-314) were saved with `projectMilestone: <id>` four times across the session. Every save returned 200, none persisted, and the milestone read 0% progress despite all three being Completed. The fix was `milestone: "Pickle Jar"`.

**How to apply:** When attaching an issue to a milestone, always use `milestone: "<name>"`. Verify by checking the response for `projectMilestone: {id, name}` - if the field is absent, the attachment didn't take. Cross-check after status flips and other multi-field saves, since the MCP wrapper may silently drop unspecified fields. Linear milestone progress is also a good heuristic: if every issue is marked Completed and progress reads 0%, the attachments dropped.
