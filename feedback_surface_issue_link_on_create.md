---
name: feedback_surface_issue_link_on_create
description: "FIRES WHEN I create a Linear issue. Always give Josh the issue URL in the reply (the `url` field from save_issue, e.g. https://linear.app/shuck-games/issue/SH-NNN/slug). Don't just report the identifier; he wants the clickable link to open it."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

Every time I create a Linear issue, surface its URL in the response. `save_issue` returns a `url`
field; paste it. Reporting just "filed SH-469" is not enough, Josh wants the clickable link to
jump straight to the issue.

Josh, 2026-06-03: "when making an issue give me the link."
