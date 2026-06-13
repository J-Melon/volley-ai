---
name: reply-mechanism
description: "Thread the reply under the original via the replies endpoint, never gh pr comment (which floats a top-level issue comment orphan from the thread). The dispatcher replies; the dispatcher does not resolve threads, Josh does."
metadata: 
  node_type: memory
  type: feedback
  parent: feedback_reply_to_review_comments
  originSessionId: 6816739f-74ae-4ab7-bf0c-de2832b60fb1
---

Thread the reply under the original comment:

```bash
gh api -X POST repos/OWNER/REPO/pulls/<n>/comments/<comment_id>/replies -f body="..."
```

`gh pr comment <n>` is WRONG: it posts a top-level issue comment that floats orphan from the review thread. Josh sees a fresh notification, clicks in, and finds his original comment still sitting unreplied with the Reply box empty. Reinforced 2026-04-26 after Josh screenshotted the still-empty Reply box on #451. Get the `comment_id` from the `databaseId` in the [[feedback_reply_find_unresolved]] query.

Keep the reply focused on the delta, not a restatement: "Collapsed the docstring on `is_on_court` to 1 line in `<sha>`" beats paraphrasing the note back. One reply per original comment, not one summary cross-linked across several.

**The dispatcher does not resolve threads; Josh does.** Resolving (the "Resolve conversation" button, or the `resolveReviewThread` mutation) is Josh's action. The reply is my contribution; whether the thread shows resolved is up to him. Don't treat OPEN-but-replied threads as a gap. Reinforced 2026-04-28: I started resolving threads on #526 thinking it was required; Josh: "you dont need to resolve i just didnt see coment replies for some".
