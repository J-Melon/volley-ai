---
name: art bible holds general visual + craft fiction; character-specific content lives in character docs
description: designs/art/bible.md is the general visual fiction for the world; per-character arc and identity belongs in designs/characters/*.md; per-act story shape belongs in designs/narrative/outline.md; the bible refers out, doesn't repeat
type: feedback
originSessionId: current
---

**The rule.** The art bible at `designs/art/bible.md` stays general. It carries the visual fiction for the world (palette, line, treatment, animation, constants, six marks, diegetic surfaces, venues at the visual level) and the world-shape paragraph. It does NOT carry per-character arc fiction, per-act story shape, or character-specific names and beats. Those live in:

- `designs/characters/<name>.md` for per-character arc and identity (Fern's doubled meaning, Zach's withdrawal, Stephanie's role).
- `designs/narrative/outline.md` for per-act story shape (Acts I-IV + Postgame).

The bible may name characters by role (the protagonist, the friend at the stall, the partner) and gesture at the arc, but specifics route out via cross-link.

**Why.** If the bible carries character-specific content, every narrative fiction shift cascades into bible edits (Josh's session sweep: "Zach missing", "Fern exits", "championship duel" all landed in bible because the bible duplicated outline shape). The general-vs-specific split lets the bible stay stable across narrative iterations; only outline and character docs churn when fiction shifts.

**How to apply.**

- Editing bible: ask "is this a visual / craft / world-general claim?" If yes, it belongs. If it names a specific character by name, a specific arc beat, or a specific story-shape detail, lift to the character doc or the outline.
- Bible sections that look generic but carry character-specific content (e.g. §4 cast with per-character roles): keep the visual role description, route the arc and identity to the character doc.
- When a fiction shift would otherwise force a bible rewrite: that's a signal the bible was too specific. Generalise; the shift lands cleanly in outline + character docs without touching the bible.
- Sharpened 2026-05-24 on PR #715 (SH-423 Outline Rework): I made multiple bible edits to align with new outline fiction (the cliff and gate, Zach on bench, championship duel). Josh: "bible should be general so we don't need changes like this; we should have separate docs for characters." The bible should not have needed those edits; the character / outline docs absorb them.
