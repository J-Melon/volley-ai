---
name: project_court_scene_is_live_gameplay_ui
description: "The live player-facing gameplay UI lives as loose nodes directly in scenes/court.tscn (SpeedBar, volley/FP/PB labels, FPBonusLabel), NOT in a HUD scene. dev_hud.tscn holds only debug panels. scenes/hud.tscn was an orphan and is deleted. Boot chain: venue.tscn -> court.tscn + dev_hud.tscn."
metadata: 
  node_type: memory
  type: project
  originSessionId: 9411911b-5a8f-49cf-b403-486f789e4da3
---

Where Volley's on-screen UI actually lives, because the scene names mislead and this cost a long wrong-scene hunt on SH-437 (2026-05-31).

**Boot chain:** `project.godot` main_scene = `venue.tscn`, which instances `court.tscn` + `dev_hud.tscn` + `shop.tscn` + `workshop.tscn`.

**Player-facing gameplay UI = loose nodes directly under the Court root in `scenes/court.tscn`.** There is NO dedicated player-HUD scene. Examples and their listener scripts (all in `scripts/court/`):
- `SpeedBar` (speed_bar.gd), fed by BallReconciler.
- `CurrentVolleyCountLabel` (volley_counter.gd) <- `Court.volley_count_changed` (Court owns `_volley_count`, emits in court.gd).
- `PersonalVolleyBestLabel` <- `Court.personal_volley_best_changed`.
- `FriendshipTotalLabel` "FP: N" (friendship_points.gd) <- `ItemManager.friendship_point_balance_changed`.
- `FPBonusLabel` "+X% FP" (fp_bonus.gd) <- ItemManager offset signals.
- `SoulRateLabel` "x2 soul/tier" (soul_rate.gd) and `SoulFloatLayer` (soul_float_layer.gd) <- TierRewardHandler via the `tier_reward_handlers` group. Added SH-437.
Pattern: a Label/Control node in court.tscn + a tiny scripts/court/*.gd listener bound to a signal on `Court` or an autoload (ItemManager). The script reaches Court via `court = NodePath("..")` export.

**`dev_hud.tscn`** (root node named `DevHUD`) holds ONLY debug panels (DevStatPanel, DevBallStatePanel, DevBouncePanel, DevMenu, etc.), gated by `OS.is_debug_build()`. The `DevHUD` name is legacy; it is NOT the player HUD.

**`scenes/hud.tscn` was an ORPHAN** (instanced nowhere, superseded long ago) and was DELETED on SH-437. Do not resurrect it. An agent (Wirt) added the soul float to it by mistake, so the float never loaded; the fix was to move the node into court.tscn.

**Rule for any "add/where is the X UI" task:** the live gameplay UI is in `court.tscn`, not a HUD scene. Verify against the boot chain (venue -> court) and `git grep` the node's uid for references before assuming a scene is live. Confirm which scene the game LOADS before editing or diagnosing UI. Relates to [[feedback_self_judgment_is_coherence_not_accuracy]] (I kept "verifying" against the wrong scene).
