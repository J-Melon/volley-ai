---
name: to-clean-noisy-pr-reviews-comments-use-graphql-minimizecomment-do-not-edit-the-body
description: "GitHub Reviews and review comments can be hidden via `minimizeComment` (classifier RESOLVED / OUTDATED / OFF_TOPIC / DUPLICATE / SPAM). Minimize hides the content from the UI without losing it. Editing the body to \".\" or empty is destructive and unnecessary. Triggers on every PR-cleanup task."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 56ba4a44-e553-4f5c-bd77-714693445ba7
---

## The rule

When cleaning up noisy PR Reviews or review comments (verdict-block bodies, duplicate fan-out reviews, resolved-but-still-visible threads), use the GraphQL `minimizeComment` mutation. Do NOT edit the body via `gh api -X PUT .../reviews/<id>`.

```bash
gh api graphql -f query='mutation($id: ID!) {
  minimizeComment(input: {subjectId: $id, classifier: RESOLVED}) {
    minimizedComment { isMinimized minimizedReason }
  }
}' -F id="<node_id>"
```

`subjectId` is the GraphQL node_id (the `node_id` field on a REST review response, prefix `PRR_` for Reviews, `PRRC_` for review comments). Classifier values: `RESOLVED`, `OUTDATED`, `OFF_TOPIC`, `DUPLICATE`, `SPAM`.

`minimizeComment` works on the union type `Minimizable`: `IssueComment`, `PullRequestReview`, `PullRequestReviewComment`, `CommitComment`, `GistComment`.

## Why edit is wrong

- **Destructive.** Editing the body to "." or "" overwrites the original review verdict and reasoning. If anyone ever wants the audit trail, it is gone.
- **Sometimes rejected.** GitHub returns `Body required for pull request reviews that are commented` when you PUT an empty body to a COMMENTED-state Review. The dot-fallback works but pollutes history with literal "." entries.
- **Doesn't actually hide.** Edited bodies still occupy a block in the conversation timeline. Only minimize collapses them in the UI.

## When edit IS appropriate

Editing is the right tool when you actually want to change the visible content (correct a typo in a PR description, update a PR body after rebase, fix wrong attribution in a comment). Cleanup of noise is not that case.

## Listing candidates for minimize

```bash
gh api --paginate "repos/<owner>/<repo>/pulls/<N>/reviews" \
  --jq '.[] | select(.user.login == "<your-login>") | "\(.id) \(.node_id)"'
```

Then pipe `node_id`s into the GraphQL mutation. Same pattern works for inline review comments via `pulls/<N>/comments` (those use `PRRC_` node IDs).
