---
name: worktree-isolated-agents-often-write-to-the-main-worktree-not-their-branch
description: "An agent dispatched with isolation:worktree has its shell cwd reset to /home/josh between tool calls and its file tools resolve against the main repo, so its Write/Edit land in the main worktree (Josh's tree), not its branch. It copies the work into its worktree and commits there (the PR is fine), but leaves stray edits in the main tree. For file work that must land on a specific existing branch, do it in-thread."
metadata: 
  parent: feedback_sending
  node_type: memory
  type: feedback
  originSessionId: ae4574cd-5510-4d8e-a141-ad6eede15c87
---

With `isolation: worktree`, the harness creates the agent's worktree but the agent does not stay anchored in it: its shell cwd resets to `/home/josh` between tool calls, and its file tools resolve paths against the main repo (`/home/josh/gamedev/volley`). So its `Write`/`Edit` write into the MAIN worktree (Josh's current branch), not the agent's branch. The agent typically notices, copies its work into its real worktree, and commits there, so the PR is correct, but it leaves stray uncommitted edits in the main worktree.

Distinct from [[feedback_agent_worktree_path_outside_main]]: that is Godot's filesystem watcher plus `git add -A` pulling the nested worktree's changes into main. This one is the agent writing main-tree absolute paths directly because of the cwd anchor. Recurred 2026-05-25 with Soos (#746 levitation) and Pacifica (the starter-items tech spike).

**How to apply:**
- For file work that must land on a SPECIFIC existing branch (adding to an open PR, e.g. #745), do it in-thread in the correct worktree. A worktree-isolated agent cannot reliably target an existing branch's worktree, and forcing two worktrees on one branch is its own mess.
- After ANY worktree-isolated agent finishes, run `git -C /home/josh/gamedev/volley status` and clean strays with explicit paths (`git restore <path>`, `rm <stray>`), never `git add -A`.
- Brief fan-out agents to use their worktree's absolute path, but still verify and clean the main tree after; the brief alone has not been enough.
