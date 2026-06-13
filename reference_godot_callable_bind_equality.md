---
name: godot-4-callable-equality-ignores-bound-args
description: "Godot quirk; Callable equality (==, is_connected, disconnect) compares method + target ONLY, NOT bound args. FIRES WHEN reviewing or writing signal connect/disconnect that uses .bind() to identify an instance, or an is_connected guard on a bound callable. Verified empirically on Godot 4.6.3 (SH-437)."
metadata: 
  node_type: memory
  type: reference
  originSessionId: 624e0194-c4bb-44c4-bd5e-f50d16427349
---

In Godot 4, `Callable` equality compares **method and target object only**. Bound arguments play no role. `Callable(o,"m").bind(a) == Callable(o,"m").bind(b)` is **true** even when `a != b`. So `is_connected` and `disconnect` on a bound callable ignore the bound value too.

Consequence for the common pattern `signal.connect(_handler.bind(instance))` to distinguish instances: it is BROKEN.
- `is_connected(_handler.bind(x))` returns true after the FIRST instance connects, so instances 2+ are silently never connected (the guard refuses them).
- `connect(_handler.bind(b))` after `connect(_handler.bind(a))` returns `ERR_ALREADY_EXISTS` (31); only one slot exists per method+target.
- `disconnect(_handler.bind(x))` removes the single shared slot, dropping the handler for ALL instances.

**Right way to identify the firing instance:** make the SIGNAL carry the instance (`signal missed(ball: Ball)`), connect bare, read it from the handler arg. Or use a distinct per-instance lambda closure stored for disconnect (closures have distinct identity; `.bind()` does not).

**Verified empirically** (not from docs, which do not state this in one line): headless `godot --headless --script`, Godot 4.6.3. `bind(a)==bind(b)` true for different a,b; second connect ERR_ALREADY_EXISTS; connection count stays 1.

**Origin:** SH-437 #803. ball_tracker.gd used `is_connected(_on_ball_missed.bind(ball))`; two reviewers split on whether it worked, a third-vote tiebreak plus a corrected test settled it. My first test was incomplete (only compared equal bound values), which nearly voided a correct block. Related: [[feedback_self_judgment_is_coherence_not_accuracy]], [[feedback_converge_needs_all_reviewers]].
