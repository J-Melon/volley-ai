---
name: Big items earn their own project; small items live under Items
description: Items with their own catalog, shipping, design, tech, art, and integration story get a dedicated Linear project (Bot, Dog, Jukebox shape). Smaller items live under the Items project.
type: feedback
originSessionId: b1489a97-03c8-47b5-a015-d6527748dc96
---
Volley's Linear shape: most items live as tickets under the **Items** project, but items that carry their own full pipeline (catalog story, shipping integration, design discovery, tech spike, art, multi-subsystem integration) graduate to their own project. **Bot** is the established pattern: a court-role item with paddle-driving logic, idle-play integration, and a narrative beat at first purchase. **Dog** (ball-fetching helper) and **Jukebox** (music item) sit in the same class and get their own projects.

**Why:** 2026-05-10. I proposed distributing helpers by what they do, with the dog landing as a ticket in **Items**. Josh: "big items like dog or jukebox should have their own project with the catalog and shipping work." Items-as-tickets fits one-tile additions; system-shaped items need their own project to hold the spike, discovery, catalog, shipping, art, and integration tickets without crowding Items.

**How to apply:**

- Scope check before filing a new item: does it have its own catalog page, shipping flow, narrative beat, multi-subsystem integration, distinct fixture/behaviour pattern? If yes, file as a project. If it's a one-tile effect that slots into the existing item-effect surface, file as a ticket under Items.
- Project shape for big items mirrors Bot: spike + discovery + catalog ticket + shipping ticket + per-feature tickets + ride.
- Pairs with `feedback_spike_split_design_tech.md` (each big-item project files spike + discovery as the first two issues) and `feedback_dandori_structure.md` (mission interrogation walks the project shape before filing).
- When in doubt, ask whether the item has its own ride and its own design doc; both yes leans project, both no leans ticket-under-Items.
