---
name: extended-thinking-off
description: Josh runs Claude Code with extended thinking disabled (MAX_THINKING_TOKENS=0)
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 07114971-0755-4628-bfe9-5c815fd107cc
---

Extended thinking is disabled in Claude Code via `MAX_THINKING_TOKENS=0` in the `env` block of `~/.claude/settings.json`.

**Why:** Most Volley work (dispatch coordination, doc edits, ticket writing, scene/script ops through GodotIQ) doesn't need it, and it added latency plus token cost. It was also implicated in a `400 ... thinking blocks ... cannot be modified` harness error Josh hit on 2026-05-28. With no thinking blocks, that class of error can't fire.

**How to apply:** Don't reach for or recommend re-enabling thinking for routine work. If a genuinely hard reasoning task comes up (gnarly gameplay-logic bugs, refactor planning) it can be flipped back on per-need, but the default is off.
