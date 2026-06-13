---
name: feedback_inflight
description: While the minion runs: don't interrupt, fill the latency, leave the main branch alone.
metadata:
  node_type: memory
  parent: feedback_dispatch_process
  type: feedback
---

While the minion runs: do not interrupt, fill the latency with small work, keep WIP low, leave the main worktree branch alone.
