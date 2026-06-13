---
name: feedback_test_on_main_tree_not_worktree
description: "When Josh tests/Rides a PR, check the branch out in HIS main tree (/home/josh/gamedev/volley), freeing any worktree that holds it, so he plays in his normal editor. Never leave the work in a worktree he has to find. Preflight imports + green suite before handing it over."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9411911b-5a8f-49cf-b403-486f789e4da3
---

When Josh is going to test or Ride a PR, the branch must be live in HIS main tree at `/home/josh/gamedev/volley`, not staged in a `.claude/worktrees/<slug>` worktree he has to remember to open. He plays in the editor pointed at the main tree; if the branch sits in a worktree, he ends up testing whatever branch the main tree happens to be on (on 2026-05-31 he was on the essay branch the whole time while the SH-437 work sat in a worktree, so he saw none of it).

**Why:** Josh said "do that every time we test something" after I freed the sh-437 worktree and checked the feature branch out in his main tree in place. The worktree-and-go-find-it pattern is dispatch ergonomics, not test ergonomics.

**How to apply (every test/Ride, in order):**
1. Confirm the branch is clean everywhere (`git status --short` in main tree AND any worktree on it).
2. If a worktree holds the target branch, free it first (`git worktree remove <path>`), per [[feedback_free_worktree_branch_then_switch_in_place]].
3. In the main tree: `git checkout <branch>` then `git reset --hard origin/<branch>` to land on the PR HEAD.
4. Preflight before handing over: check import sidecars exist (`find -name '*.import' | wc -l`; a near-empty count means cold). If cold, run `godot --headless --import --quit` once (the cold-worktree parse-error cascade is import-not-run, not a real break, per the godot-quirks note). Then run `./scripts/ci/run_gut.sh` and confirm green.
5. Tell Josh the tree is ready and what to look at; he drives (Tier-2 runtime is his, [[feedback_ride_definition_and_lifecycle]]).

**Worktree-under-root gotcha (the cost of this rule):** the worktrees live at `.claude/worktrees/**`, INSIDE the project root. When the editor opens on the main tree, Godot's filesystem and LSP scan those sibling worktrees as part of `res://` and report "Class X hides a global script class" for every duplicate `class_name` across all worktrees (can be hundreds of lines). It is editor noise, not a real break (game runs, suite green). The fix is a single empty `.gdignore` at `.claude/.gdignore` (NOT just `.claude/worktrees/`; the whole `.claude/` tree is tooling, no game content, nothing references `res://.claude`, so ignore all of it). Godot skips any subtree containing a `.gdignore`. It is read at filesystem scan, so an already-open editor needs a restart or Project > Reload Current Project to pick it up. `.claude/` is git-ignored, so the file is local-only; if it goes missing the errors return.

This applies to the dispatcher's own setup hands. It does NOT change minion dispatch: implementers still get `isolation: worktree` for NEW code. The main-tree rule is for the TEST surface Josh plays on, not the authoring surface.

Relates to [[feedback_free_worktree_branch_then_switch_in_place]], [[feedback_worktree_isolation_dispatch_broken]], [[feedback_ride_definition_and_lifecycle]].
