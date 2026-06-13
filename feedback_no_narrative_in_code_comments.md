---
name: Code comments don't reference narrative concepts
description: Comments in scripts and tests speak in mechanics (rally speed, held state, gravity_scale, friendship-bound). They don't reference narrative things (friendship as bond, the spirit, devotion, tribute). Narrative concepts drift; mechanic terms stay stable.
type: feedback
originSessionId: b1489a97-03c8-47b5-a015-d6527748dc96
---
Code comments stay in mechanic vocabulary. References like "friendship energy carries through grab-and-release" are wrong; the right form is "rally speed carries through grab-and-release." The mechanic term is what the code does; the narrative term is what the rally feels like, and that lives in `designs/narrative/`.

**Why:** 2026-05-10. Two ball-reconciler comments said "friendship energy" when they meant "rally speed." Narrative concepts get rewritten more often than mechanic ones; comments that lean on narrative drift the moment narrative reframes (the friendship/spirit synthesis happened twice this session). Mechanic terms anchor on code symbols (`linear_velocity`, `_speed`, `gravity_scale`) that already exist in the code.

**Carve-out: code symbols named after narrative concepts are fine to reference.** Volley's currency is `friendship_point_balance` / `friendship_points_per_hit` in code; comments naming "friendship points" or "FP" are referring to the symbol, not the narrative. The rule is about narrative *flavour* in comments, not about avoiding the literal word "friendship" when it is the system's name.

**How to apply:**

- When writing a doc comment or inline note, ask: am I describing what the code does, or what the rally feels like? The first is fine. The second goes in `designs/narrative/`.
- Replace narrative-flavoured nouns with mechanic ones: "friendship energy" → "rally speed," "the spirit acting on the world" → not in code at all, "the bond" → not in code, just describe the function.
- Pairs with `feedback_writing_tone.md` (positive framing, realistic terms) and `feedback_prototype_design_tech_subfolders.md` (mechanic vocabulary in tech docs).
- This rule applies to comments in `.gd`, `.tscn`/`.tres` headers, GUT test descriptions, and shell-script comments. PR descriptions and commit messages have their own scope; the rule doesn't extend to them.
