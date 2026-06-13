---
name: runtime-invariants-use-push-error
description: "`assert()` in GDScript strips in release builds. For invariants that should still catch in shipped builds, use `push_error` and a graceful fallback, not `assert` alone."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: bd0ca049-796f-41c8-a3e7-cb8a0a44ac81
---

`assert(condition, message)` in GDScript is a debug-build construct. In release builds, the assert is stripped entirely; the condition is not evaluated and no message lands in the log. For invariants that should still surface in shipped builds (data-integrity gates, contract violations between subsystems, "this should never happen but if it does, scream loudly"), use `push_error(message)` plus a defensive fallback, not `assert` alone.

**Why:** Gus's PR #699 (2026-05-16) added `assert(item.role != StringName(), "ItemDefinition.role must be set: " + item.key)` in `_set_item_placement` to surface any future fixture that built an `ItemDefinition` without setting `role`. The assert catches it in test runs (debug build) but strips in shipped builds. A release-mode regression that resurrects the silent-equipment-default would route to STORED without crashing and without logging. Liv (devils-advocate stress test) named this as a release-build blindspot.

**How to apply:**
- For test-only invariants ("the fixture is wrong"), `assert` is fine. The shipped build does not see test fixtures.
- For production invariants that span subsystems ("this autoload connection should never be missing", "this resource should never have an unset key"), use `push_error` plus a routing fallback that fails safely:

```
if item.role == StringName():
	push_error("ItemDefinition.role unset: " + item.key)
	_set_item_placement(item_key, PlacementScript.STORED)
	return
```

- The fallback's job is to keep the game running while making the bug audible. Crashing is worse than a logged error plus a degraded routing.
- An `assert` AND a `push_error` next to each other is fine; the assert catches in test, the push_error catches in release.
- Related: [[feedback_audit_existing_paths_when_adding_gate]] (a new gate only works if every existing path honours it).
