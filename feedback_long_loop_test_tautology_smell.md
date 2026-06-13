---
name: long-loop-test-tautology-smell
description: "A test that runs many simulation iterations and passes \"easily\" is a tautology candidate. Verify the production code path actually fired before trusting the assertion."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: bd0ca049-796f-41c8-a3e7-cb8a0a44ac81
---

When a test runs many iterations of `_physics_process(delta)`, `_process(delta)`, or any simulation loop, and the assertion is a property invariant ("never drops below min"), treat it as a tautology candidate until you have evidence the production effect under test actually ran.

The failure pattern: the test fixture sets up an effect (or item, or system) and a loop. The assertion checks an invariant that holds even when the effect does nothing. If the production registration path silently skips the effect (because the fixture's defaults route it elsewhere, or because the test-side wiring drops a connection), the loop iterates N times asserting on the *baseline*, not on the *effect*. The test passes for the wrong reason.

**Why:** Cal (SH-414 oscillator seam, 2026-05-16) found that `test_oscillation_never_drops_below_min_speed` ran 300 iterations of `_physics_process(0.016)` and asserted `ball.speed >= min_speed`. The fixture used `ItemDefinition.role` defaulting to `&"equipment"`, which `_set_item_placement` routes to `STORED`, which skips `register_source`. The oscillation never registered. The test passed because `ball.speed = min_speed + 0` for all 300 frames, not because the oscillation ever pushed the clamp.

**How to apply:**
- Reach for a deterministic seam (`sample_at(t)`, `tick(delta)`) before reaching for a simulation loop. If the production has the seam, the test asserts the formula directly and no loop is needed.
- If the production has no seam and a loop is necessary, instrument the test to confirm the effect fired: `assert_gt(observed_perturbation, 0.0, "production effect actually applied")` before any invariant check.
- Audit existing N-iteration tests on the cheap: do they fail when the production effect is stubbed to a no-op? If not, the test was asserting the baseline.
- Long-running test bodies are a smell for tautology, not for thoroughness. The fast path is also the correct one.
- **Watch the clamp boundary, not just the iteration count.** A test that asserts `clampf(x, lower, upper) >= lower` is trivially true by clampf's shape, regardless of what `x` is. Cal's #697 oscillator test (2026-05-16) deflated the iteration loop but kept the clamp tautology: `clampf(min_speed + worst_offset, min_speed, max_speed) >= min_speed` cannot fail. Production at `effect_processor.gd:65` clamps `_base_speed + _applied_offset`, where `_base_speed` is the ball's current speed, not necessarily `min_speed`. Fix: call the production code path with a known base speed, or extract the clamp into a static `apply_offset(base, offset, min, max)` and exercise the seam from both sites. Liv (devils-advocate stress test, 2026-05-16) flagged this as the second tautology layer under Cal's first fix.
- Related: [[feedback_test_efficiency_patterns]] (free wins for cutting time, including the tautology guard), [[feedback_test_behaviour]] (assertion shape).
