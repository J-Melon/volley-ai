---
name: researcher agent has no Linear MCP; use issue-writer for issue-surveys
description: The researcher sub-agent's tool list is Read/Grep/Glob/WebSearch/WebFetch/context7; Linear MCP tools are NOT available. Use issue-writer or general-purpose for tasks that require reading Linear issues
type: reference
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
When dispatching a sub-agent to survey or review existing Linear issues (dandori passes, issue-hygiene audits, cycle-dossier reviews), DO NOT dispatch `researcher`. Researcher's tool list is Read/Grep/Glob/WebSearch/WebFetch/context7. Linear MCP tools (`mcp__linear__get_issue`, `list_issues`, etc.) are not in its schema.

Use `issue-writer` instead; it holds the Linear MCP. Or `general-purpose` if the brief needs Bash + Linear + filesystem at once.

**Why:** Reinforced 2026-04-24 after Zephyr blocked on the Minion Hardening dandori brief because she was dispatched as researcher and couldn't pull issue bodies. Re-dispatched Dipper as issue-writer; work continued.

**How to apply:**
- Brief requires reading Linear issues → issue-writer or general-purpose.
- Brief is web research (context7, WebSearch, WebFetch, external docs) → researcher.
- Brief is both → dispatch issue-writer with the Linear half and researcher with the web half in parallel, merge in organiser.
