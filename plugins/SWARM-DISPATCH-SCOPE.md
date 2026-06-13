# Scope: background swarm-dispatch plugin for OpenCode

Status: SCOPE for review, not built yet.
Goal: give OpenCode the one capability it lacks natively that the Volley swarm
needs: spawn N subagents in PARALLEL, NON-BLOCKING, with the dispatcher (Gru)
staying reachable, and collect their results back. Drives YOUR 23 volley-ai
agents. No OMO, no second framework.

## Why this, not native task / not OMO

- Native `task` tool: sequential + blocking (issues #14195, #15069). Fails both
  requirements.
- Full OMO: brings its own orchestrator (Sisyphus), 11 agents, 54+ hooks. That
  replaces the bespoke Volley swarm rather than completing it. We want one engine
  part, not a rival framework.
- This plugin: the engine part only. Gru + the 23 agents + the guard plugins stay
  exactly as built.

## API surface (confirmed in @opencode-ai/sdk dist)

- `client.session.create({ body:{ parentID, title }, query:{ directory } })`
  -> a CHILD session linked to the dispatcher. One child = one concurrent minion.
- `client.session.prompt({ path:{id}, body:{ agent, parts:[{type:"text",text}] } })`
  -> drive that child with a named agent (one of the 23) and its brief.
- `client.session.messages({ path:{id} })` -> collect the child's final output.
- `client.session.children({ path:{id} })` -> enumerate a dispatcher's minions.
- `client.session.abort({ path:{id} })` -> cancel a runaway/timed-out minion.
- `event` hook, `session.idle` (properties.sessionID) -> fires when a child
  finishes its turn; the signal to collect + notify the parent.

## Design

A custom TOOL (not just hooks), registered via the plugin `tool` hook, so the
dispatcher invokes it by name. Two tools:

1. `swarm_dispatch({ minions: [{ agent, task, label, isolate?=false }], concurrency=5 })`
   - For each minion: pick a codename. If `isolate:true` (writer), create a git
     worktree + feature branch and pin the child there (see Worktree isolation).
     Else the child runs on the main tree. Create the child session (parentID =
     dispatcher's sessionID, title = `<Codename> (<agent>): <label>`), fire
     session.prompt with the agent + task. Do NOT await completion.
   - Enforce a concurrency cap (default 5, key-based like OMO): queue beyond the
     cap, launch as slots free.
   - Return IMMEDIATELY with the list of {childSessionID, label}. Dispatcher keeps
     working / talking to Josh. THIS is the non-blocking part.
   - Track dispatched children in plugin state (Map: parentID -> [child records]).

2. RESULTS ARE PUSHED, NOT POLLED (supersedes the old swarm_collect tool, removed).
   - When a minion finishes (or times out), it REPORTS BACK to the dispatcher in
     its own voice: reportToDispatcher reads its final message and wakes the
     dispatcher via client.session.prompt (real prompt, so it arrives as an event).
     The dispatcher has no perception of time, so completion must arrive, never be
     polled for. A minion reporting is a system notification, not a nag.
   - The report is retried with backoff if the dispatcher is mid-turn (a swallowed
     failure would silently lose the result). The minion's session is deleted only
     after the report lands; isolate:true records are tombstoned (kept in the map)
     until swarm_cleanup removes their worktree, then evicted.

Plus an `event` handler on `session.idle`: when a child (one whose parentID is a
known dispatcher) goes idle, mark it done in plugin state. Optionally re-inject a
one-line "minion <label> finished" notice into the parent via session.prompt with
a noReply/system part, so Gru is woken to collect (the ParentWakeNotifier idea,
but minimal). Batch sibling completions to avoid spamming the parent.

## Codenames (BETTER than the Claude setup)

Under Claude, the harness named isolated worktrees `agent-<hash>` (opaque junk),
so dispatch kept a codename LOG (agent-codenames.tsv) to map hash -> codename
after the fact. That ritual existed only to recover readability.

Here the plugin controls session.create, so it does it RIGHT at spawn:
- At dispatch, pick an UNUSED codename from the themed pool (Gravity Falls,
  Hitchhiker's, Oddworld, Omori, Outer Wilds [Hearthians + Nomai], Martha).
- Set the child session TITLE to `<Codename> (<agent-role>): <task-label>`,
  e.g. `Feldspar (code-quality): SH-254`. So session.children and the TUI show
  readable names natively, no hash, no after-the-fact log.
- Track in-flight codenames per dispatcher; do not reuse until the minion frees.
  Pool exhausted within one fan-out -> fall back to `<role> #<n>` (do not
  auto-invent names; keep the curated pool curated).
- RETIRE agent-codenames.tsv and the codename-log step from the dispatch skill.
  Titles are the record now. (The tsv is already empty.)

## Worktree isolation (opt-in, writers only) , BUILD

Recreates Claude's `isolation: "worktree"` so parallel write-capable minions do
not clobber each other. Buildable because the plugin has `$` (Bun shell) and
controls each child's `directory`.

Per write-capable minion dispatched with `isolate: true`:
1. `git -C /home/josh/gamedev/volley worktree add ../volley-<codename> -b
   feature/<gh-number>-<slug>` , a real worktree + feature branch (branch name
   follows the dispatch rule: GitHub number, not SH-N).
2. Pin the child session `directory` to `../volley-<codename>` so its file tools
   resolve there.
3. Track {codename, worktreePath, branch, childSessionID} in plugin state.
4. On minion completion: leave the worktree for the dispatcher to inspect/land
   (the minion commits on its branch; landing = PR, the maintainer merges). The
   plugin does NOT auto-merge (respects block-pr-merge).
5. Cleanup: `git worktree remove` after the branch is landed/abandoned , a
   `swarm_cleanup` tool or on dispatcher teardown. Never auto-remove an unmerged
   worktree with uncommitted work.

HARD RULES:
- DEFAULT is NO isolation. Read-only minions (reviewers, analysts) NEVER get a
  worktree , it is pure cost for them. Only `isolate: true` writers do.
- GODOTIQ SCENE WORK IS EXCLUDED. Per feedback_godotiq_single_worktree: GodotIQ
  is bound to ONE editor instance on the main project path. A minion in a side
  worktree that calls node_ops / save_scene / build_scene writes to the MAIN
  tree regardless of its worktree , isolation is a LIE for scene work. So:
  worktree-isolated minions may touch .gd and plain files ONLY. Any minion whose
  task involves .tscn/.tres/scene authoring must run SERIAL on the main tree
  (one at a time, GodotIQ pinned there). The plugin refuses isolate:true for an
  agent in the godotiq/scene lane (gdscript-implementer doing scene work),
  surfacing the reason.
- LFS: worktrees share .git/lfs; verify LFS-tracked asset writes behave before
  relying on isolated minions touching assets/. Until verified, isolated minions
  stay off LFS paths.

## Concurrency + safety (mirror the rules dispatch already encodes)

- Default cap 5 concurrent; configurable.
- Spawn-depth guard: refuse if the caller is itself a child more than N deep
  (prevents minion-spawns-minion runaway). Read parentID chain via session.get.
- Per-minion timeout: if a child exceeds T seconds, session.abort it and mark
  failed (addresses issue #15080, native task has no timeout).
- File-split discipline stays the DISPATCHER's job (the dispatch skill rule:
  non-overlapping paths for write-capable minions). The plugin does not enforce
  file isolation; OpenCode has no worktree-per-subagent, so parallel WRITERS to
  overlapping paths is unsafe. => default guidance: parallel for READ-ONLY minions
  (reviewers, analysts); serialise write-capable authors, OR dispatch each to a
  distinct directory. THIS IS THE KEY DIFFERENCE FROM CLAUDE (which had
  isolation:worktree). Flag loudly in the dispatch skill rewrite.

## What this unblocks

- The deferred `dispatch` skill can finally be rewritten on top of these tools:
  "fan out reviewers in parallel via swarm_dispatch, keep working, collect."
- require-background-agent's intent returns (dispatch is non-blocking by default).

## Probe results (verified against the live server)

- VERIFIED: session.create with parentID makes a child; session.children lists
  it under the parent.
- VERIFIED: session.prompt `agent` field accepts our .opencode/agents ids
  (ran a child as `code-quality`, it loaded that role + AGENTS.md).
- VERIFIED: `?directory=/home/josh/gamedev/volley` pins the child to the project
  (child saw AGENTS.md / the volley tree, so it sees the symlinked agents/skills).
- VERIFIED: dispatch is non-blocking , a prompt POST returns immediately and the
  parent can query session state while a minion is mid-run (dispatcher reachable).

## Still to verify during build

1. Wake-the-parent: does session.prompt into the parent mid-turn behave, or must
   we wait for parent idle? Test before relying on auto-wake (fall back to
   swarm_collect polling if mid-turn injection misbehaves).
2. True concurrency vs server-side queue: confirm 2+ children spawned together
   actually run in parallel (not serialized by the server), and find the real
   concurrency ceiling.
3. WORKTREE ISOLATION: confirmed ABSENT in OpenCode (no per-subagent worktree).
   => write-safety rule for the dispatch rewrite: parallel for READ-ONLY minions
   (reviewers/analysts) is safe; write-capable authors must be serialized OR each
   pinned to a distinct directory. This is THE behavior gap from the Claude swarm.
