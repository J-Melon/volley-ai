---
name: project_godot_interface_via_effect_pattern
description: "Godot has no `interface` keyword. Volley's interface-contract idiom is the EFFECT SYSTEM: a base declares contract methods with `assert(false, \"X must be overridden\")`, subclasses extend and implement. FIRES WHEN a design wants an interface, or a subclass override silently shadows base behaviour. Don't invent one, don't assume one exists."
metadata:
  node_type: memory
  type: project
  parent: project_godot_engine_patterns
  originSessionId: e473c2e1-e0c5-42cf-be21-266863354c95
---

GDScript has no `interface`. Volley's idiom for a contract several classes implement is the **effect system**: a base declares the contract method with a loud abstract stub; subclasses extend and implement. Canonical example, `scripts/items/effect/outcome.gd`:

```gdscript
class_name Outcome
extends Resource

func apply(_state: EffectState, _key: String, _level: int) -> void:
	assert(false, "Outcome.apply() must be overridden by subclass")
```

`StatOutcome`, `HalveStreakOutcome`, etc. each extend `Outcome` and implement `apply()`. The `assert(false, ...)` makes the contract explicit and fails loudly if forgotten; as a Resource it is data-composable.

When a design wants an "interface", use this: base class plus `assert(false, "must override")` on the contract methods. Do not invent another mechanism or assume one exists. There is NO paddle interface despite intuitions otherwise (checked 2026-06-10: none in code or git history; `Paddle` is a concrete base).

Anti-pattern it guards: a base putting real behaviour in a Godot lifecycle method (`_ready`, `_physics_process`) that a subclass override SILENTLY shadows, dropping the base behaviour with no error. The PlayerPaddle FSM bug was this. Josh, 2026-06-10: "godot does not have actual interfaces, but the effect system is the pattern for that."
