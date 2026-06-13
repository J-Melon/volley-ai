---
name: Post-swarm retro, journal to Swarm Retros
description: After every swarm finishes, file a retro status update on the dedicated Swarm Retros project; separate journal from deliverable projects
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
**Swarm Retros project is retired as a concept (2026-04-24).** Retrospectives are one ritual at any scope: a **debrief** posted as a project update on whichever Linear project the reflection ties to. Mission-scope debrief → the mission's project (e.g. Equip Loop). Cycle-scope or cross-cutting reflection → Swarm Hardening (agent-infra) or the most-active work project for a cycle recap. Do NOT file retros on the old Swarm Retros project anymore.

Findings that need tracked work become issues on the current agent-infrastructure deliverable project (Swarm Hardening at 2026-04-23); the retro entry links to those issues. Don't mix the journal with scoped work.

**Why:** The swarm gets better when friction, tooling gaps, and prompt-brief failures feed back into the system. Josh's 2026-04-23 call: keep the journal project (so retros survive project close/cycle churn) but hide it from the main project roster so it doesn't clutter deliverable views.

**How to apply:**
- Retro triggers at the end of a swarm, not mid-flight.
- Look for: prompts that misled agents (e.g. wrong commit subject format), tools agents expected but didn't have (Agent/Task inside sub-agents), PARALLEL.md workflow friction, review-cycle gaps, cross-agent collisions, secret/permission surprises, corrections Josh issued during the swarm.
- File the retro as a status update on Swarm Retros via `mcp__linear__save_status_update`. Short, attributed, link challenges and Linear issues inline.
- If any finding needs tracked follow-up work, confirm with Josh (per `feedback_confirm_before_tickets`) and file the issue on the current agent-infrastructure deliverable project (Swarm Hardening today). The retro update references the issue.
- Don't open fresh "Swarm Retros N" projects; the journal is persistent. If Swarm Retros is ever closed, open a new single journal and migrate this rule.