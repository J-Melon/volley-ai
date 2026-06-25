---
name: ticket-bug-shape
description: The bug-report ticket shape: Summary, Steps to Reproduce, Expected, Actual, Environment, then ACs. FIRES WHEN I file a defect.
node_type: memory
type: feedback
parent: feedback_ticket_shape
---

A bug-report ticket frames a defect:

```
Summary: <one line>

Steps to Reproduce:
1. <action>
2. <action>

Expected: <what should happen>

Actual: <what happens instead>

Environment: <Godot version, build type>
```

Then the AC checklist. Punctuate as full sentences. Keep the body under twelve lines.

Each AC is a checkable outcome the player observes after the fix. Phrase each AC as the result, in fresh words. Remove internal assertions from ACs.
