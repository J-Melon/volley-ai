---
name: paddle-is-the-character-racquet-is-gear
description: "Volley vocab; the paddle IS the player character, racquets and other items are gear they hold"
metadata: 
  parent: trunk_volley
  node_type: memory
  type: project
  originSessionId: 9066ef19-7b82-42a7-aaa1-b62fb15b6ebb
---

**Paddle** = the character at the system / mechanical / implementation level. The component the engine moves; the entity the gear hangs off. Used in code, design docs (mechanics), tech specs.

**Racquet** = a gear item the paddle holds. Other gear: grip tape, ankle weights, wrist brace, Cadence (audio-coded). Racquets are equipped, not embodied.

**Narrative register is different.** In narrative docs (`designs/narrative/**`, `designs/characters/**`, story prose) the characters are people. Do not call the protagonist a paddle in narrative prose. The protagonist holds a racquet (gear), levitates a ball, lifts off the ground; they are a person doing those things. "Paddle" reads as mechanic-leak in story fiction.

**How to apply:**
- Design / tech / system docs: call the character the paddle. Items the paddle uses (racquets, wraps, weights, charms) are gear. Partners are also paddles.
- Narrative / character / story-prose docs: call the character the protagonist (or by name), the partner the partner. Levitation examples use the racquet, the ball, the player, the partner. Never "the paddle".

**Designing item effects / player experience is the people-and-levitation register, not paddle-stats.** When designing what an item does (e.g. the starter items), frame it around the person and their levitation: the mover is a person lifting themselves, the racquet, and the ball on soul, and the rally has verticality from the start. An item makes them levitate, move, or reach differently; it does not "increase paddle move speed." Paddle-stat language (`paddle_size`, `paddle move speed`) is the implementation surface the effect resolves to, never the design lens. Corrected 2026-05-25 on the starter-item design: I proposed "the paddle moves faster"; Josh: "stop paddle talk, these are people now, levitation is the key."

**Why:** corrected 2026-05-15 after a narrative-writer beat used "racquet wrap" as a gear item, treating racquet as the character. The paddle is the character at the mechanic level; that is why the gear set wraps the paddle's body. Sharpened 2026-05-19 after I wrote "a paddle held aloft" as a levitation example in `designs/narrative/soul.md`: in narrative fiction the character is a person, not a paddle. Paddle is system vocab; people is narrative vocab. The two registers don't blur.
