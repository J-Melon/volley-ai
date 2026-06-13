---
name: reply-to-review-comments
description: "Every unresolved review comment gets a threaded reply from whoever addresses it, explaining what changed. Silent fixes are not acceptable even when the change is obvious from the diff. The index node for the reply sub-area of the battle branch; descend for the mechanism, timing, and sequence leaves."
metadata: 
  node_type: memory
  type: feedback
  parent: feedback_battle_review_process
  originSessionId: 6816739f-74ae-4ab7-bf0c-de2832b60fb1
---

Every unresolved review comment gets a threaded reply from whoever addresses it, explaining what changed. Applies equally to Josh's comments and to reviewer-agent comments the organiser posts on behalf of the minions. Silent fixes are not acceptable even when the change is obvious from the diff; the reply closes the loop inline on the comment itself, not in the challenge body or a commit message. A change request gets the concrete edit plus the SHA; a question gets the answer; a nit disagreed with gets the reason for keeping it, once.

**Why:** Josh reads the challenge on mobile where the diff is hard to scan, so a reply on his comment tells him directly the note was received and how. The thread becomes a per-comment record of what was accepted, adjusted, or declined, instead of commit-message archaeology. Flagged 2026-04-21 after SH-96 shipped a fix commit acknowledging none of Josh's five comments.

This is the index node for the reply sub-area. The leaves:
- [[feedback_reply_find_unresolved]]: query GraphQL `isResolved == false`, never REST, to find what still needs action.
- [[feedback_reply_as_you_go]]: reply the same turn the work lands, never a batched end-of-mission sweep.
- [[feedback_reply_then_rebattle]]: the full sequence, push then reply then re-battle then report.
- [[feedback_reply_mechanism]]: thread via the replies endpoint not `gh pr comment`; Josh resolves threads, not me.
