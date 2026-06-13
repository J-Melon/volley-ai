---
name: ci-fails-on-any-test-output-warning-or-orphan
description: "Volley's GUT gate fails CI on ANY `WARNING:` / `ERROR:` / `SCRIPT ERROR:` / `USER WARNING:` / `USER ERROR:` line in the test output AND any per-test orphan count > 0. Triggers when adding push_warning to production, suppressing test noise, or considering whether 'just a warning' is acceptable. Gate lives in `scripts/ci/run_gut.sh` and `.github/workflows/test.yml`."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 6816739f-74ae-4ab7-bf0c-de2832b60fb1
---

## The gate

Two surfaces, both block the merge:

1. **Any `WARNING:` / `ERROR:` / `SCRIPT ERROR:` / `USER WARNING:` / `USER ERROR:` line** in the GUT output. This catches Godot's `push_warning` / `push_error`, `ObjectDB instances leaked at exit`, addon warnings, autoload warnings.
2. **Per-test orphan counts > 0.** Yellow `N Orphans` lines after each test method.

Both checks live in `scripts/ci/run_gut.sh` (local pre-commit hook) AND `.github/workflows/test.yml` (CI step `Leak gate`).

## Consequences for production code

- Don't `push_warning` for design-intended silent no-ops; the contradiction is loud in the suite. If the behaviour is "refuse and stay quiet," the code must actually stay quiet. PaddleAIController.set_enabled had this slip; the warning was the bug.
- Test-only warnings are not exempt. If a test deliberately triggers a production warning to assert the safety guard, the production code must signal the refusal a different way (return value, state flag) and the test asserts on that.
- Orphan-producing patterns are real defects: `remove_child` + `queue_free` (use `free` if the child is fully owned), `await` inside `while is_inside_tree()` polling loops (rewrite as signal-based), missing `add_child_autofree` in tests.

## Why

Caught on PR #651 after the dev-panel `_await_tracker` leaks (9 exit-time GDScriptFunctionState) and the RackDisplay `_clear_slots` orphans (145 cumulative across the suite) shipped silently for weeks because the warnings did not fail anything. The gate makes regressions visible the moment they push.
