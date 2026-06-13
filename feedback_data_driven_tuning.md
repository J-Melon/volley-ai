---
name: Tuning lives in data, not code
description: Promote tunable values to @export var (or a Resource) instead of const; magic numbers in tests derive from the production export
type: feedback
originSessionId: d15b1172-9e53-401f-b338-5c126b669606
---
Any value that affects feel, balance, layout, or visual tuning lives in data, not in a `const`. Default shape: `@export var name: Type = default` on the owning node. Cluster of related tunables for one subsystem: a `Resource` config (e.g. `BallDynamicsConfig`) with `@export` fields. Per-item values: an `ItemDefinition` field. Tests must read the production export off the instance, not hardcode the default literal.

**Why:** Designers tune in the inspector or in a resource file, not by editing `.gd` source. A `const` makes the value invisible to the inspector, locks it to ship-time literals, and forces tests to mirror those literals - which means a tweak in production silently passes a test that pinned the old number. Volley keeps surfacing the same finding ("should be a config" / "tuning should be config") because the implementer instinct is to write `const` first; redirect that instinct upfront.

**How to apply:**
- Reach for `@export var` over `const` whenever the value is plausibly tuned. Defaults stay at the const's old value.
- When a tunable has an obvious sensible range (sub-1.0 inflation regresses forgiveness, negative durations break math), use `@export_range(...)` to constrain the inspector.
- Group related tunables into a `Resource` if there are 3+ knobs that move together.
- Tests reading a tuned value must `read_back` from the instance (`_ball.press_hitbox_inflation`), not from the source literal.
- Reviewers (especially `gdscript-conventions` and `code-quality`) flag `const` declarations of values that look like tuning.
- **Plan-agent output review:** when a Plan agent proposes a numeric constant (`const FOO_PX = 2.0`, `const BAR_S = 0.5`), the dispatcher catches it before passing the plan to Josh and rewrites it as `@export var` or a Resource cluster in the same step. Do not pass a plan with a tunable-shaped const through to the implementer — Josh will catch it and the rule will fire mid-flight, costing a round. Observed 2026-05-04 on Dave's shop-drag plan (`SHOP_DRAG_THRESHOLD_PX` should have been an `@export var` clustered with the existing `ShopItemDrop` settle tunings into a Resource).
