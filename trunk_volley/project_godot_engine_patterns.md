---
name: project_godot_engine_patterns
description: "Branch: how to write code correctly within Godot/GDScript, its constraints, quirks, and idioms. Descend here for engine-specific patterns: the effect system for interface-contract patterns, resizing bounds for layout, .tres default conventions, fold reimport, Callable equality, Resource clustering, doc-comment conventions. Distinct from godotiq tooling and from gameplay/canon."
metadata:
  node_type: memory
  type: project
  parent: trunk_volley
  originSessionId: e473c2e1-e0c5-42cf-be21-266863354c95
---

Working correctly within the Godot engine and GDScript: the patterns and idioms Volley uses to work with Godot's constraints. Descend here when writing or structuring engine-level code. Its leaves:

- [[project_godot_interface_via_effect_pattern]]: Volley's interface-contract idiom uses the effect system's `assert(false, "must override")` base-method pattern.
- [[feedback_no_node2d_scale]]: resize the actual bounds for layout; Node2D scale is for rendering transforms, not layout normalization.
- [[feedback_godot_strips_defaults]]: `.tres` strips properties matching script defaults.
- [[feedback_godot_fold_needs_reimport]]: a folded Godot change needs a reimport.
- [[feedback_resource_over_loose_exports]]: a Resource subclass over loose `@export` when a thematic cluster exists.
- [[reference_godot_callable_bind_equality]]: Godot 4 Callable equality compares without bound args.
- [[feedback_gdscript_doc_comments_convention]]: GDScript doc-comment convention.

The leaves above sit flat at top level today; re-parent each to this branch as it is next touched (as-we-go forest fill). This branch node is the authority for engine-pattern placement.
