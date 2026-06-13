---
name: feedback_swarm_dispatch_tools
description: "How dispatch is issued: the swarm_dispatch / swarm_collect tools. swarm_dispatch fans out N minions {agent, task, label, isolate?} as parallel child sessions and returns at once, so I keep the seat while they run. Codename is assigned at spawn and carried as the child session title. swarm_collect snapshots each minion (done-with-output or running), non-blocking, call again for stragglers. isolate:true gives a WRITER its own worktree; read-only minions and scene work run on the main tree."
metadata:
  node_type: memory
  type: feedback
  parent: feedback_sending
  originSessionId: 5c38e2ca-1705-458d-bc9e-62f52cfa5ec1
---

Dispatch is issued through two tools, and the fan-out is parallel and non-blocking
by design: I send the batch and keep the dispatcher seat while the minions run.

**swarm_dispatch** takes `minions: [{ agent, task, label, isolate? }]` and an
optional `concurrency` (default 5). It spawns each minion as a child session,
fires its brief, and returns immediately with the dispatched list. I do not wait;
I fill the latency with small work ([[feedback_inflight]]) and stay reachable for
Josh. This is the whole of "background by default", parallelism is the mechanism,
not an option I toggle.

**Codenames are carried by the session.** swarm_dispatch picks an unused codename
from the themed pool and sets the child session title to `<Codename> (<agent>):
<label>`, e.g. `Feldspar (code-quality): SH-254`. The title is the handle Josh
tracks and the record of who ran; I read it from the session list. The name lives
with the work, so there is nothing to log by hand.

**swarm_collect** snapshots the minions: each is `done` (with its output) or
`running`. It does not block; I call it again for the ones still running, and I am
woken as they finish. Collecting a done minion consumes its session (it is deleted
so the session list stays clean), so I take what I need from the output. On every
return from a collect I reconcile the plan first ([[feedback_todo_is_the_live_plan]]).

**Isolation is per-minion and writer-scoped.** A write-capable author that needs
its own branch gets `isolate: true`: swarm_dispatch creates a git worktree and a
`feature/<slug>` branch off-root and pins the minion there, so parallel writers
never collide. Read-only minions (reviewers, analysts) run on the main tree, fast
and shared; isolation is pure cost for them. Scene work stays on the main tree too,
GodotIQ is bound to one editor on the main path, so an isolated worktree write to a
`.tscn`/`.tres` would land in main anyway; swarm_dispatch refuses isolate on scene
work and says so. Land a writer's branch as a PR (Josh merges), then swarm_cleanup
removes the worktree once its commits are landed.

**Why:** established 2026-06-13 porting the swarm to OpenCode. The tools give true
parallel fan-out with the dispatcher reachable, the capability the seat needs, and
the plugin-managed worktree fixes the old worktree-inside-main-tree collision risk
by keeping isolation off-root and writer-only. The Claude-era worktree mechanics
(baseRef, .claude/worktrees, the manual branch-naming) are the historical regime
under [[feedback_sending]]; this is the current path.
