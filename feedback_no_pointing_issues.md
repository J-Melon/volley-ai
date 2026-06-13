---
name: Estimate rules for Linear issues
description: Set estimate=0 for bugs and estimate=1 for spikes; leave stories unpointed for Josh
type: feedback
originSessionId: d3492d2a-f090-42d1-ac35-103c678183d0
---
Set `estimate` based on issue type:

- **Bug** (bug-format issue, `bug` label): `estimate = 0`
- **Spike** (spike-format issue, `spike` label): `estimate = 1`
- **Ride** (ride-format issue, `ride` label, under the `test` group): `estimate = 0`
- **Carnival** (`carnival` label, under the `test` group): `estimate = 0`
- **User Story / System Story** (`feature` label): omit `estimate`; Josh points these himself

**Why:** Bugs and spikes have predictable sizes in this project, so Josh wants them auto-estimated. Stories vary and he wants to size them during planning.

**How to apply:** When calling `save_issue`, look at the issue type and set `estimate` to 0 for bugs, 1 for spikes, omit for stories. If unsure which type, check the body format (Bug Report → bug, research/investigation → spike, User/System Story → story).

Instance of the greater principle [[feedback_write_from_the_players_experience]] (name the player outcome, not the parts).
