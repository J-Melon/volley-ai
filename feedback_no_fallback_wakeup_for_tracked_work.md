---
name: feedback-no-fallback-wakeup-for-tracked-work
description: "Don't schedule a ScheduleWakeup fallback to guard work the harness already notifies on (background agents, tracked tasks)"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d1325475-fd0f-4d73-9889-41c0b0763a41
---

Do not set a `ScheduleWakeup` fallback to "check on" background agents or harness-tracked tasks. The harness already re-invokes me with a `<task-notification>` when a dispatched agent completes, so a guarding timer is redundant: it fires after the notification has already done the job, re-sending a stale prompt for work that is already done.

**Why:** during the #799 battle I set a wakeup to converge reviewers "in case they hang." The reviewer task-notifications arrived first, I converged, then the wakeup fired anyway and re-sent the converge prompt for an already-finished battle. Harmless but wasted a turn and confused the thread.

**How to apply:**
- Background agent / tracked task → NO fallback wakeup. Just wait; the notification comes.
- A fallback wakeup is only justified for state the harness CANNOT see: an external CI run on a remote, a deploy, a remote queue, something polled via shell.
- CI carried inline in the same turn (a `gh pr checks` poll loop) needs no wakeup either; it is synchronous.
- If a fallback genuinely is needed, pick a long interval (1200s+) per the tool guidance, not a short poll.

Related: [[feedback_done_closes_a_task_not_the_session]].
