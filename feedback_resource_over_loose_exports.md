---
name: Resource over loose @export when a thematic cluster exists
description: When 3+ tunables move together (palette, speed curve, AI knobs), default to a Resource subclass with a .tres file rather than loose @export vars on the consumer node
type: feedback
originSessionId: d15b1172-9e53-401f-b338-5c126b669606
---
When a node carries 3+ tunables that thematically belong together (a palette, a stats config, a behaviour cluster), promote them into a `class_name FooConfig extends Resource` with `@export` fields and a `.tres` instance under `resources/`. The consumer node carries one `@export var foo: FooConfig` instead of four loose `@export var color_x: Color` lines. This is **the established Volley pattern**, not a one-off - `BaseStatsConfig`, `PaddleAIConfig`, `TimeoutConfig`, `ShopConfig`, `ProgressionConfig` all live this way.

**Why:** loose `@export` on the consumer node ties the tuning surface to that node's lifetime; a Resource decouples it. Designers tune the `.tres` once and every consumer reads the same source of truth. Multiple consumers sharing a palette get it for free. The data-driven.md skill names this as the ladder's middle rung; Josh's instinct is to reach for it whenever a thematic cluster surfaces.

**How to apply:** when a refine round adds a third `@export var` of the same family (three colours, three speed knobs, three AI weights), pause and ask: should this be a Resource? If yes, extract before the third tunable lands. If a refactor pass surfaces 3+ existing loose `@export`s of the same family, group them into a Resource as part of the change.
