---
name: Play area, not play volume
description: Volley is 2D side-view. The bounded region the ball lives in is the "play area," not "play volume." Volume reads as 3D and is wrong.
type: feedback
originSessionId: b1489a97-03c8-47b5-a015-d6527748dc96
---
The bounded region the ball lives in during a rally is the **play area**. Not "play volume" or "play space." Volley is 2D side-view; "volume" implies 3D and is wrong.

**Why:** 2026-05-10 on the friendship.md PR. I had used "play volume" in `designs/01-prototype/design/08-court-bounds.md` and `designs/01-prototype/tech/08-court-control.md`. Josh: "don't call it a play volume it is an area."

**How to apply:**

- "Play area" everywhere. Update existing "play volume" usages on sight.
- Same rule for related terms when they come up: surface-area thinking, not volume thinking.
- The friendship-bound is the upper edge of the play area; the side bands are the lateral edges; the ground is the bottom edge.
