---
name: feedback_reviewer_output_form
description: "The form a reviewer's findings take. Approve is silent: report the verdict to the organiser, post nothing. Block posts each finding as an inline comment at path:line, 30 words each, never the main thread. Only `issue:` blocks; `nitpick:`/`suggestion:`/`question:` ride along non-blocking (max 2 nitpicks). FIRES WHEN a reviewer is about to post."
metadata:
  node_type: memory
  parent: feedback_reviewer_output
  type: feedback
  originSessionId: 07ac2119-f17c-4c89-bc04-1784125242cb
---

A reviewer posts in one of two forms:

- **Approve:** report the verdict to the organiser, post nothing on the challenge. Non-blocking
  findings (`nitpick:`, `suggestion:`, `question:`, at most 2 nitpicks) may ride along as inline
  comments, but they never gate the verdict and never force a re-battle.
- **Block:** at least one `issue:`. Post each finding as an inline review comment at `path:line`,
  30 words each, never on the main challenge thread. Report block to the organiser, who fires the
  one synthesis verdict.

Why: Josh reads on mobile, so a verbose main-thread comment buries the signal; the cap and
inline-only form keep findings scannable. Severity keys the verdict (only `issue:` blocks) so polish
rides along without manufacturing a block-fix-reapprove cycle. The organiser, not the reviewer, owns
the synthesis review. Dispatch-time briefing (the exact template a reviewer is handed) is the
dispatcher's mechanic and lives in the dispatch skill, not here.
