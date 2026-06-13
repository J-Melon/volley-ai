---
name: Use @-mention to trigger Josh's Linear Inbox on agent-driven work
description: Linear self-actions don't create Inbox entries. When the organiser's API key assigns Josh or moves an issue, follow up with an @-mention comment so the notification actually fires
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
`$LINEAR_API_KEY` belongs to Josh's account. Any Linear mutation using that key treats Josh as the actor. Self-assignments and self-state-changes therefore generate no Inbox entry, even though the issue is now on Josh.

**The @-mention workaround does NOT work.** Verified empirically 2026-04-24:
1. `@yosh` plain text on SH-216 (comment `86b972ae`); silent, not parsed as mention.
2. `@[Josh Hartley](uuid)` structured markdown on SH-216 (comment `9d96ce40`); also silent. Syntax was correct; self-actor rule still suppressed the Inbox entry.

**Self-actor suppression is the load-bearing problem**, not syntax. No event from Josh's own API key fires Josh's Inbox. Empirically verified 2026-04-24 across three event types:
- Assignment to Josh via `issueUpdate({assigneeId})`; silent
- Mention via plain text `@yosh` AND via structured `@[Josh Hartley](uuid)` markdown; both silent
- State change via `issueUpdate({stateId})` (Ready → Dispatched); silent

Service account (paid Linear seat) is the only clean fix.

Do not rely on this workaround. Earlier memory claim that `@yosh` comments would trigger Inbox was wrong. Assigned-to-me dashboard view remains the reliable surface for agent-driven Linear work.

**Shape:**

```
curl ... -X POST https://api.linear.app/graphql -d '{
  "query": "mutation { commentCreate(input: {issueId: \"<issue-uuid>\", body: \"@yosh; <context + action you want him to take>\"}) { success } }"
}'
```

**When to use:**
- Right after assigning Josh to an issue via agent.
- When an issue enters a state that wants Josh's attention (Ready in active cycle, Challenged awaiting his merge, etc.).
- NOT on routine state changes that don't need Josh's eye.

**When to skip:**
- If the mutation is made via a non-Josh actor (future: a service account with its own API key). Then the assignment itself creates the Inbox entry.
- Routine triage churn.

**Future fix:** paid Linear seat for a service account. Its API key makes agents act as a non-Josh user, and ordinary assignment/comment flow generates Inbox entries natively. Reinforced 2026-04-24: Josh chose the @-mention workaround for now, open to revisiting the service-account path when worth the paid seat.
