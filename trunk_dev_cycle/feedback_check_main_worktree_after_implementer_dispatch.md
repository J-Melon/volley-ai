---
name: After implementer dispatch, sweep the main worktree for resource damage
parent: feedback_on_return
description: gdscript-implementer minions in worktrees can trigger Godot import side-effects that re-write `.tres` / `.import` / `.uid` files in the main worktree with default values. Always `git status` the main worktree and revert any unintended resource changes before the next dispatch or report.
type: feedback
originSessionId: 8cc342c4-0faf-4b52-b150-75abb72d8fcd
---
`gdscript-implementer` minions work in `.claude/worktrees/...` checkouts, but Godot's resource cache is shared at the project level. Opening Godot in any worktree can re-import / re-save `.tres` files and stamp default-valued shape into the main worktree's working tree. Real example: `resources/ball/rest.tres` had its UID swapped and the `friction = 1.0` + `bounce = 0.0` body stripped after a step-5 dispatch.

**Why this is dangerous:** the damaged file is unstaged in the main worktree. If a later commit picks it up via `git add -A` or `git commit -a`, broken physics ships into the next PR. Refactor-stack PRs especially: a damaged `.tres` in the main worktree gets carried forward each time you `git add` near the working set.

**How to apply:**

- After every implementer task returns, run `git status --short` in the main worktree before doing anything else.
- For any unexpected change to `.tres`, `.import`, `.uid`, or any `resources/**` file, `git diff` it. If it strips fields or swaps UIDs, `git checkout HEAD -- <path>`.
- Audit refactor branches for the same pattern: `git log main..<branch> -- '*.tres' '*.import' 'resources/'` to confirm none of the branches committed similar damage.
- If `git checkout` is blocked by a missing-hook error (`align_branch_prefix.sh: No such file or directory`), the checkout still completed; the post-checkout hook is what failed. Verify with `git status --short`.
- This applies even when the implementer claims it did not touch resources. The Godot import pipeline runs whenever the editor inspects a scene that references the resource.
