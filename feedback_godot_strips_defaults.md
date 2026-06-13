---
name: Godot strips .tres properties that match script defaults
description: When diffing a .tres against main shows missing exported properties, suspect default-stripping before crying "leak"; Godot omits properties whose value equals the script's default
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
When Godot saves a `.tres` (or `.tscn`) it strips any exported property whose current value equals the default declared in the backing script. Diffing the file against `main` then shows lines disappearing, which looks like data loss but isn't; load both versions and the in-memory resource is identical. This regularly fires on UID rewrites too: Godot regenerates UIDs in the same save and the diff reads as both UID drift and property loss in one chunk.

**Why:** 2026-04-25, post-merge of #395 I flagged `resources/timeout_config.tres` as a "leak that would break production" because the working tree had `walk_duration_seconds = 0.6` and `equip_pose_offset_x = -320.0` stripped. Both values match the script's `@export` defaults in `scripts/core/timeout_config.gd`, so Godot had simply re-serialised the resource without redundant default lines. Origin/main happened to still carry the explicit lines, but they were noise. Josh: "make sure to note why godot strips something, a lot of times it is because it is a default."

**How to apply:**
- When a `.tres` / `.tscn` diff shows exported properties vanishing, check the backing script's `@export` defaults before calling it a leak.
- If the stripped values match defaults: the working-tree version is functionally equivalent. Either side wins on merge with no behaviour change.
- The genuine red flag is a stripped value that does NOT match the script default, or a UID rewrite paired with values that have actually changed away from defaults; those are real edits, not serialisation noise.
- This also explains apparent "Godot deleted my override" diffs after someone bumps a script default to match an existing override: the override-equals-default and gets stripped on next save.
- Quick check: `grep -E '@export.*<property>' <script>.gd` to read the default; compare to the value origin/main carries.
