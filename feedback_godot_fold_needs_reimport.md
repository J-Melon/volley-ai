---
name: feedback-godot-fold-needs-reimport
description: After folding godot units (cherry-pick across worktrees) run godot --headless --import BEFORE trusting the test suite; the class_name/UID cache lives in gitignored .godot/ and does not travel with the commit
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 332af565-6013-4f8d-ba02-8c0511478c54
---

When folding multiple godot implementer units onto one feature branch by cherry-pick (the one-feature-one-branch pattern, [[feedback_trunk_based_development]]), run `godot --headless --import` on the integrated tree BEFORE running GUT. Until you do, the suite result is meaningless.

**Why:** Godot's `class_name` registry and UID->path map live in the gitignored `.godot/` import cache, NOT in the committed `.gd`/`.uid`/`.tres` files. A unit authored in its own worktree built that cache locally; the cache does not travel with the cherry-picked commit. On the integrated branch the cache is stale, so a new `class_name` (e.g. `SpeedTier`) is "Could not find type ... in the current scope", every `.tres` referencing it warns "invalid UID ... using text path instead", and every script depending on it fails to compile. The failure CASCADES: one unresolved class_name failed ~285 of ~700 tests as "Unexpected Errors" while each unit had been green alone (SH-437, 2026-05-30).

**Tell vs real failure:** a cascade of "Unexpected Errors" (not assertion mismatches) right after a fold = stale cache, not a code conflict. `godot --headless --quit 2>&1 | grep "Parse Error\|invalid UID"` finds the root in seconds. The 285 number is downstream noise.

**Fix:** `godot --headless --import` rebuilds the cache (watch for `update_scripts_classes | SpeedTier` lines), then re-run GUT. After import, check `git status` for any `.uid` a unit's commit missed and commit it so CI's fresh reimport matches.

Do NOT debug folded-unit "failures" test-by-test before reimporting; you will chase 285 phantoms.

Related: [[feedback_trunk_based_development]], [[reference_volley_ci_shape]].
