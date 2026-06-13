---
name: feedback_gdscript_doc_comments_convention
description: "GDScript gets `##` doc-comments as a standing convention on classes, public methods, signals, and exported/public vars. They drive Godot editor tooltips for free and keep a future `--doctool` generated API reference viable. Distinct from the WHY-only inline-comment policy. Adopted 2026-06-01."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9411911b-5a8f-49cf-b403-486f789e4da3
---

GDScript uses Godot's `##` documentation comments as a standing convention, adopted 2026-06-01 (already in use in places; made explicit). Applies to: class (`## ...` above `class_name`/`extends`), public methods, signals, exported and public vars, constants, enums.

```gdscript
## Brief one-line description of the class.
extends Node

signal damaged ## Emitted when the node takes a hit.

## The current health value.
@export var health: int
```

**Why:** `##` comments surface as Godot editor tooltips for free (worth it for Josh alone), and they are the prerequisite for a future generated human-facing API reference. Research (ai/scratchpads/gdscript-api-doc-generation.md, 2026-06-01) found `godot --headless --doctool docs/ --gdscript-docs res://` generates class-reference XML in one command; a ~100-200 line XML-to-Markdown converter would publish it. That converter/CI is PARKED; only the comment discipline is adopted now. Without `##` comments the generated output is empty skeletons, so the discipline must come first.

**How to apply:**
- New/edited GDScript gets `##` on its public surface. Don't retrofit the whole codebase in one pass; add as files are touched.
- This is DISTINCT from the inline-comment policy ([[code-comments]] skill): inline `#` comments stay WHY-only, one line, no narration. `##` doc-comments describe the public API (what a class/method/signal IS for the caller), which is a different purpose and lives in a different place (above the declaration, not inside the body).
- Use the tags where they earn it: `@deprecated`, `@experimental`, `@tutorial`, and `[member x]` / `[method x]` / `[signal x]` cross-references.
- Implementer briefs can point at this rule; do not restate it in full.
- The wiring/architecture layer is NOT hand-documented in designs/ (it goes stale); it is read live via GodotIQ `file_context`/`dependency_graph`/`signal_map`, and eventually via generated `--doctool` output. designs/ holds durable design only. See [[project_docs_structure_prototype_to_entity]].
