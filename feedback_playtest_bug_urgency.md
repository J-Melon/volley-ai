---
name: Release-blocking playtest bugs go into current cycle as Urgent
description: Bugs discovered during playtest that block release are filed Urgent and added to the active cycle, not Icebox
type: feedback
originSessionId: 60225dfd-277e-4c4b-8ef4-5843bb535764
---
Bugs discovered during Josh's playtest that block release bypass the default Icebox-first routing. They go straight into the current cycle at priority Urgent.

**Why:** Playtest bugs are found against work that has already merged; they sit in the release path. Parking them in Icebox means they compete with routine work for Josh's attention when they should dominate it. Urgent + current-cycle signals "this is what's in the way of shipping."

**How to apply:**

- `priority: 1` (Urgent).
- `cycle: current` (move into the active cycle regardless of normal Icebox-only rule).
- `estimate: 0` (bugs stay unpointed per the existing rule).
- Assignee: Josh (playtest bugs are his to route, usually).
- Label: `bug`.
- State: `Ready` (not Icebox; Urgent cycle issues are ready to work by definition).
- If not release-blocking, stick with default Icebox routing; Josh promotes.

The current-cycle bypass is only for release-blocking playtest bugs. Non-blocking bugs still follow the normal flow.

**Stop-the-line:** an Urgent playtest bug in the active cycle blocks everything else in that cycle until it is resolved.

- No new swarm dispatches until the Urgent is fixed (including "go" commands).
- Existing in-flight work can finish what it is doing, but nothing new starts.
- Reviewers, fix agents, and organiser effort route to the Urgent first.
- "Go" / cycle-planning answers must surface Urgent playtest bugs at the top of the queue and state the freeze explicitly.
- The freeze lifts when the Urgent's state moves off Ready / In Progress, not when the challenge merges (per the new merge-closes-issue flow).