---
name: feedback_inflight
description: While the minion runs: let it complete, fill the latency with small work, keep the main worktree branch fixed.
metadata:
  node_type: memory
  parent: feedback_dispatch_process
  type: feedback
---

While the minion runs: let it complete, fill the latency with small work, keep WIP low, keep the main worktree branch fixed.
