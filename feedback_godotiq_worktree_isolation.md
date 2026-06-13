---
name: Don't dispatch runtime-verifying agents in worktree isolation
description: godotiq is tied to one running editor pointed at one project_path; an agent in `isolation: "worktree"` cannot reach godotiq running against the main worktree's code, and silent fallbacks defeat the depth-bump rule
type: feedback
originSessionId: 8e3c1cc0-6512-49eb-a2a4-f0b56ee0b39b
---
When dispatching an agent that needs runtime verification (gdscript-implementer, runtime-verifier, root-cause-analyst at tier 2), do not use `isolation: "worktree"`. The godotiq addon runs inside one Godot editor pointed at one `project_path` (the main worktree). An agent in an isolated worktree gets `addon_connected: true` but the editor is running someone else's code; `run(play)` exercises the wrong files and the agent has no way to verify its own changes.

**Why:** SH-332 Pickle Jar refine, kevin dispatch (2026-04-29). Brief used `isolation: "worktree"`. Kevin made the right code changes, then tried to runtime-verify. godotiq was reachable but pointed at the main worktree, not kevin's. Kevin spent ~60 seconds waiting on a 2-second test before being killed. The static-only changes shipped on PR #553 unverified at runtime; reviewers had to do the verification job after the fact.

**How to apply:**
- NOTE: gdscript-implementer normally ships STATIC (no `run(play)`), so it runs in isolation by default ([[feedback_implementer_ships_static_no_runtime_qa]]). This rule bites only for agents that genuinely run runtime tools: `runtime-verifier`, `root-cause-analyst` at tier 2, or an implementer on a rare explicit-runtime brief.
- Such genuinely-runtime agents: dispatch in the **main worktree** (no `isolation`). The godotiq editor points at the main worktree, so an isolated checkout verifies the wrong files. Accept the serialisation; the alternative is shipping unverified.
- Pure read-only specialists (`code-quality`, `gdscript-conventions`, `test-coverage`, `signals-lifecycle`, `godot-scene`, `repetition-reviewer`, `docs-and-writing`) are fine in `isolation: "worktree"` because they don't need runtime.
- If the agent itself detects the project_path mismatch (`editor_context` returns a different path than its working dir), it should abort early with a clear "godotiq points elsewhere" message rather than burning the timeout. Worth wiring into the agent file.
- If parallel dispatching is the goal, parallelise across read-only reviewers in worktrees while the runtime-verifying author works in the main worktree.
