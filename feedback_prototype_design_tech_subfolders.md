---
name: Prototype docs split into design/ and tech/ subfolders
description: 01-prototype/design/ holds high-level player-facing design (feel, narrative framing, what the system means). 01-prototype/tech/ holds implementation specs (mechanism, data shape, edge cases). A feature with both shapes lives as two docs, one in each folder, cross-linked.
type: feedback
originSessionId: b1489a97-03c8-47b5-a015-d6527748dc96
---
`designs/01-prototype/` splits into two subfolders: `design/` and `tech/`. Each doc covers one or the other, not both.

**`01-prototype/design/`** holds high-level, player-facing design: how a system feels, what it means in the world, the narrative framing, the player-observable rules. Sentences like "the player feels the ball being held in by friendship" belong here.

**`01-prototype/tech/`** holds implementation spec: mechanism, data structures, per-frame state, edge cases, numerical concerns, open implementation questions. Sentences like "`gravity_scale = 1` above the bound, speed-lock releases" belong here.

A feature with both shapes lives as two docs, one in each folder, cross-linked. The design doc opens with a "Implementation spec lives in [`../tech/foo.md`](../tech/foo.md)" pointer; the tech doc opens with a "Player-facing design lives in [`../design/foo.md`](../design/foo.md)" pointer.

**Why:** 2026-05-10, Banana Tank PR #603. The pre-split file `08-court-control.md` mixed implementation rules with player-feel framing ("the player feels the ball being held in"); the design context bled into the spec. Josh called for the split: "there needs to be a clear distinction between design docs and tech docs even within the prototype stuff." Rebases poorly with subsequent rewrites; cleaner to split early.

**How to apply:**

- New prototype doc: pick design or tech and place it in the right subfolder. If it covers both, split into two from the start.
- Existing prototype doc that mixes shapes: rewrite into two clean docs in their respective subfolders, cross-linked.
- Backfill of the split is per Josh's "clean as we go" rule: only move/rewrite the docs touched by the current PR's scope, not a sweep of the whole `01-prototype/` tree.
- Cross-folder reference: `../tech/foo.md` from within `design/`, `../design/foo.md` from within `tech/`. Sibling references inside the same subfolder use bare filenames.
- Inbound references from other places (other prototype docs, narrative, art) use `01-prototype/design/foo.md` or `01-prototype/tech/foo.md`.
- Pairs with `feedback_spike_split_design_tech.md` (spikes file as two issues, design + tech) and `feedback_discipline_folders_are_fiction.md` (discipline folders are the future home, phase folders are working drafts; the sub-split lives within the phase folder).
