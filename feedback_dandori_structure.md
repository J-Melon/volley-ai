---
name: Dandori is the plan before the work, fitted to the work type
description: When Josh says "dandori" on a work unit, walk the shape that fits the work type, then confirm before dispatching.
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---

"Dandori" is the plan Josh confirms before I dispatch. The weight matches the work:

| Work type | Shape |
|-----------|-------|
| **Spike** | Crew (researcher), scope cap, confirm. |
| **Single issue** | Crew (impl + reviewer), scope cap, confirm. |
| **Multi-issue feature** | Crew per unit, recon surface overlap, scope cap, split shape, confirm. |

For any dispatch: name the crew (impl writer, test author if paired, reviewers, battlers), cap the scope, and wait for go.

**Why:** Two corrections shaped this. 2026-05-24: "no file first dandori is the impl plan" (separated dandori from the mission-shape walk). 2026-05-25: recon of current state must run before confirm. 2026-06-22: milestones dropped, work-type table replaces the rigid five-step walk.

**How to apply:** Skill `dandori/SKILL.md` and [[feedback_mission_lifecycle]] Phase 4 mirror this; the three surfaces must agree, so update them together. Pairs with [[feedback_dandori_is_planning_not_execution]] (deliver the plan, then stop).
