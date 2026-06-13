---
name: Don't add defensive guards without a reproduced failing case
description: A guard added on the hypothesis "this might race" can kill the path it's protecting; only add a guard after a concrete test or runtime trace shows the race actually fires
type: feedback
originSessionId: a39316b3-d98c-4577-97d8-c03dcfbbad89
---
When a refactor lands and a test fails, fix the test or fix the refactor. Don't add a defensive guard based on a hypothesis about how the new path "might" race or "could" double-fire. The guard, if added without a reproduced failing case, often breaks the very path being protected.

**Why:** SH-289 GONE-on-buy. Bundled into the SH-313 split (`d8b13e5`) I added an `_initial_reconcile_pending` flag to `BallReconciler` "to prevent the deferred reconcile from racing with active gameplay." The flag's reset on `court_changed` looked harmless. It wasn't: `adopt_authored` synchronously emits `court_changed`, so the flag clears before the deferred reconcile runs, killing the spawn for save-state items with no authored child. Mel's runtime RCA caught it on round two. The double-spawn the guard was protecting against doesn't actually happen because `ensure_ball_for_key` is idempotent on `get_ball_for_key`.

**How to apply:**
- When a test fails after a refactor, the first move is `state_inspect` / `verify_motion` / minimal repro to see what actually happens. Then the fix matches the actual cause.
- Don't bundle a "while we're here" defensive guard with a primary refactor unless you have a concrete failing case for it. If you can't write the test that the guard would make pass, don't add the guard.
- Idempotency in the call chain often makes the guard unnecessary: check what the path already does before assuming it needs protection.
- If you do add a guard, ship it as its own commit with a comment naming the failing case it defends against. Future-you (or the next RCA) needs that line to know whether the guard still earns its keep.
