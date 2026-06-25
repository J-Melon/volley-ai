---
name: feedback_batch_independent_calls
description: "When tool calls have no dependency between them, issue them in ONE message with multiple tool uses, not sequential turns."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 6e68bffd-7c3f-4cda-81d4-9afc186a3d07
  parent: trunk_dev_cycle
---

When several tool calls have no dependency on each other's results, put them in a single message as
parallel tool uses. Do not spread independent work across sequential turns.

**Why:** sequential calls for independent work burn turns and wall-clock for nothing. The dependency is
the only thing that forces ordering: if call B does not read call A's output, they go together. Josh,
2026-06-11: "could you not have done that in one call?" after I made a verify-read and a memory edit as
separate trailing turns when they were independent. This is always-on, not pressure-triggered (that is
[[feedback_batch_under_context_pressure]], a separate mode for when Josh signals a limit).

**How to apply:**
- Before sending a tool call, ask: does the next thing I will do depend on this result? If no, send them
  together.
- Reads across different files/issues, edits to unrelated files, a set of the same mutation across N
  items: all batch into one message.
- Only split when B genuinely needs A's output (a value to pass, a state to branch on).
