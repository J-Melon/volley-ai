---
name: Dandori is the impl plan, stage 4 of the lifecycle, not the mission-shape walk
description: When Josh says "dandori" on a filed mission, walk four steps per work unit: crew, recon the surfaces, scope-expansion guard, confirm before dispatch. Interrogate / codename / file are lifecycle stages 1 to 3, not dandori.
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
"Dandori" is the implementation plan, run after the mission milestone is filed and before any minion dispatches. It is not the mission-shape walk. Interrogating the work, picking the codename, and filing the milestone (Ride, attach issues) are lifecycle stages 1 to 3, owned by [[feedback_mission_lifecycle]] and `designs/ai/swarm-architecture.md`. If the milestone is not filed, that is earlier in the lifecycle; do it first.

Dandori narrows to five steps, per work unit:

1. **Crew.** Impl writer (folds in test authoring when the work is test code); test author paired with impl when a hook forces failing tests + impl into one commit; reviewers (code-quality, gdscript-conventions, test-coverage by default, plus domain reviewers the diff fires); battlers (devils-advocate, integration-scenario-author). Codename per work unit from the rotating pool; role is stable.
2. **Recon the surfaces.** A read-only Explore minion maps each unit's fix surface and the file overlap across units, before confirm. Disjoint units fan as concurrent worktrees; file-sharing units collapse into one serialized stream. The slices come from the recon map, not from inference off the issue bodies.
3. **Scope-expansion guard.** Name the cap for any goal that could sprawl. Broader work files as follow-ups, never inside the mission.
4. **Split shape.** Decide how many PRs the feature becomes, per [[feedback_feature_pr_decomposition]]: fewest independently-shippable PRs (one-PR default; shared-contract parallel split only at <=3; +1000-line cap forces a follow-up).
5. **Confirm.** List crew, recon-grounded slices, scope caps, and split shape. Wait for go.

**Why:** Josh corrected the old eight-step framing twice. On 2026-05-24 (Operation Anteater): "no file first dandori is the impl plan." On 2026-05-25 ("More Ants"): dandori had no recon of current state, and recon is its own read-only minion before go so the dispatcher reaches confirm with grounded slices. The old eight-step walk this file used to hold (mission-or-issue, project, goals, ride, codename, crew, confirm) conflated lifecycle stages 1 to 4 and is retired.

**How to apply:** Skill `.claude/skills/dandori/SKILL.md`, process doc `designs/process/dandori.md`, and [[feedback_mission_lifecycle]] Phase 4 all mirror this; the four surfaces must agree, so update them together. Keep each step's response tight; let Josh push back per-step. Pairs with [[feedback_dandori_is_planning_not_execution]] (deliver the plan, then stop).
