---
name: Test behaviour, not implementation
description: Every test case must justify its existence by naming the behaviour it protects; the default is CUT, not keep. Tests assert observable outcomes (signs, directions, visibility, relationships), never literal numeric outputs of production formulas. Triggers on `assert_eq` / `assert_almost_eq` with a hardcoded number, on test names that name the math, on helpers that re-derive a production formula, on a trim/review that keeps a test "because it passes", AND on accepting dispatched-implementer tests that match those patterns.
metadata:
  type: feedback
originSessionId: b5187a6b-d4ba-4dfa-b4e9-bc0726ceb9d1
---

Tests assert what a player would notice. They do not assert the production formula's output. If the expected value in the assertion is the same computation the code runs, the test is duplicating the implementation, not verifying it.

## Stop-and-rewrite signals

Treat these as the rule's grep targets. If any appear in code I am about to write, OR in a dispatched implementer's diff I am about to approve, stop and rewrite or reject.

- `assert_eq(x, <literal_number>)` where the number is a function of inputs the test also sets.
- `assert_almost_eq(rad_to_deg(angle), <literal_number>, ...)`: almost-equal against a derived magnitude.
- Test name like `test_position_equals_x_minus_half_width` or `test_angle_is_30_degrees`.
- Helper that recomputes a production formula (e.g. `_camera_left_edge() = position - viewport/2/zoom`). Helper and code drift together; a bug in one passes the test.
- A constant from the production script appearing in the test as the expected value.
- An implementer brief I am writing that says "assert the resulting angle equals MAX_DEGREES" or similar magnitude-coupled wording.

## Patterns to prefer

- Direction: `assert_gt(final, start)`, `assert_lt(final, start)`.
- No-op: `assert_eq(final, start)` for dormancy, cancellation, idempotence.
- Relative: two configs side by side, `assert_gt(fast.x, slow.x)`.
- Predicate: `assert_true(is_visible(anchor))` (helper may compute, but body reads as spec).
- `almost_eq` against another **measured** value, never a recomputed formula.

## Where the rule has to fire in the dispatch loop

1. **Writing tests myself.** Before the first `assert_*`, write a one-line comment in player-facing English. If it mentions a formula, rewrite.
2. **Implementer brief.** When I tell an implementer "add a test for X", the brief specifies the behavioural shape. Never pass through AC numeric targets as assertion targets. Example wording: `"assert centre and edge hits produce visibly different return angles (sign or relative magnitude), NOT a specific degree value."`
3. **Reviewer brief.** Test-coverage reviewers get an explicit clause: `"flag any assert_eq / assert_almost_eq whose expected value is a literal numeric output of the production formula."`
4. **Reading a returning implementer's test diff.** Grep their test file for the stop-and-rewrite signals above before accepting "tests green."

## Why

Implementation-coupled tests break on tuning changes (pan speed, damage multiplier, cost curve) without any real regression, and silently pass when the formula is wrong because the test re-runs the same formula. Behavioural tests survive refactors and catch player-visible regressions.

## The burden is on KEEPING. Default is cut.

Coverage is not value. A test does not earn its place by passing or by existing; it earns it by naming a specific player-visible or caller-visible behaviour it protects. The default verdict on any test is CUT; keeping it requires a stated justification. "It's green" / "it's behavioural" / "no clear reason to cut" is a default pass, and a default pass is not justification. A trim that keeps everything because nothing screamed "delete me" has the burden backwards.

The bar for keeping: happy path, the edges that actually break (capacity zero, list empty, race window, save round-trip), the exceptional paths (signal emitted on refusal, idempotent re-call). Anything that is not one of those three, naming a real behaviour, gets dropped.

How to apply when writing tests, trimming a suite, or reviewing a returning implementer's test file:

- Per test case, state the one behaviour it protects, in player-facing or caller-facing English. No statement, no test.
- Per test case, classify: happy path, edge, or exceptional. If none of the three, drop it.
- A test asserting a tuning value (fraction * world_max == 225.0), a data shape (count == 3), or a mechanism being retired (positional index clamp) protects nothing a player notices; cut it.
- Method-shaped names (`test_set_X_toggles_Y`, `test_method_returns_expected_value`) are the tell; rewrite to `test_<observable_outcome>_when_<trigger>` or cut.
- When asked to "trim" or "go minimal", expect to delete most; if you cut nothing, you have almost certainly defaulted to pass.

Origin: Josh 2026-05-16 ("cut to essentials and edge and exceptional cases only") and 2026-06-02 ("every test case needs proper justification not just a default pass", after a trim minion kept all tests claiming nothing was cuttable). Related: [[feedback_tests_are_antagonistic_to_themselves]], [[feedback_self_judgment_is_coherence_not_accuracy]].

Instance of [[feedback_write_from_the_players_experience]] (name the player/observable outcome, not the parts).
