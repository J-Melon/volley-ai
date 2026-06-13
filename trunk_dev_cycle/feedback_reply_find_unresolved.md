---
name: reply-find-unresolved
description: "To find review comments needing action, query GraphQL reviewThreads filtered to isResolved == false. REST /pulls/<n>/comments cannot distinguish resolved threads and re-surfaces ones Josh already closed."
metadata: 
  node_type: memory
  type: feedback
  parent: feedback_reply_to_review_comments
  originSessionId: 6816739f-74ae-4ab7-bf0c-de2832b60fb1
---

To find which comments still need a reply or fix, ALWAYS use GraphQL with `isResolved == false`. The REST list-comments endpoint returns every comment ever made; resolved threads look identical to unresolved ones, so walking REST means re-replying to comments Josh already resolved, or missing the "is this still open?" question entirely.

```bash
gh api graphql -f query='{ repository(owner:"shuck-dev",name:"volley") { pullRequest(number:N) { reviewThreads(first:50) { nodes { isResolved comments(first:5) { nodes { databaseId author { login } path line body } } } } } } }' --jq '.data.repository.pullRequest.reviewThreads.nodes[] | select(.isResolved == false)'
```

The `databaseId` from this query is the comment id the reply endpoint needs. Resolving a thread is Josh's action, not mine ([[feedback_reply_mechanism]]); I do not treat an OPEN-but-replied thread as a gap. Reinforced 2026-04-24 after I listed a pile of #345 comments as "unreplied" when half were already resolved.
