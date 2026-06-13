---
name: feedback_memory_holds_durable_facts
description: "never bake ephemeral point-in-time state into a memory file (which cycle is current, in-flight issue/PR numbers as if permanent, today's specific values, a frozen \"history so far\" / \"current; next\" pointer); memory holds durable rules/facts/conventions; ephemeral state is read live from the source. FIRES WHEN writing or editing a memory"
metadata: 
  parent: feedback_memory_writing
  node_type: memory
  type: feedback
  originSessionId: d02a499f-c4f9-4a64-8064-3fe72205ad96
---

Memory files hold durable things: rules, conventions, structural facts, tool limits (a char cap is durable, keep it). They must NOT bake ephemeral point-in-time state, the things that are true now and stale next week:
- which cycle is current or next (read it live: `cycles(orderBy: createdAt)`)
- specific in-flight issue/PR numbers cited as if permanent
- today's specific config values or counts as standing facts
- a frozen "history so far" or "X (current); Y (next)" pointer

**Why:** Josh, 2026-06-03: "kill specifics like that from memory... specifics like ephemeral information like the current cycle." `reference_cycle_themes` had baked "#3 (current); #4 (next)" which was stale (we were on #5). The convention (alphabetical puppets) is durable and stays; the current/next pointer is rot. Distinct from the good kind of specific: a char limit, a label ID, a UUID, a tool's hard cap are durable and welcome.

**How to apply:**
- Writing/editing a memory: if a line states what is true *right now* and would be wrong after the next cycle/sprint/merge, cut it and point at the live source instead ("check X to see current state").
- A dated event ("Josh flagged on 2026-04-20 during cycle #4 planning") is fine: it is a historical record of when something happened, not a claim about current state.
- This is the memory-file sibling of [[feedback_vague_numbers_in_long_lived_docs]] (same rule for contributor docs). Both: describe the durable rule, read the ephemeral value live.
