---
name: feedback_inline_findings_and_synthesis_are_detached
description: "With findings living in dispatcher reports, bot-review.yml posts a body-only synthesis verdict. There are no inline findings on the PR to attach. The synthesis is the sole PR-facing output per review round."
metadata: 
  node_type: memory
  parent: feedback_comment_discipline
  type: feedback
  originSessionId: 9411911b-5a8f-49cf-b403-486f789e4da3
---

Under the dispatcher-report model, `bot-review.yml` posts a body-only synthesis verdict
per review round. There are no inline findings on the PR to route, attribute, or group.
The synthesis body is the sole PR-facing surface; findings live in the dispatcher reports.
