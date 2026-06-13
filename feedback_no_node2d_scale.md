---
name: Don't normalize layout with Node2D scale; resize the actual bounds
description: Scaling a parent Node2D to fit content into a viewport is the wrong tool. Coordinate spaces, hit-rects, and physics queries break in subtle ways. Resize the bounds at authoring time instead.
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
Never set `Node2D.scale` to make a subtree fit a target size. The visuals look right but every coordinate-space-dependent system (hit-rects, `intersect_shape` probes, `Rect2` bounds, `get_global_mouse_position` math) compounds the scale and produces subtle mismatches.

**Why:** Josh corrected 2026-04-27 after the equip-loop drag regressions on PR #506 traced to a Court node scaled 0.6x in `venue.tscn`. RCA's recommended fix was "convert cursor to court-local"; that's papering over the scale. Real fix: remove the scale on Court, resize the underlying bounds (court_bounds, venue_bounds, container drop-targets) to the sizes Court should actually be at scale 1.0. Pairs with the existing CLAUDE.md rule "Never scale tiles > 1.02 to close gaps; fix spacing/rotation/model instead." Same principle, broader scope.

**How to apply:**
- If a parent Node2D has `scale != Vector2(1,1)` and child code does any `global_position` / `Rect2` / `intersect_shape` math, the scale will eventually bite. Don't add it; remove it on sight.
- Resize bounds at authoring (`size`, `position`, asset import scale) so the subtree's natural extent matches its authored container.
- Exception: Tween-driven scale animations on UI flourishes are fine; the scale resets to 1 when the tween ends.
- Diegetic / artist-side concern, not just a tech-debt rule. The artist's design docs describe container layouts at concrete sizes; scale-to-fit hacks erase that.
