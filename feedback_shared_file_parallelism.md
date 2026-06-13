---
name: Shared-file work parallelizes when seams don't overlap
description: Don't over-serialize swarm dispatch out of fear of file conflicts; check whether the seams within the file collide before holding work back
type: feedback
originSessionId: d15b1172-9e53-401f-b338-5c126b669606
---
When two issues touch the same file, do not default to serial dispatch. Look at *which functions / regions* each issue modifies. If the seams are non-overlapping (one owns grab path, another owns release path; one owns init, another owns teardown), branches can run in parallel and `git merge origin/main` resolves at the line level.

**Why:** Volley's swarm rule is "never two agents in the same file" only as shorthand for "never two agents stomping each other's lines". Same-file work with disjoint seams meets that bar. Holding it serial costs a full implementer round-trip per ticket for no benefit. Recovered case: SH-287 (release path) and SH-297 (grab path) shared `ball_drag_controller.gd` but at different ends of the gesture; serializing them was unnecessary caution.

**How to apply:** Before serializing two same-file tickets, name the function-or-block surface each owns. If they don't overlap and the second can stub or no-op the first's contract until merge-main-in, dispatch them in parallel with explicit "stay out of these regions" briefing on each side. Genuinely coupled work (one ticket transforms a type the other consumes structurally) still serializes - coupling, not co-location, is the gate.
