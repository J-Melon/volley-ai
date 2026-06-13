---
name: Projects are linear in scope; cross-project work means mis-scoping
description: A Linear project should hold work that finishes inside it. If a piece of work spans projects, the project boundaries are wrong; resolve by moving issues, merging projects, or filing a new one rather than carrying a cross-project dependency
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
A Linear project's scope is what completes inside that project. If a piece of work depends on issues in another project to finish, the project boundaries are wrong. Resolve by moving issues, merging projects, or filing a new one.

**Why:** Josh flagged 2026-04-27 after I created a "Ball Mechanics" project alongside "Equip Loop". The drag-system issues I filed there (SH-287 DropTarget, SH-288 Ball lifecycle, SH-289 GONE-on-buy, SH-290 venue layout) all crossed back into Equip Loop's verifiable surface; Kyle Patrol's mission needed them to land. Cross-project dependencies are a misscoping signal: either the work belongs in the same project, or one project shouldn't exist. The fix was to move the drag-system issues into Equip Loop and the ball-feel issues (SH-291 / SH-292) into Game Feel, then archive Ball Mechanics.

**How to apply:**
- Before filing a new project, ask: does this work finish inside the project, or does it depend on issues that live elsewhere?
- If it depends on others, the project is the wrong shape. Pick one of:
  - Move the dependency issues into this project (they actually belonged here).
  - Move this project's issues into the depending project (they actually belonged there).
  - Merge the two projects into one (their scopes overlap enough that the boundary is artificial).
- A project's mission completes when its Ride passes; if the Ride depends on work in another project, the project boundary is leaking.
- This doesn't mean projects can't share infrastructure (utilities, shared scripts, the engine itself). Shared INFRASTRUCTURE is fine; cross-project ISSUES unblocking each other is the smell.
- The pattern pairs with `feedback_use_linear_native_relations.md` (use Linear's native fields) and the mission/ride taxonomy in `designs/process/missions-and-projects.md`.
