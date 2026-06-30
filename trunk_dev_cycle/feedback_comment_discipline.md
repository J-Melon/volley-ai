---
name: feedback_comment_discipline
description: "Reviewer findings reach the dispatcher through the dispatcher report. The PR carries only the dispatcher's bot-review synthesis verdict, fired via bot-review.yml. No reviewer agent posts on the challenge."
metadata:
  node_type: memory
  parent: feedback_reviewer_output
  type: feedback
  originSessionId: 07ac2119-f17c-4c89-bc04-1784125242cb
---

Reviewer findings travel through the dispatcher report: path, line, severity, consequence.
The dispatcher reads the reports, decides what to fix, dispatches implementers, and fires
`bot-review.yml` for the single PR-facing verdict per review round. The challenge carries
only that synthesis verdict.
