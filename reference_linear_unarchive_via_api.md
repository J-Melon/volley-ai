---
name: reference_linear_unarchive_via_api
description: "The Linear MCP cannot unarchive an issue, and relatedTo/blocks silently NO-OP against an archived target (the save succeeds, the relation just does not attach). FIRES WHEN linking to an archived issue or needing to unarchive one. Use the raw GraphQL issueUnarchive mutation via $LINEAR_API_KEY, then set the relation."
metadata: 
  node_type: memory
  type: reference
  originSessionId: a42b62a1-2ceb-48fc-9437-44727f177f2c
---

The Linear MCP (`mcp__linear__save_issue`) has **no unarchive method**, and setting a state to its current value does not un-archive. Worse, `relatedTo` / `blocks` / `blockedBy` **silently no-op against an archived target**: `save_issue` returns success, but the relation does not attach and the response does not echo relations, so it looks like it worked when it did not. Always verify a relation actually attached.

Seen 2026-06-01: linking SH-465 `relatedTo` SH-116 failed twice because SH-116 was archived. No MCP error, just an empty `relations` on read-back.

**How to apply:**
- Unarchive via the raw GraphQL API (key in `$LINEAR_API_KEY`, endpoint `https://api.linear.app/graphql`):
  ```
  curl -s -X POST https://api.linear.app/graphql \
    -H "Authorization: $LINEAR_API_KEY" -H "Content-Type: application/json" \
    -d '{"query":"mutation { issueUnarchive(id: \"SH-116\") { success } }"}'
  ```
  The mutation accepts the human identifier (`SH-116`) as `id`.
- Then set the relation with `mcp__linear__save_issue(relatedTo: [...])`.
- **Verify it attached** with a relations query, because the save response does not echo relations:
  ```
  query { issue(id: "SH-465") { relations { nodes { type relatedIssue { identifier } } } } }
  ```
- Same API-over-MCP escalation as [[feedback_prompt_mcp_reauth_before_curl]], but here it is a missing MCP method, not auth: the MCP simply does not expose unarchive.
