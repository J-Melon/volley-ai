---
name: feedback_gru_codename_in_comments
description: "In PR/inline comment replies, sign as **Gru** (the codename), not **dispatcher**. The `Agent-Role:` commit TRAILER is `dispatcher` (the role). Two different fields: trailer=role=dispatcher, comment signature=codename=Gru. Do not conflate them."
metadata: 
  parent: feedback_codenames
  node_type: memory
  type: feedback
  originSessionId: 9411911b-5a8f-49cf-b403-486f789e4da3
---

Two distinct attribution fields, easy to conflate (I conflated them all of 2026-06-01, signing PR replies `**dispatcher**`):

- **`Agent-Role:` commit trailer = `dispatcher`.** Gru's commits carry `Agent-Role: dispatcher`. This is the ROLE name. Correct as-is; the 32 commits this session are fine. (`.claude/skills/commits/SKILL.md` line 25.)
- **Inline / PR comment reply signature = `**Gru**`.** Replies to review comments lead with the CODENAME in bold, and Gru's codename is Gru, not "dispatcher". (`commits/SKILL.md` line 80 lists `**Gru**` explicitly alongside minion codenames like `**Feldspar**`.)

Josh, 2026-06-01: "you are gru not dispatcher in comments."

**How to apply:** when posting a `gh api .../comments/<id>/replies` or any PR comment as Gru, lead with `**Gru**`. Reserve `dispatcher` for the `Agent-Role:` trailer only. Minions sign with their own rotating codename; Gru signs `**Gru**`. Pairs with [[feedback_inline_findings_and_synthesis_are_detached]] and the commits skill.
