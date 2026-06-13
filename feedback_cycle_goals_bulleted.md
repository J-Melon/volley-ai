---
name: Cycle descriptions are a flat line of short sentences
description: Linear's cycle-preview UI flattens markdown lists to a single line with literal dashes, so write cycle descriptions as plain sentences separated by full stops
type: feedback
originSessionId: 63a922cb-9834-46c0-b48d-fd28a7512bb9
---
Linear's compact cycle preview (the card next to the cycle name) collapses markdown lists: newlines disappear and bullet characters render as literal text (`- Foo. - Bar.`). Write cycle descriptions as one flat string of short sentences separated by full stops. No header, no bullets, no preamble.

**Why:** Josh iterated on this 2026-04-20; first asked for a bulleted list, then flagged that Linear rendered the bullets as literal dashes on one line. Plain sentences read cleanly in the compact preview.

**How to apply:**
```
Equip loop end-to-end. Cast concepts landed. Security Hygiene closed out. Game Feel spikes landed.
```

Not:
```
- Equip loop end-to-end.
- Cast concepts landed.
```

Nor:
```
Goals:
1. Equip loop end-to-end.
```
