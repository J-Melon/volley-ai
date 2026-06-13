---
name: reference_release_notes_format
description: "The format Josh wants for Volley! release notes (GitHub release body). FIRES WHEN writing or summarising a release description. Sections by change type (Breaking / Features / Fixes), bolded-label bullets, each line a short plain explanation of what the change is and why it matters. Not prose paragraphs, not compressed clause-piles. Every line verified against its linked issue first."
metadata: 
  node_type: memory
  type: reference
  originSessionId: a42b62a1-2ceb-48fc-9437-44727f177f2c
---

The release-notes shape Josh settled on for Volley! (0.3.0 draft, 2026-06-01), after rejecting prose paragraphs, then rejecting terse-but-dense one-liners.

**Structure: sections by change TYPE.**
- `## Breaking` first (the heads-up a tester must not skim past).
- `## Features`
- `## Fixes`
- Keep the placeholder opener line; Josh rewrites the opener at publish time.

**Each entry: a bolded label, then a short plain explanation.**
- `- **Label.** One or two plain sentences saying what the change is and why it matters to a player.`
- Example that landed: `- **Equip loop.** Call a timeout to open the equip window, then drag gear from the rack onto your character to apply its effect. Drag it back to unequip. A capacity cap limits how much you can carry at once (#675).`
- Trailing `(#NNN)` GitHub PR ref on each line.

**The register, calibrated against three rejected drafts:**
- NOT prose paragraphs per change ("too verbose").
- NOT compressed clause-piles either: a short line that crams clauses ("drag gear onto the character in a timeout to equip, back to the rack to unequip; kit capacity cap") is "verbose in a short way", still wrong. Josh: "should explain these features a bit".
- The target is the MIDDLE: plain technical writing that actually EXPLAINS each feature in a sentence or two. Clear over compressed. Suckint where it can be, explained where the reader needs it. My default failure mode is compressing instead of clarifying.
- No em dashes (banned project-wide).
- Player/tester audience, not a developer changelog. Drop ALL internal noise (docs, chore, ci, test, skills, agents, deps).

**Verify every line against its linked issue before listing it** (see [[feedback_release_notes_verify_against_issues]]). A PR title is not proof the behaviour shipped; reconcile deferrals.
