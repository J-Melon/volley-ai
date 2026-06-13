---
name: Three mission flows — bug, spike, feature — index
description: Volley work comes in three shapes with three different "done" definitions. Index of the per-flow rules. Use the right one; don't force one shape onto all three.
type: feedback
originSessionId: 8cc342c4-0faf-4b52-b150-75abb72d8fcd
---
Volley work comes in three shapes. Each has a distinct entry, distinct deliverable, distinct verification surface. Dispatching the wrong shape adds overhead or misses verification.

- **Bug** (`feedback_flow_bug.md`) — exact repro first; fix on the symptom path; per-PR runtime verification. Done when the repro stops producing the symptom.
- **Spike** (`feedback_flow_spike.md`) — time-boxed exploration; writeup is the vehicle; feature tickets are the deliverable. Done when Linear has the tickets the spike unlocked.
- **Feature** (`feedback_flow_feature.md`) — tech doc, planner, fan-out, fold, Ride. Done when the player can use the capability and the Ride passes.

**Choosing the flow:**

- One-file fix with a clear repro → bug.
- "We don't know how X should work" / "is Y feasible?" → spike.
- "Build / refactor X across files" with a known target shape → feature.

Name the flow out loud before dispatch. The codename comes after.

Flows cascade: a spike produces feature tickets, a feature spawns bug tickets, a bug reveals a smell that becomes a spike. Each handoff is a flow boundary; pick the new flow's shape, not the old one's.
