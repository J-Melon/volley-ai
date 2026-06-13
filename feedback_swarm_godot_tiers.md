---
name: Swarm agents respect the Godot session-tier elevation system
description: every swarm agent declares a tier ceiling; Tier 0 default, Tier 1 needs worktree isolation, Tier 2 needs RUNTIME REQUEST + Josh approval; the organiser refuses to elevate without the right signal
type: feedback
originSessionId: 608651d3-3b61-4b71-9a83-894f4e86b346
---
The godot session-tier system (documented in `ai/PARALLEL.md`) applies to the swarm too. Every agent declares a tier ceiling in its `.claude/agents/*.md` frontmatter or preamble, and the organiser respects it.

**Tier 0 (static/headless).** Default. `run_gut.sh`, `validate`, `file_context`, `signal_map`, `impact_check`, grep/read, `.gd` edits that don't touch scene files. Fully parallel. No editor needed. Most swarm agents live here: issue-writer, pr-describer, docs-tender, design-doc-reader, researcher, root-cause-analyst, refactor-planner (analysis-only), save-format-warden, supply-chain-scout, devils-advocate, and every existing reviewer.

**Tier 1 (scene edits).** `node_ops`, `build_scene`, `save_scene`, `placement`, `scene_map`, `spatial_audit`. Agents must dispatch with `isolation: "worktree"`. Parallelism through separate worktrees. Agents currently touching Tier 1: integration-scenario-author (when tests stage scenes), test-author (rare, only if test fixtures need scene edits), refactor-planner (when the plan itself edits scenes rather than only analysing).

**Tier 2 (runtime).** `run(play)`, `state_inspect`, `verify_motion`, `screenshot`, `input`, `ui_map`, `perf_snapshot`. By request only. Agent must file a `RUNTIME REQUEST` per the PARALLEL.md format and wait for Josh to answer before calling `run(play)`. No swarm agent currently has a Tier 2 ceiling; the runtime-verifier role was cut because Josh does play-testing. If a Tier 2 operation is needed, the organiser asks Josh directly rather than dispatching an agent.

**Why:** tier discipline prevents parallel scene-edit collisions, keeps the editor stable, and holds the line on Josh-does-play-testing. Elevation is explicit and auditable; accidental Tier 2 would consume editor time and violate the no-playtest rule. Flagged 2026-04-21.

**How to apply:**
- Every `.claude/agents/*.md` body includes a **Session tier** line stating its ceiling: `Tier 0`, `Tier 0 (may escalate to Tier 1 with worktree for X)`, or `Tier 2 (requires RUNTIME REQUEST)`.
- Organiser picks the dispatch tier from the task, never the agent. An integration-scenario-author invoked for a pure signal-chain test stays at Tier 0; the same agent writing a scene-fixture test escalates to Tier 1 with a worktree.
- Tier 2 is never spawned by the swarm without a `RUNTIME REQUEST` in the board and Josh's explicit "yes".
- The `designs/process/ticket-writing.md` and existing `ai/PARALLEL.md` remain the primary tier spec; the swarm README cites them rather than re-defining.
