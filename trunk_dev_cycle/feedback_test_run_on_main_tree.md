---
name: feedback_test_run_on_main_tree
description: "When Josh tests or Rides a PR, the branch runs in his main tree at /home/josh/gamedev/volley. Free worktrees, checkout in place, preflight imports and tests, then hand over."
metadata:
  parent: feedback_test_behaviour
  node_type: memory
  type: feedback
  originSessionId: 9411911b-5a8f-49cf-b403-486f789e4da3
---

When Josh tests or Rides a PR, the branch runs in his main tree at
`/home/josh/gamedev/volley`, the tree his editor is pointed at. A worktree
holding the branch must be freed first so the main tree can claim it.

**How to apply (every test/Ride, in order):**
1. Confirm the branch is clean everywhere (`git status --short` in main tree
   and any worktree on it).
2. If a worktree holds the target branch, free it (`git worktree remove <path>`),
   per [[feedback_free_worktree_branch_then_switch_in_place]].
3. In the main tree: `git checkout <branch>` then `git reset --hard origin/<branch>`
   to land on the PR HEAD.
4. Preflight before handing over: check import sidecars exist
   (`find -name '*.import' | wc -l`; near-empty means cold). If cold, run
   `godot --headless --import --quit`. Then `./scripts/ci/run_gut.sh` and
   confirm green.
5. Tell Josh the tree is ready and what to look at; he drives
   ([[feedback_ride_definition_and_lifecycle]]).

**Worktree-under-root:** Worktrees at `.claude/worktrees/**` sit inside the
project root. Godot scans them and reports "Class X hides a global script class"
for duplicate `class_name` across worktrees. Place a `.gdignore` at
`.claude/.gdignore`; Godot skips any subtree containing it.

This rule covers the dispatcher's test setup hands. Minion dispatch uses
worktree isolation for new code; the main-tree rule is for the surface Josh
plays on.

**Why:** 2026-05-31 Josh was on the essay branch while SH-437 work sat in a
worktree; he saw none of it. Josh: "do that every time we test something."
