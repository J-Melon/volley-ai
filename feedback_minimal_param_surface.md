---
name: functions-take-the-smallest-type-they-need-not-whole-objects
description: "Predicate / helper functions take the primitives or small values they actually consume, not the full classes that produce them; default to minimal-coupling params"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 61f585fd-3e13-4f8a-ad0a-30ff3fcd71af
---

Helper and predicate functions take the smallest surface they need. If a function only uses `obj.is_active()` and `other.has_ball_in_play()`, the signature is `(active: bool, ball_in_play: bool)`, not `(obj: TimeoutController, other: BallReconciler)`. Callers compute the inputs; the helper doesn't import or depend on the source classes.

**Why:** 2026-05-24 on #727. `RallyGate.is_rally_in_progress(timeout_controller: TimeoutController, reconciler: BallReconciler)` took two whole objects to read two booleans. Josh: "why does the rally gate need the entire objects as params?" The over-coupling forced tests to construct real `TimeoutController` and `BallReconciler` instances (or poke their privates) just to flip two booleans. The shape that takes booleans makes the test fixture trivial and removes the predicate's class coupling.

**How to apply:**

- When writing a static helper or predicate, list the values the body actually reads. If they're all primitives or small, take primitives.
- Heuristic: if the function body uses three or fewer accessors on a parameter, pass the accessor results, not the parameter.
- Exceptions: functions that mutate the object, dispatch over many methods, or whose contract genuinely needs the type. A scene-modifying helper takes the node; a four-method ball-state inspector might justifiably take the Ball.
- For two-or-three callsites, callers compute `obj.method()` and pass the result. The repetition is fine; it makes the predicate clean.
- For tests, the minimal signature is the goal: tests pass booleans / Vectors / floats; no fixture construction, no private pokes.
- Sometimes the helper isn't worth existing once its signature shrinks. A function returning `not a and b` over two booleans is barely a function. Consider inlining at callsites; the rule's job is to centralise complexity, not to hide a single `and`.

Cross-link: [[feedback_simplify]] (don't over-engineer), [[feedback_test_assert_state]] (tests assert on what matters).
