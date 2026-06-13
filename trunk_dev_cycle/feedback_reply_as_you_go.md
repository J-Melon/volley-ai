---
name: reply-as-you-go
description: "Reply to each review comment the same turn its resolving work lands, never as a deferred end-of-mission batch. A batched 'to reply' debt gets miscounted and leaves threads silent while the work is visibly done."
metadata: 
  node_type: memory
  type: feedback
  parent: feedback_reply_to_review_comments
  originSessionId: 6816739f-74ae-4ab7-bf0c-de2832b60fb1
---

Reply to each comment the same turn its resolving work lands, not in one sweep at mission close. A deferred batch is wrong twice: the threads sit silent while the work is visibly done, and the dispatcher accumulates a "to reply" debt it then miscounts (carried "the 18" as a lump when 4 were already replied and 12 outstanding; Josh 2026-06-02 "reply as you go rather than all at once").

The moment a commit resolves a comment, post that comment's reply before moving to the next unit. Decisions resolve comments too: an architecture question settled with Josh gets its reply when the decision is made, not when some later commit ships. Back-fill when missed: if a round shipped without replies, post them as soon as the miss is spotted rather than letting the thread stay silent.
