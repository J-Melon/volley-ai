---
name: feedback_hollow_test_tells
description: "FIRES WHEN auditing/writing a test. Three tells a test is hollow and should be cut: (1) the named subject/prop is never consulted by the path under test (e.g. a paddle stub passed to a handler that early-returns before reading it); (2) it reaches an in-code guard only via a direct private call the real path cannot make; (3) it asserts behaviour the ENGINE already guarantees, not the project's own logic."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

When deciding whether a test earns its place, three tells mark it hollow (cut, do not polish):

1. **The subject prop is never read.** If the test sets up a `StubPaddle` / fixture as the
   apparent subject but the code path under test returns before it touches that object, the prop
   is theatrical and the test proves nothing about it. Tell: passing `null` or a bare `Node` in
   its place would not change the result.
2. **The guard is reachable only by an impossible call.** If the only way to hit the production
   line is to call a private method directly, and the real path (engine callback, signal) would
   never deliver that call in the tested state, the test is exercising defensive code through a
   path that cannot occur. The behaviour, if any, belongs in integration or nowhere.
3. **It re-asserts an engine guarantee.** Behaviour the engine already enforces (a frozen
   `RigidBody2D` generating no contacts; a freed node not processing) is not the project's to
   pin. Test the project's decisions, not Godot's.

Found 2026-06-03 on SH-430: `test_ball_dragging_guard.gd` hit all three at once (inert paddle
stub, direct `_on_body_entered` call the real frozen path never makes, `freeze` is an engine
guarantee). Deleted. See [[feedback_self_judgment_is_coherence_not_accuracy]] (a green hollow
test reads as coverage but is not) and the pure-behaviour bar in `tests/TESTING.md`.
