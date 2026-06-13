---
name: reply-then-rebattle
description: "After a push that addresses review comments, the sequence is push -> reply inline per comment -> dispatch re-battle on the new SHA -> report the new verdict. No step is optional; the reply step sits between push and re-review, not after it."
metadata: 
  node_type: memory
  type: feedback
  parent: feedback_reply_to_review_comments
  originSessionId: 6816739f-74ae-4ab7-bf0c-de2832b60fb1
---

The full sequence after a fix lands, every time: **push, reply inline per comment, dispatch re-battle on the new SHA, report the new verdict to Josh.**

- The reply step sits BETWEEN push and re-review dispatch, not after it. Going straight from push to re-review skips the replies and leaves threads silent. Reinforced 2026-04-23 on #339 after `9007a3d` addressed all 11 round-2 comments with no replies until Josh scanned the trail.
- The re-battle dispatch is part of the sequence, not optional. Stopping at "replies posted" leaves the challenge carrying a stale prior verdict the push already invalidated, with no fresh verdict until Josh manually pokes it. Reinforced 2026-04-24 on #361 after I pushed `db7af73`, posted five replies, and sat waiting; Josh: "Did you rebattle?"
- Reviewer findings are not auto-fold instructions: surface them to Josh for the verdict before acting. Read findings, post replies, surface, get the verdict, then act. Reinforced 2026-05-24 on #727 after I chased coverage instead of asking; Josh: "you tried to fix before asking".
