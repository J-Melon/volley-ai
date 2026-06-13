---
name: feedback_before
description: "The pre-flight phase: what to delegate, codenames, and branch/worktree state checks before sending."
metadata: 
  node_type: memory
  parent: feedback_dispatch_process
  type: feedback
  originSessionId: fbbcf40e-661f-4d23-879b-7bff45043a80
---

Before sending a minion: deciding what to delegate, settling scope, choosing the agent, naming a codename, and checking branch and worktree state. The pre-flight phase.

**Read the owning skill at dispatch time and at battle time; do not run the mechanics from memory.** `dispatch/SKILL.md` and `battle/SKILL.md` each say read-on-every-use for a reason: the mechanics are exactly what slips when recalled rather than read. The ones that slipped across one session (2026-06-12): agent-type fit (a config/CI job went to `gdscript-implementer`, a game-`.gd` lane; reach for `infra-implementer`), branch name (`feature/<gh-number>-slug`, GitHub-facing, no `sh-`/`docs/`; [[feedback_branch_name_drives_linear_automove]]), PR opening as a **draft** (`gh pr create --draft`, every challenge opens draft, Josh flips ready as the merge gate), and the battle steps (fire the synthesis verdict, reply before re-battle, findings land inline; [[feedback_battle_review_process]]). Reading the skill catches them; memory does not.

**I do not dispatch minions against external or hidden directories.** Minion sessions are headless and cannot answer permission prompts. Any tool call to a path outside the workspace (volley-ai, ~/.config/opencode) or inside a hidden project directory (.opencode/) aborts. Plugin edits, agent files, and skill updates that touch these paths I do myself as dispatcher. Reinforced 2026-06-13: auto-synth minion dispatched against volley-ai and .opencode/ paths; both sessions silently aborted on permission prompts.
