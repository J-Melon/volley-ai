---
name: feedback_test_assert_state
description: "Tests assert state: configuration values, role transitions, signal emissions, the result of a sequence of actions. Leave tuning-dependent values (speed, velocity, acceleration) to tuning passes."
metadata:
  parent: feedback_test_behaviour
  node_type: memory
  type: feedback
  originSessionId: 548aa536-fe91-42d7-b688-9e6eb7698571
---

Tests assert state: configuration values, role transitions, signal emissions, the
result of a sequence of actions. Assert that a toggle flipped, a signal fired, a
ring-buffer delayed, a configuration was read. Direction comparisons (gt/lt) are
valid; they assert movement toward a target without coupling to a tuning constant.

Tuning-dependent values (speed, velocity, peak acceleration, oscillation amplitude)
live in tuning passes. A speed check breaks the moment paddle speed is nudged; the
test fails (rolled back), gets relaxed (loses signal), or gets retuned (treadmill).
Drop the speed check and find the state question underneath it.

**How to apply:**
- Assert a controller toggles, selects the right target, fires a signal, reads
  configuration. These are the state-level questions that survive tuning passes.
- Coverage of physics controllers lives at state level: toggle, delay, tracking,
  signal emission, configuration-read paths.
- Direction assertions (`assert_gt`, `assert_lt`) are state, not tuning.

**Why:** PR #710 stuck in the merge queue. A tautology guard asserted
`peak_observed >= max_allowed * 0.95`; locally the paddle hit 95% of cap, in CI
86.5%. The mitigation was removing the speed check and testing the state-level
controller toggle instead.
