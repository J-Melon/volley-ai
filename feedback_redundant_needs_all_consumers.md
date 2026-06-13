---
name: before-calling-a-thing-redundant-enumerate-all-its-consumers-not-just-the-one-in-front-of-you
description: "when judging whether code/state is removable, list every reader AND check each reader's trigger is actually reachable. A value can serve two jobs and be redundant for one but load-bearing for the other; equally, a 'consumer' whose firing condition is structurally impossible is dead code, not a reason to keep the value. Reasoning from a single consumer, or from a consumer that can never fire, both miscall the verdict."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 6680b5c9-0d3d-4a44-a9cb-cfff70cb3816
---

Judging whether a piece of state is removable takes two passes over its readers: list every consumer (redundancy has to hold for ALL of them, not the first you traced), and for each consumer check its trigger condition is actually REACHABLE. A reader whose firing condition is structurally impossible is itself dead code, so it is not a reason to keep the value, it is more to delete.

**Why:** #779 (the venue drag clamp) taught both halves, by my getting both wrong first. (a) I called `venue_bounds` redundant from ONE consumer (camera bounds the cursor; drop-acceptance gates release), missing a second, `_is_within_venue` driving the FORBIDDEN cursor state. So far that looked like "one value, two jobs, keep it for the second." (b) But then: the cursor is screen-bound and the camera never shows outside the venue, so the cursor can NEVER map to a world point outside the venue. `_is_within_venue` is always true; FORBIDDEN can never fire. The "second consumer" I preserved was unreachable code. The whole apparatus (`venue_bounds`, `_clamp_to_venue`, `_is_within_venue`, the FORBIDDEN branch) was deletable. Josh had to walk me to it: "mouse is screen bound, screen never leaves venue, player cannot drag outside venue."

**How to apply:**
- When about to call X redundant, `grep` every use and write a one-line "needs X for ___" per call site. If any need isn't covered elsewhere, X is not redundant; a SUBSET of its uses might be.
- For each consumer you'd preserve X for, ask "can this consumer's trigger condition actually occur?" A guard against an impossible input (a clamp on a value the system can't produce, a state whose precondition is structurally excluded) is dead code; preserving X for it is preserving dead code. Trace the trigger to a real reachable path or treat the consumer as deletable.
- "Functionally the same" is a smell: if I call two states/paths equivalent, check whether I'm reasoning from the END outcome (release, return value) and missing what they signal mid-gesture. But the converse trap is real too: a mid-gesture state that LOOKS like meaningful feedback may have an unreachable trigger and signal nothing.
- Pairs with [[feedback_self_judgment_is_coherence_not_accuracy]] (each "redundant" story felt coherent and was wrong) and [[feedback_collaborate_with_confidence]] (Josh steering me is the work, not a verdict).
