---
name: Pause for an architecture decision before dispatching a rework implementer
description: When a blocked PR's findings touch architecture/cross-PR conflict/near-rewrite scope, do not auto-queue the next implementer; surface the design call to Josh first
type: feedback
originSessionId: b1489a97-03c8-47b5-a015-d6527748dc96
---
When a PR is blocked by a review verdict that names architectural conflict, cross-PR contradiction, or near-rewrite scope, do not queue a rework implementer behind the gating work. Surface the architecture decision in chat — directly to Josh, or via a Plan/refactor-planner agent — and get an explicit call on the new shape before dispatch.

**Why:** Banana Tank PR #601 was blocked by galena with a cross-PR conflict (apex speed-lock vs side-miss release on shared `_physics_process` mutation). My default was to queue the rework dispatch behind PR #600's fix sweep, framed as "rework dispatches against the new base." A rework dispatched on findings alone produces a patchwork that re-introduces the same coupling — the implementer takes the findings as a checklist, not a design problem. Sharpens `feedback_planning_sweep_before_parallel_split.md`: that rule is prospective; this one is reactive when the conflict has already surfaced.

**How to apply:** Block-verdict + (cross-PR contradiction OR near-rewrite scope OR named-architecture conflict) → in chat, summarise the architectural choice and ask. Do not pre-queue an implementer. For ship-with-fixes verdicts where findings are quality polish, the auto-queue path is fine.
