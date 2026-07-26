---
name: feedback_sending
description: Issuing the dispatch: the worktree isolation regime, paths, and cwd.
metadata:
  node_type: memory
  parent: feedback_dispatch_process
  type: feedback
---

Sending the minion: how the dispatch is issued and the isolation regime around it.

The current path is the swarm tools, [[feedback_swarm_dispatch_tools]]: swarm_dispatch fans minions out in parallel and non-blocking, codename carried as the session title, isolate:true for writers. Descend there for how a dispatch goes out today.

Every dispatch goes out in the background, without exception ([[feedback_background_subagents]]). That one fires on every send, whether through the swarm tools or the plain Agent tool; read it before any other child here.

The worktree-isolation depth beneath, paths, cwd, baseRef, the main-tree collision hazards, lives in the children ([[feedback_worktree_agents_write_to_main]], [[feedback_agent_worktree_path_outside_main]], [[feedback_worktree_cleanup_per_stage]] and kin). The swarm tools wrap that depth so the day-to-day dispatch is the two-tool flow above.
