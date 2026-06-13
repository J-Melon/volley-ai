---
name: Read every related design / tech doc before writing about a system
description: Before writing, designing, OR researching anything touching a system, grep designs/** for the doc that owns it and read it. Do not infer from chat or one doc, and do not re-derive a decision a doc already owns.
type: feedback
parent: feedback_read_designs_before_linear
originSessionId: current
---

Before writing, deciding, or researching anything touching a system, find the doc that owns it and read it. The spec is the standard source for what the mechanic, decision, or convention actually is. Glob `designs/**` for the topic first, grep second; check `INDEX.md`.

**Scope is broad: prose AND design decisions AND research.** A wrong inference is the small cost. The large cost is building a PARALLEL AUTHORITY that duplicates and contradicts the owning doc, then deleting it. If a doc owns the decision, read it and update it; do not re-derive a worse version beside it.

**Why:**
- 2026-05-15, gear narrative: wrote the protagonist "reaching for a piece" without reading `04-shop-drag-drop.md` (held token follows cursor, original stays, silent cancel). Josh: "do you not know the item controls? They have docs, always read the related docs."
- 2026-06-08, sprite resolution: spent a long thread (three research dispatches, two battle rounds, a dozen rewrites) deciding resolution without reading `designs/art/tech-pipeline.md`, which already owned it, better, with the per-class mipmap split I got wrong. Josh: "we have an art pipeline, it should be updated."

**How to apply:**
- If the work makes a claim about a player gesture, control, animation, state transition, or an engineering convention (resolution, format, budget), the owning doc is required reading. No exceptions.
- Dispatching a writer or researcher: list the related docs in the brief; do not assume the agent finds them all.
- The protagonist is the OBJECT player gestures act on; voice reflects being-acted-on.
