---
name: Project dates are guides; change only on done or behind
description: Linear project targetDate is a guide for the timeline; move it only when the project completes or is confirmed behind schedule
type: feedback
originSessionId: 63a922cb-9834-46c0-b48d-fd28a7512bb9
---
Linear project `startDate` and `targetDate` fields express the initiative's timeline: when the project needs to land for the initiative to hit its own deadline. Josh owns those dates. Agents do not set or change them.

**Why:** Project dates are not scheduling knobs; they are a statement of what the initiative requires. Changing them as a reaction to dependencies moving, or setting them on a new project because "it'll ship in cycle #N", destroys that signal. If a project is behind its target, the date stays and the lateness is the information. Josh flagged this on 2026-04-20 after I (a) proposed clearing Court's targetDate and (b) set fresh dates on the new Equip Loop project.

**How to apply:**
- **Don't set or change `startDate` / `targetDate` on your own initiative.** Including on new projects. Leave dates null and let Josh populate them from the initiative timeline. You may make the change when Josh explicitly directs it; he owns the call.
- **Warn when a project has no dates.** When checking project health, creating a new project, or surfacing work into a sprint plan, flag any project with null `startDate` or `targetDate` so Josh knows to set them against the initiative timeline. Missing dates are a gap Josh should close, not something to leave silently.
- **Never clear a stale `targetDate`.** A past-due date on an open project is a live signal; removing it hides the signal.
- **Do not propose reschedules** based on cycle planning or dependency slip. The initiative, not the sprint, owns the timeline.
- Project status goes to Completed when the project ships; `completedAt` captures real closure, and the original `targetDate` stays as a historical marker.
