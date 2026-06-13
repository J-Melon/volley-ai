---
name: Tech art can proceed in parallel with art direction
description: tech-art pipeline work is not blocked by the style guide; the general direction is known enough for pipeline decisions
type: feedback
originSessionId: 63a922cb-9834-46c0-b48d-fd28a7512bb9
---
The tech-art side of Art Foundation (Godot rendering setup, asset pipeline, register shifts, animation structure, lighting, delivery format) can run in parallel with the art-direction work (style guide, palette, line, concept sketches). Do not add `blocks` relationships that gate tech art on the style guide landing.

**Why:** Shuck has a general idea of the visual style already. That direction is specific enough to make pipeline decisions against: shader register count, delivery format per asset type, animation rig decisions, etc. Waiting for the style guide to be 100% final before starting the pipeline costs weeks with no real gain. Josh flagged this on 2026-04-20 during cycle #4 planning.

**How to apply:**
- When planning dependencies for art work, do not treat the style guide as a blocker for tech-art pipeline issues. They run concurrently.
- Tech-art pipeline work can start as soon as there's a concept direction; it does not need polished style reference.
- Final colour / register choices still wait on the guide; pipeline structure does not.
