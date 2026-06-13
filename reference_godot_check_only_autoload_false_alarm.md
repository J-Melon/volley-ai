---
name: reference_godot_check_only_autoload_false_alarm
description: "`godot --headless --check-only --script <file>` reports 'Compilation failed' on a script that references AUTOLOADS or global class_names (ItemManager, GameRules, Stats), because the isolated check loads the script with no autoload singletons present. The script is fine. Authority for 'does it compile' is a green GUT run (the suite loads scripts in the real project context), or the godotiq validate/check_errors tools, NOT an isolated --check-only."
metadata: 
  node_type: memory
  type: reference
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

`godot --headless --check-only --script res://path.gd` compiles the script in ISOLATION, with no
autoloads loaded. Any script that references an autoload singleton (`ItemManager`, `GameRules`,
`Stats`, etc.) or a global `class_name` that itself depends on autoloads will report
`ERROR: Failed to load script ... Compilation failed` at the line of the first such reference,
even though the script is correct and runs fine in the project.

So do not treat a bare `--check-only` failure as a real breakage. The authority for "does this
compile / load":
- a green **GUT run** (the suite loads every script in the real project context with autoloads up);
- or the godotiq `validate(target=file)` / `check_errors` tools, which the project standardises on
  (CLAUDE.md).

This is a known upstream engine bug, not a project quirk: **godotengine/godot#111515** (open, confirmed
4.5 stable), "addon/autoload singletons not resolved during `--check-only`", and `--debug` even crashes
(signal 11) on the parse error. No official workaround; the fix is to validate in project context.
Not a GUT bug, GUT works precisely because it loads the project with autoloads up.

Hit on 2026-06-03 (SH-430): after deleting two `Ball` methods, `--check-only` errored at
`ball.gd:85` (`_item_manager = ItemManager`). The 681-green suite, which loads and exercises
`ball.gd`, was the correct signal; the isolated check was the false alarm. When an isolated check
disagrees with a green suite, trust the suite.
