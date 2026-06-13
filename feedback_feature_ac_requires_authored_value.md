---
name: feature-acs-require-the-authored-resource-value-not-just-the-field
description: "When an AC adds a tunable to a Resource, the AC must also require the shipped `.tres` to carry a non-default value. Otherwise the feature ships silently disabled because the `@export` default is `0.0` and the runtime path short-circuits on it."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 692cb0e6-7f69-4b19-83bf-aff85bf6abc0
---

When an implementation AC adds a new tunable to a `Resource` (e.g. `paddle_return_angle_max_degrees` on `PaddleConfig`), the AC list must include a checkbox for authoring the shipped `.tres` with a non-default, gameplay-meaningful value. Tests can stub the field via `Stats.resolve` injection, reviewers can read the math, the implementer's QA loop can run the game, and the feature can still ship completely off, because the production resource file falls back to the `@export` default.

**Why:** 2026-05-14, Ride SH-403 discovered SH-316 had shipped silently disabled. PR #651 added the paddle-offset return angle math; `effect_processor._apply_paddle_offset_return` early-returns when `paddle_return_angle_max_degrees <= 0.0`; `paddle_stats.tres` shipped with no override; the field defaulted to `0.0` in `paddle_config.gd`; the feature was inert in main from merge until PR #668 set the value to 50. Four reviewers cleared the PR without anyone running the game with the default config. The tests passed because every test wrote its own stat value through the Stats injection path.

**How to apply:**
- Any AC that introduces a new `@export` on a config Resource also asserts the shipped `.tres` carries a non-default value, named.
- The default in the script should be `0.0` (or the OFF state) so a missing override is a clear "feature not configured yet", but the AC checklist treats authoring the value as a separate, required step.
- Reviewers asked to check "does this feature visibly fire in the shipped scene?" before clearing.
- Same trap is currently live on `paddle_english_coefficient = 0.0` on `paddle_stats.tres` and `linear_damp = 0.0` on `out_rest.tres`; both need either an AC-driven authored value or an explicit "intentionally off" note in the resource.
- Pairs with [[feedback_config_state_space_diagnostic]] (data-driven justifies itself) and [[feedback_godot_strips_defaults]] (Godot strips overrides that match defaults, so a future tune can vanish silently).
