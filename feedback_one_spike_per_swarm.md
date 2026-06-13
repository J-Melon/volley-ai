---
name: Never more than one spike per swarm
description: Only dispatch one spike issue per swarm run; run additional spikes sequentially, not in parallel
type: feedback
originSessionId: 60225dfd-277e-4c4b-8ef4-5843bb535764
---
When dispatching a swarm, pick at most one spike issue. Other spikes wait for the next swarm, even when they look independent on paper.

**Why:** Spikes are exploratory design work. Parallel spikes on adjacent conceptual surfaces silently disagree on naming, structure, or scope, and the collisions only surface at cross-challenge review. SH-83 and SH-88 on 2026-04-22 shipped with opposite stat-naming recommendations; the stat-naming issue SH-164 and the resulting reconciliation cost more than sequencing the two spikes would have.

**How to apply:**

- "Go" picks at most one `spike` label issue per dispatch.
- Feature, bug, and chore issues still parallelise freely.
- If two spikes sit in the current cycle, run them back-to-back: dispatch the higher-priority one, wait for it to land or settle, then dispatch the next.
- Exception: two spikes on unambiguously disjoint surfaces (e.g. art-pipeline and save-format) are safe to parallel, but default to the stricter rule and only relax when the surfaces are clearly unrelated.