---
name: when-adding-a-new-mutation-path-or-event-audit-every-existing-writer-and-listener
description: "Two-sided rule. WRITER side: a new gate (cap, validation, permission) on a state means every other writer to that state must respect the gate too; existing bypassers turn the gate into a permanent block. LISTENER side: a new way to mutate a state (new event, new entry point) means every existing reader that should react to that state must also subscribe to the new event; missed subscribers silently freeze stale. Triggers when a tech doc adds a new check, new event, or new mutation entry on a state already reachable by other paths."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9066ef19-7b82-42a7-aaa1-b62fb15b6ebb
---

Two sides of the same audit. Both surfaced on SH-405 within hours of each other.

## Writer side: every writer must respect the new gate

When the tech doc adds a gate (capacity cap, validation step, permission check) on a state, the new path you add respects it. The old paths into the same state do not, until you make them.

SH-405's `CharacterDropTarget` was the new path: drop a gear item on the paddle, `ItemManager.equip()` gates on `kit_remaining`. Correct in isolation. The bug: `ItemManager.purchase()` already wrote into the same `EQUIPPED` placement (via `_natural_target`) and ignored the cap entirely. Every gear ever bought from the shop silently filled a kit slot; on first playtest the kit read 3/3 and the new drop path rejected every attempt. The new gate was real; the old bypass made it useless.

## Listener side: every existing reader must subscribe to the new event

When the tech doc adds a new way to mutate a state (new event, new method, new entry point), the old listeners do not know about it. Anything that should react to the state when it changes via the new path will silently freeze stale.

SH-405's `equip` / `unequip` flow emitted `item_placement_changed`, not `item_level_changed`. `paddle.gd`, `speed_bar.gd`, `fp_bonus.gd`, `rack_display.gd`, `shop.gd`, `shop_item.gd`, and `dev_item_panel.gd` all subscribed only to `item_level_changed`. Equipping `grip_tape` mid-play emitted placement_changed; none of them refreshed; `paddle_size *= 1.4` registered in the effect system but the paddle never re-applied its size. The new mutation path was real; the old listeners had no awareness of it.

## How to apply

When a tech doc names a new mutation path (a gate, an event, a method) on a shared state:

- **Writers:** grep every writer to the state. For each, decide explicitly: routed through the gate, or documented exception. Silence is not a decision.
- **Listeners:** grep every subscriber to related signals. For each that consumes a derived value of the state (a stat, a count, a placement-dependent UI), decide explicitly: subscribed to the new event too, or documented as not affected. Silence is not a decision.
- Tech-doc review should call BOTH out: "writers to X: list them, name which honour the new gate" AND "listeners on related events: list them, name which subscribe to the new event."
- Reviewer briefs for gated or event-emitting features should include the grep-all-writers AND grep-all-listeners step.

## Physics-layer special case

When the "state" is a collision layer (a body moves to a new layer), the listener-side audit has TWO surfaces, not one:

- **Body-with-CollisionShape consumers**: every other physics body whose `collision_mask` needs to include the new layer. These show up as `collision_mask = N` in scene / .tres files.
- **Area2D detectors**: every `Area2D` whose `collision_mask` watches for the body. These show up as `Area2D` nodes in scenes with a `collision_mask` line (or, more dangerously, with NO `collision_mask` line at all because the default mask=1 is invisible until you read the spec). MissZone, drop targets, pickup areas all live here. Grep `^\[node.*Area2D` across `scenes/**` and check each one's mask explicitly. A body audit alone will miss them and the system will silently degrade (out-detection stops firing, drag targets stop responding, etc).

Reinforced 2026-05-16 on SH-405. Hubert moved balls from layer 1 to layer 2 and audited body-with-mask consumers but missed `scenes/miss_zone.tscn`, whose Area2D defaulted to mask=1 and went blind to layer-2 balls. Effect: balls flew forever, OUT recycle never fired. The audit needs both surfaces.

Reinforced 2026-05-16 on SH-405. The writer bug was a one-line role-branch in `purchase()`; the listener bug was a missed signal connection in `paddle.gd` and six other consumers. Both surfaced in playtest and cost a cycle each; both were preventable with the audit.
