---
name: New project takes the target date of the last project currently in its initiative
description: When creating a Linear project under an initiative, default its targetDate to the latest targetDate among the initiative's existing non-cancelled projects; this slots the new project after the existing roadmap rather than racing the initiative end
type: feedback
originSessionId: a39316b3-d98c-4577-97d8-c03dcfbbad89
---
A new Linear project created under an initiative defaults its `targetDate` to the **latest existing project's `targetDate`** in that initiative, not the initiative's own `targetDate`. The new project slots in after the current roadmap rather than racing the whole initiative deadline.

**Why:** 2026-05-11. First filing used the initiative's `targetDate` (Prototype = 2026-09-30). Josh: "not that but the end of the last project for that init." The initiative end is the cap, not the slot. Defaulting new projects to the cap pretends every new project gets the same runway as the initiative itself; defaulting to the last existing project says "after everything else currently planned," which is what a new project starts as until it earns a sharper deadline.

**How to apply:**

Fetch the initiative's projects and pick the latest non-cancelled `targetDate`:

```python
q = 'query{initiative(id:"<id>"){projects(first:50){nodes{name targetDate state}}}}'
# filter out canceled/completed and projects with no targetDate, then max() by targetDate
```

Set the new project's `targetDate` to that value on creation.

- If the new project has a tighter deadline (a milestone it blocks, an external commitment), use that instead and note the reason in the project description.
- If the initiative has no projects with a targetDate yet, fall back to the initiative's own `targetDate`.
- If the project sits outside any initiative, leave `targetDate` empty until a real deadline exists.
- When the latest project moves earlier or later, do not retroactively shift inherited dates; the inherited value is the snapshot at create time.

As of 2026-05-11 the Prototype initiative's latest project targetDate was 2026-08-04 (Demo Release). Shipments and Large Items inherited that.
