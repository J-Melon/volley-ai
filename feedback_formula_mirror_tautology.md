---
name: feedback_formula_mirror_tautology
description: "FIRES WHEN a test asserts a numeric result. A formula-mirror tautology recomputes production's OWN expression from the SAME source and asserts equality (expected = tier_floor + Stats.resolve(increment); assert speed == expected); passes by re-derivation, not truth. Fix in order: exact-delta vs an INDEPENDENT seam if one exists (re-reading the same field is still a mirror); else directional assert_gt; else NOTE-AND-KILL (delete, log the missing seam as a production-instrumentation gap, do not keep a tautology placeholder). A value that vanishes into its result with no seam is both untestable-honestly and un-tunable-by-observation; the finding is the missing seam."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

A numeric test can pass for the wrong reason: it recomputes the same formula production uses,
from the same inputs, then asserts they match. That is a **formula-mirror tautology**, it cannot
fail unless the test and production diverge in transcription, which is not the behaviour anyone
cares about.

Tell: the `expected` value is built by calling the same `Stats.resolve(...)` / same constants /
same arithmetic the production line uses. `var expected = tier_floor + Stats.resolve(increment); assert_eq(speed, expected)`.

Replacements, in order of preference:
- **Exact delta against an INDEPENDENT observable** when the magnitude is the rule AND the quantity
  has its own seam (a signal carrying the applied delta, a readout). Then `assert delta == <that
  seam>` is honest. CAVEAT: if the only "independent" value is the same field production read from
  (e.g. asserting `speed - before == _ball.speed_increment` when production literally did
  `speed += speed_increment`), that is STILL a formula mirror, you re-read the one source. Not a fix.
- **Directional** when the felt rule is "it goes up / down / toward": `assert_gt(speed, before)`.
  Behavioural, survives a re-tune, misses wrong-magnitude.
- **Note and kill** when the magnitude matters for tuning but has NO honest seam to assert against.
  Do not keep a formula-mirror as a placeholder. Delete the test, and log the missing seam as a
  production-instrumentation gap (the real finding: the quantity is unobservable, which also means
  it cannot be tuned by observation). Josh, SH-430: "note and kill". This is the same disposition
  as a private-only behaviour (see [[feedback_self_judgment_is_coherence_not_accuracy]]: a green
  tautology reads as coverage but is not).

A quantity that disappears into a result the instant it is applied (per-hit `speed_increment`
folded straight into `speed`, no signal, no readout) is BOTH why the test can only mirror the
formula AND why the value is hard to tune. The audit finding is the missing seam, not the test.

Coverage is identical across the assertion choices (all call the same production line), so the
choice is assertion-STRENGTH, not coverage. Surfaced on SH-430 (`test_ball.gd` increase_speed /
set_speed_for_streak). Related: [[feedback_test_efficiency_patterns]],
[[feedback_long_loop_test_tautology_smell]], [[feedback_hollow_test_tells]].
