---
name: test-efficiency-patterns
description: "When writing or reviewing a GUT test, apply the three free wins from ai/skills/minions/test-efficiency.md before letting any await land."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: bd0ca049-796f-41c8-a3e7-cb8a0a44ac81
---

When authoring or reviewing a GUT test case, apply the patterns in `ai/skills/minions/test-efficiency.md` by default:

1. Drive the system directly (signal emit, or `_process(delta)` / `_physics_process(delta)` call) instead of `await get_tree().process_frame`.
2. Lift immutable fixtures to `before_all` (PackedScene, dicts, regex). Never `autofree` in `before_all`.
3. Wait on the actual signal or predicate (`wait_for_signal`, `wait_until`), not on `wait_seconds` or `create_timer().timeout`.

After every efficiency edit, run the tautology guard: the test must still fail if the production listener chain breaks. If a stubbed production would still let the test pass, revert.

**Why:** the GUT suite holds under 2 seconds across hundreds of cases. The top 20 cases sat at 514ms (25ms mean) on 2026-05-16, almost entirely because of `await get_tree().process_frame` chains at 16ms each. Cutting awaits is the highest-leverage suite-wide intervention. SH-414 (`Cut top 100 test cases under 500ms`) is the active sweep against this.

**How to apply:**
- When writing a new test, do not reach for `await get_tree().process_frame` first. Reach for a direct call into the system's deterministic seam.
- When reviewing a test, flag any `wait_seconds(...)`, `create_timer(...).timeout`, or bare `await get_tree().process_frame` and ask whether the assertion needs the wait or if a direct call would do.
- When refactoring an existing slow test, change the await pattern first; only consider cranking `Engine.physics_ticks_per_second` if the case genuinely depends on multi-tick physics integration (set in `before_each`, reset in `after_each`).
- Cite the skill file in PR comments and dispatch briefs rather than restating the rules.

Related: [[feedback_integration_tests_loop_completion_only]] (what earns an integration slot), [[feedback_test_behaviour]] (assertion shape), [[feedback_exact_test_timings]] (how to report perf moves).
