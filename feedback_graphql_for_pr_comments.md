---
name: Use GraphQL reviewThreads for fresh challenge review comments, not REST
description: REST pulls/<n>/comments can miss fresh review comments even when within the requested time window; GraphQL reviewThreads is the reliable source of truth
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
When fetching challenge review comments to check whether Josh has left new ones, use GraphQL's `reviewThreads` node, not REST's `repos/OWNER/REPO/pulls/<n>/comments`. REST has missed fresh comments in practice, even comments within the time window passed to `jq select`. GraphQL returns them reliably.

Shape:

```
gh api graphql -f query='{
  repository(owner:"shuck-dev",name:"volley") {
    pullRequest(number:<N>) {
      reviewThreads(last:20) {
        nodes {
          isResolved line path
          comments(first:3) { nodes { author { login } createdAt body } }
        }
      }
    }
  }
}'
```

**Why:** Reinforced 2026-04-24 on #366. Josh left two inline comments at 20:24:57Z and 20:25:51Z. My REST query with `jq 'select(.created_at > "2026-04-24T20:25:00Z")'` returned nothing. GraphQL `reviewThreads(last:10)` returned both. Josh asked "Are you looking at timestamps?"; the lesson isn't the timestamps, it's the API surface.

**How to apply:**
- When checking for fresh inline comments, reach for `gh api graphql` with `reviewThreads`, not `gh api repos/.../pulls/<n>/comments`.
- Top-level issue comments still come from `gh api repos/.../issues/<n>/comments`; REST is fine there.
- Use `isResolved` from GraphQL to filter out threads Josh has closed.
- When Josh says "there are more comments" and my query finds none, try GraphQL before responding that nothing's there. A miss at the REST layer doesn't mean a miss in reality.
- Include `line` and `path` in the GraphQL selection set so the reply knows where to thread.
- **Fetch `comments(last:N)`, not `comments(first:1)`.** Josh replies inside existing threads; those replies are latest comments on a thread, not new top-level ones. `comments(first:1)` only returns the original opener and misses every subsequent reply. Use `last:5` (or more) and check the LAST comment's author per thread to catch fresh replies. Reinforced 2026-04-24 on #383: I queried `first:1` and missed Josh's "this is a negative framing" reply in the L108 thread until he asked "Did you look at replies?"
