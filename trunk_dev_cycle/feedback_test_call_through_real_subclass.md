---
metadata:
  node_type: memory
name: feedback_test_call_through_real_subclass
parent: feedback_test_behaviour
type: feedback
originSessionId: current
---
metadata:

Construct test subjects with the real subclass when that subclass overrides
behaviour the test depends on. A bare base class whose override is a no-op
exercises only the base path; the subclass path includes the real movement,
input handling, and state transitions the player experiences.

**How to apply:** When a test drives a controller or game system whose behaviour
depends on an overridden method, instantiate the concrete subclass
(`PlayerPaddle`, not `Paddle`) so the override runs. The test harness then
exercises both the controller path and the subclass path in the same frame.

**Why:** SH-520 shipped a velocity-zeroing bug past green tests. The autoplay
movement tests instantiated `Paddle.new()` whose `_physics_move` is `pass`.
`PlayerPaddle._physics_move` overwrites `velocity` to zero, invisible to the
test. The suite said "moves toward ball" and the game crawled at 3% speed.
