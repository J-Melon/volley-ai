---
name: collapsing-a-model-kills-every-surface-that-recreates-it-including-visual-anchors
description: "When the design collapses a model (e.g. per-limb anatomy to flat kit_slots, per-pose capability to one stat), the tech doc must kill every surface that lets the old model creep back in. Per-item visual anchors recreate anatomy through the visual axis. Triggers when a tech doc adds per-item paths, slots, or fields that mirror a structure the design explicitly collapsed."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9066ef19-7b82-42a7-aaa1-b62fb15b6ebb
---

When the player-facing design collapses a model, the tech spec must follow through on every axis the model touched, not just the one Josh called out.

SH-405 collapsed per-limb anatomy ("anklets at the ankle, gloves at the hands") to a flat `kit_slots` count: the paddle has no anatomy, capacity is a number. I then drafted a tech doc that preserved per-item `anchor_node_path: NodePath` "for visual mount only", arguing the collapse killed capacity-anatomy not visual-anatomy. Josh agreed in chat. Wrong reading: per-item anchors are per-item anatomy through the visual axis, and they brought the failure mode back. Playtest surfaced it the moment a stat-scaled `Sprite` parent dragged the mounted gear into a non-uniform stretch.

The correct read: when the collapse happens, every per-item field that names a position, slot, or location is suspect. The default is to remove them; only readd one if you can name a player-facing reason that survives the collapse.

## How to apply

- When a tech doc proposes per-item `<thing>_path`, `<thing>_slot`, `<thing>_position`, `<thing>_kind`, ask: does this recreate the structure the design collapsed?
- If yes, propose the unified mechanism instead. Reinforced 2026-05-16: per-item anchors should have been one mount on the character with each gear scene authoring its own offset.
- Splits "visual concern" from "logic concern" are usually a tell that you are about to recreate the collapsed model on one axis only. Both axes are anatomy.
- When Josh agrees in chat with a "visual only" carveout, the agreement is provisional; playtest is the test.
