---
name: agent-worktrees-must-live-outside-the-main-worktree-path-not-under-claude-worktrees
description: "When dispatching an agent with `isolation: worktree`, the worktree path defaults to `.claude/worktrees/agent-<id>/` INSIDE the main worktree. That path puts the agent's checkout inside Godot's res:// scope, and the editor's filesystem watcher can side-effect deletions from the agent worktree onto the main worktree's working tree. Before `git add -A` in the main worktree after an isolated agent has worked, diff against HEAD and verify nothing the agent did has bled in. Triggers any time `git add -A` runs in the main worktree while an isolated agent has produced file deletions."
metadata: 
  parent: feedback_sending
  node_type: memory
  type: feedback
  originSessionId: 9066ef19-7b82-42a7-aaa1-b62fb15b6ebb
---

`isolation: worktree` on the Agent tool creates a git worktree at `.claude/worktrees/agent-<id>/`, which sits INSIDE the main worktree's directory tree. Each git worktree has its own working files in theory, but Godot's editor (running in the main worktree) scans `res://` recursively and its filesystem watcher can register changes that happened in the nested worktree's files. The visible symptom is that a `git add -A` in the main worktree picks up deletions or modifications the agent made in its isolated worktree, and they ride into a commit on the main branch unintentionally.

SH-405 incident 2026-05-16: I dispatched Dipper (gdscript-implementer) in an isolated worktree at `.claude/worktrees/agent-a28ba9046875baf58/` to trim integration tests on PR #689. While Dipper was working there, I edited timeout_controller.gd in the main worktree on SH-405. `git add -A` after my edits picked up Dipper's 9 file deletions from the nested worktree path and bundled them into ed44822 on SH-405. Pushed before I noticed; had to restore from the previous SH-405 commit in f32246a.

## How to apply

- Before `git add -A` in the main worktree while ANY agent dispatched with `isolation: worktree` is in flight, run `git status` and verify the file list matches what I intentionally edited. If the list includes files the agent owns, the bleed has happened; restore them from the parent commit before committing.
- Prefer `git add <specific paths>` over `git add -A` when an isolated agent is running concurrently; the explicit path list cannot bleed.
- After an isolated agent completes, before committing anything in the main worktree, diff `git status` against the change set I expect. If a file appears that I did not touch, restore it from HEAD before staging.
- The agent's isolated worktree itself is fine; the bug is in the main worktree's view of the file system. The agent's own commits land on the agent's branch correctly.

## Adjacent rules

- [[godotiq-tied-to-one-worktree]]: godotiq follows the main worktree's editor, not the isolated agent's worktree. Symptom-adjacent but distinct.
- [[never-switch-the-main-worktree-branch-while-an-implementer-is-running-in-it]]: don't change the main worktree's branch mid-dispatch. This rule covers a different failure mode of the same nested-worktree topology.

Reinforced 2026-05-16: ed44822 → f32246a recovery on SH-405.
