---
name: design-docs-location
description: "Project design documents are in the designs/ folder: always read these before reading game code for context"
metadata: 
  node_type: memory
  type: reference
  originSessionId: a42b62a1-2ceb-48fc-9437-44727f177f2c
---

Design documents live in `designs/` in the project root:

- `designs/north-star.md`: vision, tone, core loop, idle principles, difficulty philosophy
- `designs/roadmap.md`: full milestone breakdown with point estimates
- `designs/01-prototype/`: individual design docs for each prototype feature (00-07)

**How to apply:** Always read the relevant design doc before reading game code. The docs explain *why* things are built the way they are, which code alone can't tell you.

**Pending rename + scope (Josh, 2026-06-01):** `designs/` is to be renamed to `docs/` (not yet done; verify the live folder name before pathing). **Concept art is NOT design docs.** Concept-art exploration outputs (character/garden/ball/gear/movement/soul PNGs) live in their own `concepts/` dir at repo root, separate from the docs tree; do not file them under `designs/`/`docs/`. Whether `concepts/` is tracked or gitignored is Josh's call.
