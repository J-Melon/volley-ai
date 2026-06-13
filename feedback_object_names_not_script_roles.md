---
name: Name objects, not scripts
description: game-object names describe the in-world entity; reject "_controller", "_watcher", "_display", "_palette", "_handler", "_manager" suffixes that describe software role
type: feedback
originSessionId: e64c4ee1-f2a0-40ca-a1d8-d32235324bbb
---
File and class names for game objects should describe what the object *is* in the world, not the role its script plays. Everything is a script — calling something `Watcher` or `Controller` adds no information and frames the entity as plumbing.

**Why:** Josh wants the code to read as a description of the game's objects, not the software architecture wrapping them. Role-suffixes (`watcher`, `controller`, `display`, `palette`, `handler`, `manager`, `reconciler`) describe what a script does rather than what the object is, and "what it does" is implicit — every `.gd` file is a script doing something. The naming should answer "what is this thing in the venue?", not "what software pattern wraps it?".

**How to apply:**
- New script files and `class_name` declarations: pick a name that names the object or thing, not its mechanism. Prefer `BallDrag` over `BallDragController`, `Rack` over `RackDisplay`, `ShopSettle` or just inlining the behaviour into `ShopItem`.
- When renaming existing offenders is too disruptive, document the smell and revisit when the file is touched for other reasons.
- Forbidden suffixes (smell-level, not absolute): `_controller`, `_watcher`, `_display`, `_palette`, `_handler`, `_manager`, `_reconciler`, `_helper`, `_service`. If one of these is being added, push back: what is the object? Name it that.
- Existing suffixed names in the codebase as of 2026-05-04: `BallDragController`, `RackDisplay`, `BallReconciler`, `CursorOverlayPalette`, `ShopItemSettleWatcher`, `ItemManager`. Treat as legacy until refactored.

Connected to `feedback_no_abbreviations` (full words) and `feedback_describe_fiction_before_naming` (lead with what the thing is before applying the vocab term).
