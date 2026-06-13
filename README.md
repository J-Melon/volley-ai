# volley-ai

Volley's AI-tooling sister repo. The memory graph, agent definitions, skills, plugins, and scripts that the swarm runs on. Held separate from the Godot game repo so the game's tooling and the game's source don't couple.

## Sister repo

This repo is the source of truth for Volley's AI tooling. The game repo (`volley`) holds the Godot project; this sister repo (`volley-ai`) holds everything the swarm runs on. They are separate repos so game source and tooling source don't couple.

At runtime, OpenCode loads from its own config directories, not from this repo. After landing changes here, copy to their runtime homes:

| Source (this repo) | Runtime copy | Loaded by |
|---|---|---|
| `skills/**/SKILL.md` | `~/.config/opencode/skills/<name>/SKILL.md` | Dispatcher and minion agents |
| `plugins/*.js` | `volley/.opencode/plugins/*.js` | opencode server (hot-reload on restart) |
| `agents/*.md` | `volley/.opencode/agents/*.md` | minion agent dispatch |

The runtime copies are **not** the source of truth. Edits go here first, then sync out. A `make sync` (TBD) will automate this direction.

## Structure

- `MEMORY.md` -- the crown. Read at boot; run the lint-graph-edges script, descend the trunks.
- `trunk_*.md` + `trunk_*/` -- the six memory trees. Trunk files are indexes; children live in the matching directory.
- `letters/` -- letters-to-my-next-self, session handoffs.
- `skills/` -- agent skills loaded at dispatch and action time.
- `agents/` -- agent definitions (model, permissions, skill set, prompt).
- `plugins/` -- opencode plugins (tool hooks, event hooks, guards).
- `scripts/` -- operational scripts (memory linting, etc.).
- `scratchpads/` -- research notes and scratch files.

## Plugins

| Plugin | What it does |
|---|---|
| `swarm-dispatch.js` | `swarm_dispatch`, `swarm_cleanup`, `swarm_status`, `swarm_tail` |
| `em-dash.js` | Blocks em dashes and spaced-hyphen prose connectors |
| `review-verdict-guard.js` | Blocks `gh pr review --comment --body` (self-approval trap) |
| `caps.js` | Enforces character caps on Linear bodies and review comments |
| `git-guards.js` | Git safety hooks |
| `injection-guard.js` | Prompt injection defence |
| `pr-state-check.js` | Verifies PR state before asserting |
