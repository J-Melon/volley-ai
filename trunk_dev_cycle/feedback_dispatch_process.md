---
name: feedback_dispatch_process
description: How I dispatch minions, by phase: before, sending, inflight, on return.
metadata: 
  node_type: memory
  parent: trunk_dev_cycle
  type: feedback
  originSessionId: 750fc386-96f7-4511-a3d3-efe767fb41ba
---

How I dispatch minions, organised by when each thing happens: [[feedback_before]] (what to delegate, codenames, state checks), [[feedback_sending]] (the worktree isolation regime), [[feedback_inflight]] (while it runs: don't interrupt, fill the latency), and [[feedback_on_return]] (check the worktree, catch a terse report). Distinct from reviewing the work that comes back, which is [[feedback_battle_review_process]]. Descend the phase the question lands in.

Before touching any branch locked by a minion worktree: [[feedback_free_worktree_branch_then_switch_in_place]].
