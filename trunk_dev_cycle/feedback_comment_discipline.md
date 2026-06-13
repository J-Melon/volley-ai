---
name: feedback_comment_discipline
description: "Intro to where review comments live and how they close. Findings are inline at path:line, never the main thread; the author replies on each thread as findings are fixed; resolution is Josh's. Descend for the specific rules."
metadata:
  node_type: memory
  parent: feedback_reviewer_output
  type: feedback
  originSessionId: 07ac2119-f17c-4c89-bc04-1784125242cb
---

Where a review's comments live, and how each thread closes. Findings are inline comments anchored
to `path:line`, inline at path:line where the code is ([[feedback_review_findings_live_inline]]). After a
fix, the author replies on each thread naming the commit SHA, and the maintainer resolves
([[feedback_reply_on_threads_maintainer_resolves]]). The synthesis verdict is a separate
body-only review that cannot carry inline findings ([[feedback_inline_findings_and_synthesis_are_detached]]).
