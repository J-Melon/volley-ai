---
name: report-exact-test-suite-timings-no-approximation
description: "When reporting GUT (or any test suite) runtime, state exact seconds, never `~2s` or `roughly 11s`. Include before/after deltas when a change moved the number. Triggers on every test-runtime mention in summaries to Josh."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9066ef19-7b82-42a7-aaa1-b62fb15b6ebb
---

GUT runtime is a hard budget. Approximations hide regressions and make it impossible to tell whether a change moved the suite by 0.2s or 2s. Josh tracks this number directly; vague reports waste a turn asking for the real value.

## How to apply

- Quote the exact seconds GUT reports (`11.6s`, `2.2s`), not `~2s`, `around 12s`, or `roughly`.
- When a suite-time change is the story, give before AND after: `2.2s → 11.6s (+9.4s)`. The delta is the load-bearing number.
- If you do not have the exact before value, say so explicitly (`baseline before this change not measured this session`); do not estimate it.
- The 5s budget per `ai/skills/minions/commits.md` is the gate; report against the gate, not against intuition.

Reinforced 2026-05-16 after I wrote "GUT suite jumped from ~2s to 11.6s" when the 11.6s was exact but the prior value was a guess; Josh: "in future give me the exact timings."
