---
name: Bug-flow shape — repro first, fix on the symptom path, runtime gate per PR
description: A bug mission's entry is the exact player repro. Output is a fix plus a test that mirrors the repro. No tech doc, no planner; RCA ladders on failure.
type: feedback
originSessionId: 8cc342c4-0faf-4b52-b150-75abb72d8fcd
---
A bug mission's first move is the exact repro from the player, not the dispatch. Without it, every static analyst converges on whatever code path looks most plausible from the title, and the convergence often misses the surface where the bug lives (see `feedback_get_exact_repro_first`).

**Shape.** Single implementer, or RCA-then-implementer pair. No tech doc, no refactor-planner. RCA tier ladder runs static → runtime → devil's-advocate → Josh-in-loop; bump depth on each failure (see `feedback_bump_depth_on_failure`). Runtime-RCA minions default-start at Tier 2 (see `feedback_rca_default_tier_2`).

**Deliverable.** A fix plus a test that mirrors the repro. Per-PR runtime verification on the fixed path is mandatory for load-bearing changes; implementer self-QA covers it.

**Done when.** The repro no longer produces the symptom in a real game session. The Ride for the parent mission isn't required for a bug-fix PR; that's the parent-mission gate, not the bug-fix gate.

**Reporting discipline.** Progress reports lead with whether the bug is fixed, not what code changed (see `feedback_lead_with_player_visible_status`).

**When this flow is wrong.** If the bug "fix" turns out to require cross-system architecture, stop and escalate; the work is no longer a bug, it's a feature or refactor. Pause for a Josh decision before continuing (see `feedback_pause_before_architectural_rework`).
