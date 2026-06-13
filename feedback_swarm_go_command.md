---
name: "\"Go\" means dispatch swarm from highest-priority work"
description: When Josh says "go" in a cycle-planning context, pick the highest-priority swarm-eligible issues, dispatch, and report a summary
type: feedback
originSessionId: 60225dfd-277e-4c4b-8ef4-5843bb535764
---
When Josh says "go" (or similar) after a cycle-planning discussion, don't ask for confirmation on the batch. Pick the highest-priority swarm-eligible issues **from the current cycle only** (never Icebox, never Next), dispatch them, and report a summary of what was dispatched.

**Why:** Josh is comfortable with my judgement on swarm sizing and doesn't want to re-approve every batch. Asking "green light?" each time is friction. The current-cycle constraint matches scrum horizon; swarms deliver into the active cycle, not future ones.

**How to apply:** On "go" with no other context, re-derive candidates from `list_issues(cycle: current)` (filter to Ready/In Progress, skip anything not swarm-eligible). Never pull from Icebox or the Next cycle. Dispatch agents, then summarise what went out. Don't stop to confirm.
