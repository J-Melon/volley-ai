---
name: after-committing-in-the-memory-repo-cd-back-to-the-project-root-before-any-agent-dispatch
description: Bash shell state persists across calls; a leftover cd into ~/gamedev/volley-ai poisons worktree-isolated Agent dispatches by basing the worktree off the wrong repo
metadata: 
  parent: feedback_memory_writing
  node_type: memory
  type: feedback
  originSessionId: 56ba4a44-e553-4f5c-bd77-714693445ba7
---

The Bash tool keeps cwd across calls in the same session. When I `cd` into `~/gamedev/volley-ai` to commit a memory file, the shell stays there for every subsequent Bash call **and** for every Agent dispatch that uses `isolation: "worktree"` (the harness bases the worktree on the cwd's repo).

**Why:** Reinforced 2026-05-12 on Operation Squid Launcher. I committed two memory entries with `cd ~/gamedev/volley-ai && git ...`, then dispatched Kevin in worktree isolation. The harness created a worktree off the memory repo, Kevin landed in a directory full of `feedback_*.md` files with no volley code in sight, and correctly refused to act. Cost: one full dispatch turn.

**How to apply:**

- After every `cd ~/gamedev/volley-ai && git ...` block, immediately `cd /home/josh/gamedev/volley` (or the relevant project root) in the same or next Bash call. Confirm with `pwd`.
- Better: use a subshell for memory commits — `( cd ~/gamedev/volley-ai && git add ... && git commit ... )` — so cwd is restored automatically on exit. The current `cd ... && git ...` pattern compounded across calls; a subshell would have prevented this.
- Before any `Agent` call with `isolation: "worktree"`, sanity-check cwd with `pwd` and confirm it's in the project repo whose code the agent will edit.
- If an agent reports "wrong worktree" or "wrong repo", the cause is almost always leftover cwd from a sibling repo (memory, dotfiles, etc.). Reset cwd, don't blame the agent.
