---
name: feedback_on_return
description: When the minion returns: check the worktree, catch a terse or aborted report.
metadata:
  node_type: memory
  parent: feedback_dispatch_process
  type: feedback
---

When the minion returns: check the main worktree for side-effects, catch a terse or aborted report, confirm a tier-2 minion actually verified.
