---
name: BallReconciler `_balls_by_key` membership = existence, not in-play state
description: A ball stays in the reconciler's tracked set as long as it exists as a game object. Grab does not remove it; only destruction does. Held / OUT / rolling / mid-arc are all "exists" and stay in the set.
type: project
originSessionId: 8cc342c4-0faf-4b52-b150-75abb72d8fcd
---
**Rule (design intent from Josh, 2026-05-11):** `BallReconciler._balls_by_key` tracks balls *that exist*, not balls *currently in play*. The DevBallStatePanel, BallTracker, paddle AI controllers, and any other downstream consumer of `ball_added` / `ball_removed` read from this membership and trust it as "the ball exists."

A ball is removed from the set **only when it is destroyed** (queue_free / game cleanup). Lifecycle events that are NOT removals:

- Grab into HeldBody (current implementation destroys + respawns — this is a bug; the design wants the existing Ball preserved through grab via a held / OUT_HELD transition).
- Miss into OUT_REST.
- Rolling to rest on the floor.
- Stored in a rack or shop slot.

**Why:** the player's mental model is "I have N balls in this venue." Each ball is an entity with continuity. The tracker is the source of truth for that count, and the dev panel exists specifically to let Josh see it. A ball that vanishes from the panel mid-grab tells the player "the ball was destroyed", which it wasn't.

**How to apply:**

- Code that calls `reconciler.release_ball` to *temporarily* take a ball out of play is wrong shape; it should transition the existing Ball to OUT_HELD and reparent / freeze without erasing the key.
- Reviewer move: any new `release_ball` caller needs a "is the ball being destroyed?" check. If not, find another transition.
- `bring_into_play` should reuse the existing tracked Ball when one exists (it does in `ensure_ball_for_key`'s early-return — the problem is the upstream code that erased the key in the first place).
- Tests that simulate grab should not assert `tracker._balls.size() == 0` between grab and release; the size should remain 1.
