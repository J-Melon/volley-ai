---
name: feedback_dev_only_paths_are_lower_priority
description: "weight findings and questions by reachability; a defect or design question on a dev-only path (debug-build dev panel, dev tooling) is lower priority than a player-facing one. Don't escalate dev-surface issues to HIGH or spend Josh's turns adjudicating dev behaviour."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 19cf16f4-8427-4e43-ad3f-a2b07defe551
---

Before escalating a finding or asking Josh a design question, check whether the path is **dev-only** (gated by `OS.is_debug_build()`, behind a `dev_*` panel, dev tooling) or **player-facing**. A defect reachable only through a dev affordance is lower priority than one a player can hit, and its design questions are lower stakes. Calibrate severity and how much of Josh's attention it gets accordingly.

`ItemManager.remove_level` is the canonical example: it is dev/debug-only (`if not OS.is_debug_build(): return`, driven by the dev item panel's "−" button). Bugs in the behaviour it causes (ghost ball, leaked slot, the use-after-free when removing a held ball's item mid-drag) are dev-surface. They are worth noting and worth fixing cheaply, but they are NOT player-facing HIGHs that block a PR, and they do not warrant a stack of design questions to Josh.

**Why:** 2026-05-29 on #735 I treated a use-after-free reachable only via the dev-only `remove_level` as a blocking HIGH, then asked Josh multiple design questions ("what does remove mean", held-removal semantics, rack model) about dev-caused behaviour. Josh: "remove is currently dev behaviour label as such", then "it is about you asking questions on behaviour caused by dev which is a lower priority". I burned several turns adjudicating a dev-tool edge case as if it were production.

**How to apply:** when a reviewer returns a finding, or before I ask a design question, trace whether the trigger is dev-only. If so: downgrade the severity (a dev-only use-after-free is not a merge blocker), note it briefly, and do not escalate it into a Josh-facing design debate. Save the questions and the HIGH labels for what a player can actually reach. Player-facing first; dev-surface is cleanup-when-cheap.
