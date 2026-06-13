---
name: integration-tests-cover-loop-completions-only-and-only-when-absolutely-necessary
description: "Integration tests are reserved for full player-loop completions (a rally, an equip cycle, a save-load round-trip). Two-component glue or 'belt-and-braces' integration cases are noise. Default to unit; reach for integration only when nothing else can prove the loop closes. Triggers any time I am about to propose, dispatch, or write an integration test."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9066ef19-7b82-42a7-aaa1-b62fb15b6ebb
---

Integration tests are expensive (more fixtures, slower, more brittle), and the common failure mode is "we wrote one because the unit tests felt thin." That is noise. Integration earns its place only when the test is the full player loop closing.

## When an integration test is justified

- A complete player-facing loop: full rally (serve to OUT), full timeout walk (call to ascend back), full save → quit → load round-trip, full equip cycle (drag from rack to character to rack), full purchase-to-effect chain ending in observable stat impact.
- A regression where a player-facing AC slipped past the unit suite because nothing wired the parts together (see the `test_real_input_drag_paths.gd` lineage in `tests/TESTING.md`).

## When an integration test is NOT justified

- Two components hand off via a signal and you want to "make sure the wiring works." Unit-test the signal contract on each side; if both sides honour it, the wiring works.
- A method on one component is called by another, and you want to "test that path." That is a unit test on the caller, with the callee real-instantiated.
- "It feels like we should have one for completeness." Coverage is not value; this same trap is documented in `feedback_test_behaviour.md`.

## How to apply

Before proposing or writing an integration test, ask: "what loop is closing here?" If the answer is a system pair or a glue chain, drop to unit. If the answer is a player-facing loop reaching its terminal state, integration is justified; name the loop explicitly in the test docstring.

When folding a feature's tests, prefer dropping an integration case over adding one. The mission's runtime gate (Ride or PR-merge playtest) catches loop-shaped regressions that the suite missed; the suite does not need to mirror every loop the player exercises.

Reinforced 2026-05-16: after Kel's PR #675 test sweep, I suggested a `ball_drag_controller` integration test for the cancel-back-reveal visibility behaviour. Josh: "integration should focus on loop completions and only used if absolutely necessary." Cancel-back-reveal is a two-component visibility hand-off, not a loop completion. The press-area unit test + the drag controller's unit cancel test cover the contract; the playtest covers the visible behaviour.
