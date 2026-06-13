---
name: Don't track waiting-for-merge as a task
description: Organiser stops and waits after a challenge is ready; "dispatch Wave 2 after SH-X merges" is not a pending task in the task list
type: feedback
originSessionId: 60225dfd-277e-4c4b-8ef4-5843bb535764
---
When a challenge is ready for Josh's review, the organiser stops. Waiting for Josh to merge is not tracked as a pending task. When merge happens, Josh brings the thread back and the organiser dispatches the next wave at that moment.

**Why:** a "dispatch on merge" task sitting in the task list implies the organiser will notice the merge and act on it, which it won't; the organiser isn't polling GitHub and shouldn't. The task list is for work in flight, not for reminders about other people's actions. Rule given by Josh 2026-04-23 after I left "Dispatch SH-97/98/100 parallel on SH-99 merge" sitting as a pending task.

**How to apply:** when a challenge is ready and the next step is Josh's to make (review, approve, merge), finish the current turn with a wrap-up line and no follow-on task. The narration is enough signal. When Josh comes back with "merged" or "go", re-plan from the current state at that point.
