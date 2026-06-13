---
name: feedback_inline_findings_and_synthesis_are_detached
description: "bot-review.yml posts a body-only synthesis review; it CANNOT carry inline findings, so inline comments and the verdict are separate GitHub objects. Reviewer agents must post their own findings as a bot review wrapping a comments array, never raw gh api comments under the dispatcher's token."
metadata: 
  node_type: memory
  parent: feedback_comment_discipline
  type: feedback
  originSessionId: 9411911b-5a8f-49cf-b403-486f789e4da3
---

The `bot-review.yml` workflow posts a synthesis review with `body` + `event` only (no `comments` array). It physically cannot append inline findings. GitHub nests inline comments under a review ONLY when they ride the same `POST /reviews` call in a `comments` array; two separate API calls produce two detached, unlinked objects.

Consequences seen on PR #805 / #802 (battle, 2026-05-31):
- A reviewer agent that posts inline findings via raw `gh api .../pulls/N/comments` lands them under the DISPATCHER's token (J-Melon), not the bot, AND detached from the synthesis verdict. Both attribution and grouping break.
- Off-diff findings (line not in the diff, e.g. a stale summary line the PR forgot to update) cannot anchor inline at all; the Reviews API rejects the line. They survive only in the synthesis body, so on those the body is the sole finding surface.

**Why:** Josh saw "no inline comments on the change requests" and "review state not appended in the main review". The swarm produced detached objects, not one grouped review-with-findings.

**How to apply:**
- The reviewer AGENT posts its own findings as a single bot-authored review wrapping the comments array (`POST /reviews` with `comments`, `event: COMMENT`, empty body) per `.claude/skills/reviewers/SKILL.md`. That review carries the inline findings nested.
- The dispatcher's `bot-review.yml` call carries ONLY the consensus verdict (APPROVE / REQUEST_CHANGES) in the body. It is a second review object by design; it will not and cannot contain the inline comments.
- So expect TWO review objects per blocking PR: the reviewer's findings-review and the dispatcher's verdict-review. They are siblings. If you want the verdict and findings in one object, the reviewer's findings-review must itself carry the verdict event, which the current split does not do.
- Never post inline findings with raw `gh api .../comments` from the dispatcher thread or an agent using the session token; that mis-attributes to the human and detaches from any review. Route through a bot-authored `POST /reviews`.
- Relates to [[feedback_converge_needs_all_reviewers]] and the reviewers skill's "one review per agent per pass" rule.
