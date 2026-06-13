---
name: godot-cold-cache-uid-warnings-are-engine-bugs-not-defects
description: "Godot 4.x emits `ext_resource, invalid UID: uid://... using text path instead` warnings on cold-cache CI runs even when UIDs are valid in source. Engine timing bug (godot#101677, #115205, #109636). Volley's CI leak gate filters this warning class. Triggers when investigating CI UID warnings, when adding new asset references, or when proposing tighter gates."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 6816739f-74ae-4ab7-bf0c-de2832b60fb1
---

## The rule

Two warning patterns are filtered out of the leak gate as known-engine-bug noise:

- `WARNING: ... - ext_resource, invalid UID: uid://... - using text path instead: res://...`
- `ERROR: Failed loading resource: res://...` (paired with the above)

Filter lives in `scripts/ci/run_gut.sh` and `.github/workflows/test.yml`. Pointer to `ai/scratchpads/godot-ci-uid-cache.md` for the full citation set.

## Autoloads must use `res://`, not `uid://`

When adding an autoload to `project.godot`, use the path form:

```
GodotIQRuntime="*res://addons/godotiq/godotiq_runtime.gd"
```

Not the UID form:

```
GodotIQRuntime="*uid://5f55jejx8ekg"
```

Autoloads resolve before the filesystem scan completes, so the UID registry is empty when the engine tries to resolve them. `res://` paths are documented as valid and bypass the timing problem.

## Why

Caught on PR #651 after the leak gate started failing CI on cold runs. Researcher findings cite engine issues #101677 (cold-import races UID cache), #115205 (mouse_cursor/custom_image UID warning), #109636 (VCS-pull UID errors), and #100228 (autoload-UID resolution race). Proposal #7195 for a `--rebuild-import-cache` flag is open but not merged.

When upstream resolves any of those, revisit the filter and the autoload form.
