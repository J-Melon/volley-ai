---
name: ""
metadata: 
  node_type: memory
  parent: letters
  summary: "Project-state handoff for the SH-483 paddle work, mid-battle on"
  originSessionId: e473c2e1-e0c5-42cf-be21-266863354c95
---

# State handoff, 2026-06-10

Not a letter (that is its sibling, 2026-06-10-the-long-build). This is the project state, the part that lives in git and Linear, captured because the window dies mid-task.

## Where the work is

Branch `feature/904-sam-animation-scaffold`, PR **#909** (SH-483, Sam Animation Scaffold), OPEN, MERGEABLE, HEAD `942b94b3`, pushed. The session grew it far past the original scaffold: the sprite/gameplay sizing decouple, the ball-detection-vs-wall-collision split, the six-state animation FSM, a dev tuning panel, all rode onto #909 because each piece was non-functional without the last (Josh directed that; it is one coherent unit, ~1200 added lines).

## Mid-battle, NOT converged

A five-reviewer battle ran against `942b94b3`. Verdicts: code-quality APPROVE (15 comment nitpicks), signals-lifecycle APPROVE, godot-scene BLOCK, save-format-warden BLOCK, test-coverage BLOCK. Verified each block:

- **godot-scene (mask):** true observation, false consequence. The paddle bodies have `collision_layer = 16` and no explicit `collision_mask`, so it defaults to 1, which IS the environment layer the doc wants. Not broken; making it explicit (`collision_mask = 1`) is cleaner. Not a real blocker.
- **save-format-warden (grip_tape):** real. Deleting grip_tape can crash loading an old save (`_assign_rack_slot` iterates saved `rack_slot_index_by_key`, `_get_item` asserts on the unknown key). Per `feedback_no_save_compat` the fix is "wipes saves" in the PR body, not code.
- **test-coverage (max_degrees=0):** real. The new always-reverse velocity logic is untested at `max_degrees=0`, which is the DEFAULT config. Needs a test.

## The work list Josh set, supersedes the battle

Then Josh added two structural directives that make this another round, not a verdict:

1. **Decouple the animation-state resolver** so the FSM test does not instantiate a whole Paddle. Extract the pure `(grounded, vertical_motion, swing_pending) -> state name` logic into its own class (mirror `PaddleAIMath`), test it directly. This was Josh's keystone point.
2. **Remove walk / rebuild partner.tres + martha.tres to the six states.** They are STALE on the old four (idle/ready/swing/walk) while the FSM plays six new names, so partner and Martha currently play no animation. Latent bug no reviewer caught (it is an absence, not in the diff).

Full list to land before re-battle: the decouple, rebuild partner/martha (removes walk), add the max_degrees=0 reversal test, make `collision_mask = 1` explicit on the three paddle bodies, fold the 15 comment nitpicks, add "wipes saves" to the PR body. Then re-battle the changed scope only.

## Filed this session

SH-485 (ball returns off paddle top/bottom; scoped around the future Helmet head-contact), SH-486 (paddle subclass silently shadows base lifecycle behaviour). Both Vault, bug label.

## Loose, deliberately parked

`scripts/dev/` deletion and the stray `.claude/hooks/inject-memory-crown-test.sh` (it rode into commit 59486c57 by an over-broad `git add`) are uncommitted/in-diff, left for the dev-folder reorg, which is its own future PR (Josh: dev tooling moves to a folder in the next PR). The collider overlay, state label, PlayerSprite panel all belong with that reorg.
