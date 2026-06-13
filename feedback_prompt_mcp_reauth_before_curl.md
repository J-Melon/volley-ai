---
name: Prompt for Linear MCP re-auth before falling back to GraphQL curl
description: When mcp__linear__* shows as deferred-but-unauthenticated, ask Josh to re-auth before reaching for raw curl + LINEAR_API_KEY
type: feedback
originSessionId: d792e612-7af1-4674-81f7-90641ad52563
---
When the Linear MCP server appears in the deferred-tool list with only `authenticate`/`complete_authentication` reachable (i.e. session is unauthenticated), don't silently fall back to raw GraphQL via `curl` + `$LINEAR_API_KEY`. Surface the situation and offer to have Josh re-auth so the full mutation surface (`save_issue`, `save_milestone`, `save_comment`, etc.) becomes available.

**Why:** The MCP path is the preferred surface — it's typed, schema-checked, and consistent with how other agents in the swarm work. Curl + GraphQL works but is harder to read, easier to fat-finger, and skips the MCP's input validation. Josh authenticates Linear MCP routinely; he'd rather re-auth than have me hand-roll mutations.

**How to apply:** First Linear write of any session: check if the full `mcp__linear__*` tools are reachable. If only `authenticate`/`complete_authentication` are listed, raise it ("Linear MCP isn't authenticated this session — want me to use it via curl, or will you re-auth?") rather than just defaulting to curl. Once re-authed, prefer MCP tools for saves/comments/milestones.
