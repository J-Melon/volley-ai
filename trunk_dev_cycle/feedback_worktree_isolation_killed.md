---
name: feedback_worktree_isolation_killed
description: "AUTHORITY on the worktree regime (refined 2026-06-01). Gru works in a dispatcher worktree OUTSIDE the project root; serial agents run there, parallel agents get their own (also outside-root) worktrees. The bare main tree at /home/josh/gamedev/volley stays free for Josh to play/Ride. Isolation is the parallelism mechanism, not killed and not the blanket default. Supersedes the 2026-05-31 'isolation killed' framing."
metadata:
  parent: feedback_sending
  node_type: memory
  type: feedback
  originSessionId: 9411911b-5a8f-49cf-b403-486f789e4da3
---

The worktree regime, refined with Josh 2026-06-01. (The 2026-05-31 framing "isolation is KILLED, agents edit the main tree directly" was the symptom-level cut; the real fix is moving worktrees out of root, below. This file is the current authority.)

**The model:**
1. **Gru works in a dispatcher worktree, not the bare main tree.** Serial agents run in that worktree alongside Gru.
2. **All worktrees live OUTSIDE the project root** (a sibling dir, e.g. `../volley-worktrees/`), never under `/home/josh/gamedev/volley`. This kills the original footgun at the source: no worktree aliases into the main tree's `res://`, so no editor LSP "hides a global script class" spam, and no agent-writes-landing-in-the-main-tree path confusion (the thing that misfired Wirt/Greg). No `.gdignore` crutch needed once worktrees are out of root.
3. **Serial vs parallel:** a single (serial) agent runs in Gru's dispatcher worktree. When work goes PARALLEL, each additional concurrent agent gets its OWN outside-root worktree so it does not pin the tree or collide. Isolation is the PARALLELISM mechanism, used when concurrency demands it, not a blanket default and not forbidden.
4. **The bare main tree `/home/josh/gamedev/volley` is Josh's to play/Ride** whenever, because neither Gru nor agents are rooted in it. Resolves the single-occupancy tension: a running agent never pins the tree Josh wants to test in.

**Why this supersedes "killed":** killing isolation made the main tree single-occupancy (one agent blocks all other branch work, and switching its branch yanks the tree from under a running agent). Relocating worktrees out of root gives isolation's benefits (free main tree, non-colliding parallel agents) WITHOUT the in-root aliasing that motivated killing it. Josh: "all worktree should be outside the project if possible to prevent that."

**LOAD-BEARING UNKNOWN (verify before this is fully operational):** does the Claude Code harness support relocating the isolation-worktree base outside the project root? The `worktree` settings block has `symlinkDirectories`, `sparsePaths`, `baseRef`, `bgIsolation`, but a base-PATH key was not confirmed. The Agent tool's `isolation: "worktree"` currently creates `.claude/worktrees/agent-<id>/` under root. If the harness cannot relocate that, the model needs either a manual-worktree pattern (Gru creates the worktree by hand outside root and briefs the agent to cd there, no `isolation:` flag) or a harness-config change. Verify before rewriting the dispatch skill (phase 2, see [[project_worktree_reconciliation_parked]]).

Related: [[feedback_worktree_isolation_dispatch_broken]] (the branch-check gate, still applies), [[feedback_test_run_on_main_tree]], [[feedback_worktree_agents_write_to_main]] (the footgun this prevents), [[project_worktree_reconciliation_parked]] (the deferred skill edit), [[feedback_trunk_based_development]].
