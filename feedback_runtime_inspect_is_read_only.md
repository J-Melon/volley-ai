---
name: feedback_runtime_inspect_is_read_only
description: "When inspecting a paused/running game via godotiq exec, do NOT mutate live state to \"test\" a mechanic without flagging it first. Calling process_event/advance_tier/etc changes the player's actual game; Josh then has to reload. Prefer read-only inspection; if a mutating probe is the only way, say so before doing it."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9411911b-5a8f-49cf-b403-486f789e4da3
---

Runtime inspection of a paused/running instance defaults to READ-ONLY. When Josh pauses the game and says "look at the state", he wants to see the current state, not have it changed underneath him.

**The miss (2026-06-01):** diagnosing why the soul multiplier "didn't change t0->t1", I ran exec calls that FIRED `im.process_event(&"on_consolidation")` and `ball.advance_tier()` to test whether the increment path worked. Each mutated the live multiplier (1->2->3). Josh: "state was changed while paused it is x3 now? i'll reload." He had to throw away the instance because my probes polluted it.

**How to apply:**
- Inspecting a paused/running game is read-only by default: `state_inspect`, reading properties, reading `get_stat`, walking the tree. These observe without changing.
- Do NOT call mutating methods (`process_event`, `advance_tier`, `set_*`, anything that drives game logic) on the live instance to "prove" a mechanic works, unless Josh has asked for it or you flag it FIRST ("I'm going to fire a consolidation on the live game to test the increment, which will change its state, ok?").
- A forced/programmatic probe also does not prove the NATURAL path: firing `advance_tier()` is not the same as the ball crossing the tier ceiling in play. Verifying the mechanic by mutation can mislead AND pollutes the instance. Prefer watching the natural trigger, or a fresh throwaway run, over poking the one Josh is using.
- If a mutating probe is genuinely the only diagnosis, do it on a run you started for that purpose, not the instance Josh paused mid-play.

Pairs with the Tier-2-is-Josh's-to-drive rule and [[feedback_self_judgment_is_coherence_not_accuracy]] (a forced probe passing is internal coherence, not proof the player-facing path works).
