---
name: Dispatch turn discipline: dispatch, end turn, carry reports as they land
description: "After any swarm_dispatch, end the turn. Minion reports arrive through the session harness when each finishes. A report without a verdict section is the complete report; the minion stopped. Carry that surface yourself. The gap between dispatch and report is capacity, not dead air for polling."
metadata:
  node_type: memory
  parent: feedback_dispatch_process
  type: feedback
  originSessionId: current
---

**Dispatch, then end the turn.** After `swarm_dispatch` (reviewers, implementers, or
any other minion), stop. The session harness delivers each report when it finishes;
reports land naturally at the turn boundary. I do not poll `swarm_status` in a loop
waiting for completion. The gap between dispatch and report is capacity for the next
piece of work.

**A minion report is complete when it arrives.** If a report ends mid-sentence or lacks
a verdict section, the minion finished its session at that point. Verify once that the
report file on disk contains no further content, then carry that surface myself. A
minion that stopped is not still running.

**Why:** 2026-06-15 and again 2026-06-30: I polled `swarm_status` in a tight loop
while waiting for implementers, burning turns and attention. Josh: "add to memory to
end turns instead of constant checks." A dispatched minion will finish or it won't;
polling does not speed it up.
