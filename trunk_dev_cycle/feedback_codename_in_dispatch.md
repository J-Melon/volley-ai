---
metadata:
  node_type: memory
name: Agent dispatch description leads with the codename
parent: feedback_codenames
description: The Agent tool's description field is what shows in Josh's CLI; lead with the codename so he can track Trillian/Ford/Zaphod by name in the dispatch list
type: feedback
originSessionId: 60225dfd-277e-4c4b-8ef4-5843bb535764
---
metadata:
When dispatching a swarm agent via the Agent tool, the `description` field leads with the codename, not the role. Josh reads the CLI view; "Trillian reviews #321 code" tells him which codename is working. "Review challenge 321 code-quality" hides it.

**Why:** the codenames are the swarm's handle on personality and continuity; the role (code-quality, gdscript-conventions) is already implicit in `subagent_type`. Surfacing the role in the description duplicates what's there and buries the name Josh actually tracks across turns. Rule given by Josh 2026-04-23.

**How to apply:** on every `Agent` call, the `description` field reads `<Codename> <short action>`. Examples:

- `Trillian reviews #321 code`
- `Ford reviews #321 conventions`
- `Zaphod reviews #321 scenes`
- `Marvin reviews #321 tests`
- `Slartibartfast revises #321 tests`
- `Trillian audits UID research`

Codename pool stays the GF / Hitchhiker's / Oddworld / Omori / Outer Wilds / Martha pool from `feedback_sub_agent_codenames.md`. Assign per task-unit, not per role; the same codename can wear different roles across challenges.
