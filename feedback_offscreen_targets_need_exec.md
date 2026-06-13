---
name: Off-screen UI targets need exec, not click_at_world
description: godotiq input(click_at_world) cannot reach a target rendered outside the viewport; use exec to call the production method or move the camera first
type: feedback
originSessionId: e64c4ee1-f2a0-40ca-a1d8-d32235324bbb
---
`input(click_at_world: <pos>)` projects through the active camera's viewport. If the target's rendered screen position lies outside the viewport rect, the click never lands and the gesture never fires. For runtime verification of UI elements that render off-screen (shop items beyond the venue camera, racks behind the play area, anything outside the rendered viewport), `click_at_world` is infeasible without camera movement.

**Why:** Observed 2026-05-04 during SH-332 verification: the shop ItemsAnchor sits at world (1500, -27); with the venue camera the shop renders at screen (2460, 513) — past the 1920-pixel viewport edge. Edith fell back to `exec` to invoke `BallDragController.spawn_purchased_at` and `ShopItem._spawn_loose_body_at` directly, matching the production call sites the actual gesture would hit.

**How to apply when verifying:**
- Before assuming `click_at_world` can reach a target, check whether the world position projects inside the active camera's viewport rect via `state_inspect` on the camera.
- If off-screen, two options: (1) move the camera first via `camera` tool to bring the target into view, then `click_at_world`; (2) call the production method directly via `exec` against the same call sites the player gesture would hit. Option 1 stays closer to the real player path but introduces camera state to manage; option 2 is more invasive but exercises the same code surface a real click would.
- Document the deviation in the verification report so reviewers know which production path was exercised.

**What this is not:** licence to skip runtime verification. Method-call-via-exec at the real call site is still runtime verification; property-write to fake state is not. Don't substitute property writes for input.
