---
name: GitHub PR reviews can be edited but not deleted once submitted
description: A submitted PR review can have its body overwritten via `PUT /repos/:o/:r/pulls/:n/reviews/:id` but cannot be deleted via REST or GraphQL.
type: reference
originSessionId: 94cc4c04-cdf0-42ec-8706-e2ea78278a1f
---
GitHub's review API:

- `DELETE /repos/:o/:r/pulls/:n/reviews/:id` works **only on pending reviews**. A review submitted with state `COMMENTED`, `APPROVED`, or `CHANGES_REQUESTED` returns `422 Can not delete a non-pending pull request review`.
- The GraphQL `deletePullRequestReview` mutation has the same restriction.
- `PUT /repos/:o/:r/pulls/:n/reviews/:id` with `body=...` **does** edit the body of a submitted review. The state stays the same; the body content is overwritten.

When stale reviews need to come down (spec rewritten, findings no longer apply, accidental main-thread comment that should have been inline), the move is to overwrite the body with a short superseded marker, not to try deletion. Example body: `*Superseded by spec rewrite. Findings recorded in earlier doc revision.*`

Inline review comments (PullRequestReviewComment, attached to a file/line) **can** be deleted via `DELETE /repos/:o/:r/pulls/comments/:id`. Issue comments (`/issues/:n/comments`) can also be deleted. The non-deletion rule only applies to the review record itself.
