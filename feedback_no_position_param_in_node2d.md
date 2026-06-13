---
name: Don't use 'position' as a parameter name in Node2D-derived scripts
description: Bare `position: Vector2` shadows Node2D.position and surfaces SHADOWED_VARIABLE_BASE_CLASS warnings; rename to release_position / world_position / candidate_position / spawn_position by intent
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
GDScript emits `SHADOWED_VARIABLE_BASE_CLASS` warnings when a function parameter named `position` is declared in any class extending `Node2D` (or `Control`, `CanvasItem`, etc. with their own `position` property). Bare `position: Vector2` is the common offender.

**Why:** Josh hit this twice on challenge #403 (2026-04-26 / 04-27); first in `shop_item._is_position_inside_shop(position)`, then six more in the rewritten `ball_drag_controller.gd`. Each one surfaces as a noisy GDScript warning at every reload. Beyond noise, the parameter actually shadows the inherited property, so a typo inside the function body that meant to say `self.position` silently uses the parameter instead.

**How to apply:**
- Don't write `func _foo(position: Vector2)` in any script that extends `Node2D` or any other class that exposes `position`. Same for any helper function inside such a script.
- Rename by intent:
  - `world_position` for a hit-test or spatial lookup target
  - `release_position` for drag-release inputs
  - `candidate_position` for a spawn validation probe
  - `spawn_position` for actual spawn calls
  - `press_position` for press-event capture
- Same rule applies to `signal foo(position: Vector2)` declarations: name the signal arg with intent. The runtime ignores the name; the warning may not fire on the signal itself, but consumers will tend to bind a parameter with the same name and trigger the warning at the consumer.
- The `replace_all` Edit only catches the named occurrences; the function body's bare `position` references won't match the new name, so re-grep the body after a rename.
- This pairs with `feedback_var_names.md` (full descriptive names); `world_position` over `pos`.
