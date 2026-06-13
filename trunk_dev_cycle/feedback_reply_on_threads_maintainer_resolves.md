---
name: feedback_reply_on_threads_maintainer_resolves
description: "After fixing review findings, I reply on each inline thread with what changed and the commit SHA, then stop. Replying is the author's job; resolving the thread is the maintainer's, part of the manual-merge review pass. FIRES WHEN findings are fixed and pushed."
metadata:
  node_type: memory
  parent: feedback_comment_discipline
  type: feedback
  originSessionId: 5f05a52d-00d0-4a9c-a342-9027c165d0ba
---

When I have fixed review findings: commit, push, then reply on each inline thread saying how it was
addressed and naming the commit SHA. That reply is my part as the author, and it closes the loop the
reviewer opened. Resolution is the maintainer's: the thread resolves as part of the review pass that
ends in the manual merge. Two clean halves, the author replies, the maintainer resolves.

Pairs with [[feedback_no_auto_merge_manual_approval]] (the approval is the maintainer's manual merge, mine to request changes but never to grant)
and sits under the review tree [[feedback_battle_review_process]].

The two ditches, tucked: pushing the fix silently with no reply leaves the reviewer's thread
dangling; resolving the thread myself takes a call that is the maintainer's. Both are the same line,
I reply, the maintainer resolves. PR #754.
