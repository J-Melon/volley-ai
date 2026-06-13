---
name: Check out challenge branch in main worktree for Josh's playtest
description: At the end of a challenge, especially one with visual changes, the organiser switches /home/josh/gamedev/volley to the challenge's branch so Josh can playtest before he merges
type: feedback
originSessionId: 60225dfd-277e-4c4b-8ef4-5843bb535764
---
When a swarm-driven challenge reaches the point where it needs Josh's human review, the organiser checks out the challenge branch in the main worktree at `/home/josh/gamedev/volley/` so Josh can launch Godot against the changes and playtest. This matters especially for visual changes (scene edits, UI, animation, anything the player sees) where compilation green says nothing about feel.

**Why:** Agents work in isolated `.claude/worktrees/` or `/tmp/` worktrees; Godot only opens the main workspace path. Without switching the main worktree to the challenge branch, Josh can't playtest without manual `git checkout` gymnastics, which slows the review. Rule given by Josh 2026-04-23.

**How to apply:** after reviewers approve and before narrating "ready for your review":

1. Check the main worktree state. If it is clean (no uncommitted changes, not on a branch with in-flight work), `cd /home/josh/gamedev/volley && git fetch origin && git checkout <pr-branch> && git pull`.
2. If the main worktree is dirty, stop and ask Josh before stashing or switching. Do not silently lose in-progress state.
3. Narrate the switch in the wrap-up: "Main worktree on `<branch>` for playtest." so Josh knows it's ready without opening a terminal.
4. After the challenge merges (or Josh moves on), no need to switch back; the next challenge will switch again, or Josh will check out `main` himself.

Applies every challenge where there is a UI or gameplay surface to feel. For pure backend / CI / docs challenges the switch is optional but cheap.
