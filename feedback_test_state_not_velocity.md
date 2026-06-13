---
name: test-state-not-velocity
description: "Tests assert state (configuration, role transitions, signal emissions), never tuning-dependent values like speed, velocity, peak-acceleration. Speed checks are test debt the moment a tuning pass lands."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 548aa536-fe91-42d7-b688-9e6eb7698571
---

Tests assert state (configuration values, role transitions, signal emissions, the result of a sequence of actions). Tests do NOT assert tuning-dependent values: speed, velocity, peak acceleration, oscillation amplitude, anything whose answer is set by a tuning constant. A speed check becomes wrong the moment somebody nudges paddle speed in a tuning pass; the test then either fails (rolled back), or gets relaxed (loses signal), or gets retuned (treadmill). Kill speed checks; do not try to make them stable.

**Why:** Josh, 2026-05-18, on PR #710 stuck in the merge queue. A tautology guard rewrote two velocity-cap tests to assert `peak_observed >= max_allowed * 0.95`. Locally the paddle hit 95% of cap; in CI it peaked at 86.5%, dequeuing PR #710 twice. Josh: "Remove the test, generally we should test state rather than velocity." Sharpened 2026-05-19: "Kill speed checks now as this becomes inconsistent with tuning passes." The mitigation is not "add merge_group verification" or "loosen the threshold". The mitigation is "do not assert tuning-dependent values at all."

**How to apply:**
- Any test asserting on speed, velocity, acceleration, peak displacement, oscillation amplitude, or any value set by a tuning constant: remove. The state-level question underneath (does the controller toggle? does it select the right target? does the signal fire? does the cap configuration get read?) earns the test instead.
- Coverage of physics controllers lives at the state level: toggle, ring-buffer delay, target tracking, signal emission, configuration-read paths. Cap-respecting behaviour is a tuning question; it does not earn a unit test.
- When a sweep adds a "convergence guard" or "tautology fence" against a tuned value, treat the guard itself as the failure mode and remove the test.
- Related: [[feedback_long_loop_test_tautology_smell]] (N-iteration loops as a code smell); [[feedback_test_efficiency_patterns]] (drive the system directly, wait on signals not the clock).
