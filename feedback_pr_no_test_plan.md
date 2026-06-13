---
name: PR bodies have no test plan; verification lives in the Ride
description: omit the Test plan checklist from PR bodies; pointer to standard rule in ai/skills/minions/commits.md
type: feedback
originSessionId: aa72aedf-9357-4e3c-83df-beba4a0e68e4
---
PR title and body discipline is settledical in `ai/skills/minions/commits.md` under "PR title and body shape". Read that before any `gh pr create` or `gh pr edit`.

Headline rule: PR bodies are narrative prose. No `## Test plan`, no checklist of verification steps. Player-facing verification belongs in the mission's Ride; AC lives on the Linear issue. Duplicating into the PR adds noise that decays the moment the Ride runs.
