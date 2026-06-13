---
name: Run an impl-architecture sweep before parallel-splitting one design
description: When a mission's spec lands as 2+ parallel implementer issues, run a Plan or refactor-planner pass first to find shared per-frame/per-tick seams; sequence or pre-extract before fan-out
type: feedback
originSessionId: b1489a97-03c8-47b5-a015-d6527748dc96
---
When a mission's spec lands as two or more parallel implementer issues, run an architecture sweep before dispatching them — Plan agent or refactor-planner. The sweep names the shared mutation surface (per-frame physics, per-tick state, shared autoload, etc.) and decides: sequence the work, pre-extract the seam, or commit to coordinated parallel work with explicit interfaces.

**Why:** Banana Tank dandori split SH-366 (apex Y-axis) and SH-367 (side-miss X-axis) as "different seams" and dispatched both implementers in parallel worktrees. Both ended up writing `Ball._physics_process` velocity behaviour. The apex implementation's load-bearing per-frame speed-lock silently neutralised the side-miss release path — released balls cruise at min_speed on a diagonal forever. Galena (devils-advocate) caught it post-PR; cost was a near-rewrite of one PR. Sharpens `feedback_shared_file_parallelism`: co-location is not coupling, but co-location *plus* shared per-frame mutation is.

**How to apply:** At dandori step 7 (Crew), if the work splits into 2+ implementer units that operate on the same node's per-frame/per-tick code path, dispatch a Plan or refactor-planner first as step 6.5. Output names the seam and the sequencing call. Only then fan out implementers. For one-issue missions or for splits where the implementers touch genuinely disjoint files, skip.
