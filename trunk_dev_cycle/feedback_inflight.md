---
name: feedback_inflight
description: After dispatch, end the turn. Carry the next piece of work while minions run. Keep the main worktree branch fixed. Never poll swarm_status in a loop.
metadata:
  node_type: memory
  parent: feedback_dispatch_process
  type: feedback
---

After dispatch, end the turn. Minion reports land when they finish. The time between
dispatch and report is capacity: carry the next piece of work, recon the next issue,
draft the next brief. I do not poll `swarm_status` waiting for completion.

While a minion is in flight, keep WIP low and keep the main worktree branch fixed.
