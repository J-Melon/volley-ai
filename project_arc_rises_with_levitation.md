---
name: project_arc_rises_with_levitation
description: "The design truth is that the player's soul stays CONNECTED to everything they imbue (the ball) and that connection THINS over distance; the arc is the connection weakening so gravity wins. The `bound_y` line / hard PLAY_NORMAL<->PLAY_ARC flip is an IMPLEMENTATION simplification of that continuous falloff, fine for now. 'Soul bound' is the wrong FRAMING (names the simplification as the concept); the impl line can stay. (People channel soul, see project_people_channel_soul.)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

**Design truth (Josh, 2026-06-03):** the player's soul stays connected to everything they imbue, and that connection thins over distance. The ball arcs because the soul holding it up has thinned with distance and gravity wins, a continuous falloff, not a line in space. "Soul bound" is therefore the wrong *framing*: it names a fixed wall when the mechanic is an attenuating tether.

**Implementation vs framing are different.** The code uses a single `bound_y` value and a hard `PLAY_NORMAL <-> PLAY_ARC` flip (`global_position.y < bound_y`). That line is a legitimate *simplification* of the falloff and stays for now (Josh: "the line is fine for now for simplicity but not the framing"). Don't rename `bound_y` on the strength of this; what changes is how we describe and design it, not the current impl. The future, if pursued, is a distance-attenuated gradient, not a moved line.

"Rises with levitation" is one *consequence* of the connection model: the player channels soul both to hold the ball and to levitate (one force), so reaching further / moving up extends the connection and the flat-rally region grows. People channel soul, it is not its own actor; see [[project_people_channel_soul]].

Consequence for item design: an item that levitates the player higher raises the bound with them. The flat-rally region grows taller and the arc threshold rides up; there is no "cross a fixed line into the arc." The whole vertical frame rises with levitation.

**Levitation is a progression axis, not a starter item.** The protagonist gains more control over their soul as the game goes; levitation deepens across that arc. It does not serve the early goal (the speed-build toward consolidation), so it was cut from the starter item set on 2026-05-25 (Josh: "kill it, i still want levitation to be furthered as the game goes, the protagonist gets more control over their soul"). Like raising the ceiling, it belongs to later progression, not item one. Mechanism (settled 2026-05-25): trained, not bought. Soul-control accrues by time spent aloft (sustained levitation in a rally), cumulative where the ball's per-hit speed resets each rally; crossing a threshold advances it (the shape of the ball consolidating and of qualifying through the class volley record), and advancing raises the soul-bound. Written up in `designs/01-prototype/design/levitation-progression.md`.

**Why:** 2026-05-25, designing the starter Capability item. I framed a fork ("open the arc vs stay below a fixed bound"); Josh: "arc should rise with levitation, you have to remember what is causing the arc." This is a design decision and should land in the ball / court-bounds design doc (`tech/02-ball-lifecycle.md` or `design/08-court-bounds.md`), not only memory.
