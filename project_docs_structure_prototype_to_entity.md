---
name: project_docs_structure_prototype_to_entity
description: "Doc structure. A doc starts in designs/01-prototype/ under its discipline folder (design/tech/narrative). When the thing it describes emerges (matures into a stable entity) it bubbles up to a flat \"entity version\", a doc organised by the entity itself, with no discipline folder and no concept/ bucket. The designs/concept/ folder should not exist."
metadata: 
  node_type: memory
  type: project
  originSessionId: 5f05a52d-00d0-4a9c-a342-9027c165d0ba
---

A doc's life has two stages:

1. **Start: prototype, under a discipline.** New docs live in `designs/01-prototype/{design,tech,narrative}/`. The prototype phase keeps the discipline split.
2. **Emerged: bubble to an entity version.** When the thing it describes has emerged (matured into a stable entity), the doc bubbles up to a flat **entity version**, organised by the entity itself, outside the prototype phase and outside any discipline folder.

There is no `concept/` folder; it should not exist. Emerged things are entities, flat. This is the bubble-up structure of SH-442: bubbled docs carry no discipline folders, unlike the prototype docs which do.

**Why:** 2026-05-27. I kept treating `designs/concept/` as the new home for mechanic docs and dropped soul.md and item-design.md there. Josh: "concept should not exist... start in prototype under the discipline, once it emerges it bubbles into an entity version."

**How to apply:** put every doc in `01-prototype/{discipline}/`; never create or add to `concept/`. **Bubbling is Josh's call, not mine.** I do not decide a subject has emerged and promote it to a flat entity version; Josh says when something bubbles up. Until he does, the doc stays in `01-prototype/{discipline}/`. Pairs with [[feedback_extract_to_new_structure]] and SH-442.

**A bubble is two steps: move, then rewrite.** Bubbling is not just `git mv`. The mechanical half relocates the doc to its flat entity name (drop the `NN-` ordinal and the `{discipline}/` path) and fixes inbound links, preserving history as a rename. The substantive half RE-AUTHORS the doc in light of everything now known, because the thing has emerged into a stable entity since the prototype note was written; the doc should read as the matured entity's authority, not a phase-1 discipline note. The two can land separately (move first, rewrite as a deliberate next step), but a bubble is not done at the move. Worked example 2026-05-31: `01-prototype/tech/04-effect-system.md` bubbled to `designs/effect-system.md` (move committed `2dd4c22c`), rewrite-with-current-context deferred as the next step. Start a bubbled doc as a single flat file; promote to an entity FOLDER (`designs/<entity>/`) only when a second related doc needs to join it. The entity bubble exists to STOP the tech/design/narrative discipline split; do not bubble into another discipline bucket (no `designs/tech/`), group by the entity.
