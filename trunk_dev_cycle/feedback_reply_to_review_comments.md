---
name: reply-to-review-comments
description: "With findings living in dispatcher reports, there are no PR inline threads to reply to. The dispatcher reads reports, dispatches fixes, and fires the bot-review verdict. The fix is the reply."
metadata: 
  node_type: memory
  type: feedback
  parent: feedback_battle_review_process
  originSessionId: 6816739f-74ae-4ab7-bf0c-de2832b60fb1
---

Findings live in the dispatcher report. The dispatcher reads the reports, decides which
findings to fix, dispatches implementers, and fires the bot-review verdict. There are no
PR inline threads to reply to or resolve. The fix commit is the record; the re-battle
verdict closes the loop.
