---
name: GodotIQ is tied to one running Godot editor
description: GodotIQ MCP is an addon inside one running Godot editor, whose project_path is fixed to a single worktree. Side-worktree missions cannot use GodotIQ writes without contaminating the pinned worktree.
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
GodotIQ is not a worktree-aware tool. It's an addon running inside one Godot editor instance, and that editor's `project_path` is fixed to a single worktree (currently `/home/josh/gamedev/volley/`, the main one). Verified via `godotiq_editor_context` on 2026-04-24.

**What this means in practice:** a sub-agent dispatched into `/home/josh/gamedev/volley-sh98/` (or any side worktree) that calls `script_ops`, `node_ops`, `save_scene`, etc. writes into the *main* worktree, not the side worktree the agent thinks it is working in. Chert hit this on SH-98 on 2026-04-24; strays ended up in `/home/josh/gamedev/volley/scripts/core/` and needed organiser cleanup.

**Open question Josh needs to answer, not memory:** what's the preferred shape for parallel Godot-touching missions? Candidates:
- Sequential: only one Challenge at a time that needs Godot work; it runs in the main worktree.
- Parallel, one using Godot: main-worktree Challenge uses GodotIQ; side-worktree Challenges use raw Read/Edit/Write and accept the `feedback_tscn_editing` friction.
- Parallel Godot editors: run a Godot editor per worktree; GodotIQ connection logic would need to handle multiple editors.
- Don't parallelise Godot missions: docs/test-only missions parallelise freely; gameplay features serialise.

Until Josh picks, don't default to any specific workaround in dispatch briefs.

**Minimal fact to apply in the meantime:** before briefing a sub-agent to work in a side worktree on Godot code, flag the GodotIQ limitation to Josh and ask how to proceed. Do not invent a workaround.
