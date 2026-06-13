---
name: peak-is-banned-from-code-the-window-is-final-consolidation
description: "Volley vocab/code-naming; the tier window once called \"peak\" is renamed \"final consolidation\" everywhere, INCLUDING code symbols, tests, and resource strings, not just design docs. FIRES WHEN naming or renaming a concept Josh has retired, or touching in_peak/final-consolidation code."
metadata: 
  node_type: memory
  type: project
  originSessionId: 624e0194-c4bb-44c4-bd5e-f50d16427349
---

The top-tier window once called **peak** is renamed **final consolidation**. Josh (2026-06-02, SH-437 #803): "I don't want peak mentioned in the code."

The token map in use: `in_peak` to `in_final`; peak/enter methods to `enter_final_consolidation`; `_peak_banked_*` to `_final_banked_by_ball`; reward strings `tier_one_peak`/`top_tier_peak` to `tier_one_final`/`top_tier_final`. `at_max_speed` is kept (it is a speed concept, not a peak concept).

**Why:** a retired concept-word is banned from the WHOLE surface, not just the prose. A rename is done only when grep-to-zero holds across EVERY surface, and the direction does not matter: docs-led renames must reach code (the peak case), and code-led renames must reach docs (the #834 case below). Checking one surface and declaring done is the failure.

**The completeness failure to avoid (#834, 2026-06-03):** the friendship->soul rename landed in code (grep-to-zero in scripts/tests/resources) and I declared it done after a full reviewer battle. ~30 design docs still said "friendship", and a doc still named the removed `friendship_bound_y` field. I had grepped one surface (code) and confused "the part I checked is clean" with "complete". Reviews could not catch it: diff-scoped review structurally cannot see untouched staleness, so the completeness check is the AUTHOR's, before declaring done, never the reviewers'.

**How to apply:** when renaming a concept, grep the old word to ZERO across ALL surfaces before declaring done: `grep -rni <oldword> scripts/ tests/ resources/ scenes/ designs/`. Both directions. Watch for legitimate keeps: a word meaning something unrelated, fiction/theme uses (e.g. "friendship" as narrative theme vs the renamed mechanic, see [[project_people_channel_soul]]), and git history. "I checked one surface" is not done. Secondary catch for reviewers: when a diff touches a comment/docstring/doc line that names an identifier, verify the identifier still exists, do not just check the change reads clean. Related: [[project_volley_construct_reality]], [[project_volley_paddle_racquet]], [[feedback_describe_before_naming]], [[feedback_self_judgment_is_coherence_not_accuracy]].
