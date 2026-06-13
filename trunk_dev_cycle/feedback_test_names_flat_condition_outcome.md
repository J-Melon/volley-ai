---
name: feedback_test_names_flat_condition_outcome
description: "FIRES WHEN naming a GUT test. Name it by what it tests, the same call as system-vs-user story: tests an internal value/mechanism (no player) = name input and result (test_apex_below_ceiling_returns_arc_bend); tests a player-observable behaviour = name the behaviour. Plain words, no jargon like register."
metadata:
  node_type: memory
  type: feedback
  parent: feedback_write_from_the_players_experience
  originSessionId: 8f4fd896-bb88-4628-ba4c-a8131cc0567b
---

Name a test by what it tests, decided the same way a ticket is system-story vs user-story: who is the actor, what do they observe.

- **Internal value or mechanism, no player in sight:** name the input and the literal result, `condition_<verb>_value`. Right for a pure-logic unit like `CourtPhysics.arc_acceleration`, where the thing under test IS the internals.
  - `test_apex_below_ceiling_returns_arc_bend` (not `_uses_the_tuned_bend`)
  - `test_clamped_apex_equals_height_max` (not `_lands_at_the_ceiling`)
- **Player-observable behaviour:** name the behaviour the player sees (a dragged ball heads back down). The SAME physics fact named at the ball/gameplay layer gets the behaviour form; at the `CourtPhysics` return-value layer it gets input-and-result. The layer the test sits at decides, not the underlying fact.

Wrong-style tell (prose creep on an internal test): adjectives/adverbs doing felt work (`gentle`, `harder`), verbs describing a feeling not a result (`lands`, `loft`). State the input and the literal outcome. Match the file's existing names over a global template.

**Why:** Josh, 2026-06-03 #852: "reasoning, same as the difference between system and user stories." Not one global style; the actor call applied per test. I over-generalised to "flat always" first. Structure rule in [[reference_godot_testing_frameworks]] (file=surface, func=sentence); this is the name-selection rule on top. Lives in `tests/TESTING.md`.
