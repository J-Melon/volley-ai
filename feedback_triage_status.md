---
name: Triage and cycle rules
description: new issues start at Icebox with no cycle; any issue actively being worked on moves into the current cycle at claim time
type: feedback
originSessionId: 8ccd039c-e27c-4f2f-888a-5678ecd02dfd
---
**New (unclaimed) issues:** create with Icebox status (`d41fb73e-32af-40b2-a7e5-5052900ab0fc`). Do not assign to a cycle. Do not use Triage (that is for external incoming issues only). Josh promotes issues to Ready himself.

**Ready is required before an issue enters a cycle.** A Icebox issue is not yet pickable; moving it into the active cycle without first promoting to Ready skips the scoping step. Never pull Icebox directly into a cycle.

**Active work:** when an agent claims an existing Icebox issue, move it into the current active cycle via `issueUpdate(cycleId: ...)`. Active work is always in the cycle so Josh's sprint view reflects reality.

**Auto-filed chore issues:** file into Icebox and simultaneously into the current cycle, since creation and claim happen in one step.

**Project-scoped work (e.g. Security):** some Linear projects run their own cadence outside the main sprint. Issues filed into those projects stay in Icebox with no cycle; do not push them into the active cycle even when auto-filing. Josh pulls them in when the project's own rhythm calls for it. Exception: if a project-scoped issue is actively being worked on, move it into the current cycle per the general active-work rule.

**Why:** The old rule ("agents never touch cycles") was tightened to "Josh sets priority"; Josh relaxed on 2026-04-19 because issues-in-work sitting outside cycles made the sprint view lie. Creation still defaults to Icebox; cycle membership follows active work.

**How to apply:**
- Issue create (no active work yet) → Icebox, no cycle.
- Issue create (about to work it, e.g. auto-chore) → Icebox, current cycle.
- Issue claim (existing Icebox) → move to current cycle as part of the claim step in PARALLEL.md.
- Query current cycle: `cycles(filter: {isActive: {eq: true}})`. If none active, skip gracefully.
