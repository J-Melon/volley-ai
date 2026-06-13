---
name: project_worktree_reconciliation_parked
description: "PARKED work (2026-06-01). Worktree guidance is fragmented across ~20 memories and contradicts the killed-isolation regime in the dispatch skill. Plan agreed: fold a reconciled Worktrees section into .claude/skills/dispatch/SKILL.md, then collapse the redundant memories to index pointers. Skill edit deferred until the SH-437 impl frees the main tree."
metadata: 
  node_type: memory
  type: project
  originSessionId: 9411911b-5a8f-49cf-b403-486f789e4da3
---

Parked reconciliation, agreed with Josh 2026-06-01. Worktree rules live on ~20 memories + the dispatch/dandori skills + swarm-architecture.md, and several now contradict the killed-isolation regime (the dispatch skill still says "Every code-writing minion gets isolation: worktree" at lines 32/73, which is false per [[feedback_worktree_isolation_killed]]).

**Decision:** fold a single reconciled "Worktrees" section into `.claude/skills/dispatch/SKILL.md` (NOT a new skill), then collapse the redundant memories. Lands as its own chore PR off main.

**Done in phase 1 (memory, 2026-06-01):**
- Retired `feedback_prose_minions_share_one_worktree` (its "isolation stays mandatory for code" clause is now false).

**The isolation-forcing hook has TWO copies (correction 2026-06-01):** the GLOBAL one in `~/.claude/settings.json` was unwired earlier this session, BUT the PROJECT one (`.claude/settings.json:21`, pointing at `$CLAUDE_PROJECT_DIR/.claude/hooks/require-editing-agent-isolation.sh`) is STILL WIRED and is what now fires (its EDITING set includes gdscript-implementer, test-author, integration-scenario-author, docs-tender). It was versioned into the repo by PR #805. So a `docs-tender`/implementer dispatch without `isolation: worktree` is still DENIED by the project hook. Retiring/adjusting it is a COMMITTED repo change (the hook script + the project settings wiring), needs its own PR, not a local settings edit. This is part of phase 2: the new regime (worktree allowed-not-mandatory) means the project hook must change from "force isolation" to "warn / allow", or be retired, in lockstep with the dispatch-skill edit. Until then, dispatching editing agents still requires `isolation: worktree`, OR do the edit in-thread (small doc/code) to route around the hook.

**Still to do (phase 2, when the main tree is free of the SH-437 impl):**
- Adjust or retire the PROJECT hook `.claude/hooks/require-editing-agent-isolation.sh` + its `.claude/settings.json` wiring (committed change, own PR) to match the allowed-not-mandatory regime.
- Edit `dispatch/SKILL.md`: flip lines 32, 73, 117-118 from isolation-mandatory to the new regime (main-tree-by-default on the correct branch; the branch-check gate is the safety mechanism; worktree is ALLOWED not default, for parallel same-branch writers or Josh's own work). Scope the branch-naming/cleanup lines to "when you do use a worktree." Add a consolidated Worktrees subsection covering: the branch-check gate, the footguns (worktree-writes-land-in-main, path-outside-root, baseRef=head stacking), free-then-switch, test-on-main-tree, cleanup-per-stage.
- KEEP standalone (live, not collapsed): the two GodotIQ-pinned-to-one-editor memories (`feedback_godotiq_worktree_isolation`, `feedback_godotiq_single_worktree`) are STILL TRUE regardless of isolation default; [[feedback_worktree_isolation_killed]] (regime authority); [[feedback_worktree_isolation_dispatch_broken]] (the gate); [[feedback_test_on_main_tree_not_worktree]]; [[feedback_trunk_based_development]].
- COLLAPSE to one-line index pointers once the skill section exists: the operational/hygiene cluster (free-then-switch, write-to-main footgun, path-outside-root, check-main-after-dispatch, check-worktree-on-terse-report, cleanup-per-stage, my-branches-go-in-a-worktree, checkout-pr-for-playtest, free-branch-before-playtest).

This is reconciliation per [[feedback_rule_reconciliation]], not new rules: every line traces to an existing memory. Delete this note when phase 2 lands.
