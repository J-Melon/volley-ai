---
name: feedback-worktree-isolation-dispatch-broken
description: "GATE before every repo-editing Agent dispatch: git branch --show-current and match it to the minion's work. baseRef='head' (since 2026-05-30) branches the isolation worktree off the session's CURRENT branch, so a wrong current branch silently stacks work in the wrong place or fences the Edit; broke PRs #802/#805"
metadata: 
  parent: feedback_state_checks
  node_type: memory
  type: feedback
  originSessionId: d1325475-fd0f-4d73-9889-41c0b0763a41
---

**GATE (run every time before any Agent dispatch that edits the repo):** `git -C <repo> branch --show-current` and confirm it is the branch the minion's work belongs on. `baseRef: head` means the isolation worktree branches off whatever the session sits on RIGHT NOW, so a wrong current branch silently stacks the work in the wrong place (or fences an Edit to a wrong-branch worktree). This is a mechanical check, not a judgment call: read the branch, match it to the work, then dispatch. Skipping it is what broke PRs #802/#805 on 2026-05-31. Pairs with the cwd check below (right repo AND right branch).

`~/.claude/settings.json` `"worktree": { "baseRef": "head" }` as of 2026-05-30 (was `fresh`). Josh's call during SH-437, a multi-unit feature where stacking units on one feature branch is the norm.

**What `head` means:** every isolation worktree branches from the SESSION's current HEAD, not main. So an editing agent dispatched while the session sits on a feature branch builds ON TOP OF it automatically; no per-dispatch `git checkout` line needed. To stack units B/C/D/E on a feature branch, just be on that branch when dispatching, then fast-forward each unit's worktree commits back onto the branch serially.

**The footgun flipped.** Under `fresh` the risk was an agent silently landing off main. Under `head` the risk is an agent silently stacking on whatever branch the session happens to sit on. So:
- Before dispatching INDEPENDENT work (a different ticket), be on `main` first, or the worktree stacks on the current feature branch and pollutes the diff.
- The `Agent` PreToolUse hook still FORCES `isolation: worktree` on editing agents; that is unchanged.
- cwd drift still bites: if the session shell cwd has drifted into another git repo (e.g. the memory repo after committing memory), the worktree roots in THAT repo. Confirm cwd is in the intended repo before an Agent dispatch.

**WORKTREE-INSIDE-MAIN-TREE FOOTGUN (seen SH-437 2026-05-31; benign outcome that time, but the risk is real).** Isolation worktrees live at `.claude/worktrees/agent-<id>/`, INSIDE the main tree root. When the session is ALREADY on the target feature branch in the main tree, a `gdscript-implementer` dispatched with `isolation: worktree` did its file writes in the MAIN tree (its worktree stayed empty of the new files) but then committed to the correct feature branch and pushed `3ea3547` to PR #803. So the outcome was correct because the main tree was already on the right branch; the edits, commit, and push all aligned. What made it LOOK broken mid-flight: catching the agent at a snapshot where its new files showed as STAGED in the main tree with the worktree still empty, and `git worktree list` showing a slug branch `worktree-agent-<id>` that later resolved away. The genuine hazard while it runs: a live agent mutating the same tree the dispatcher/Josh occupies is a concurrent-write collision risk. Rule while such an agent is live: do NOT commit/discard/run-suite in the main tree; wait for completion, then hydrate (`gh pr view`, `git log origin/<branch>`, `git status`) and trust ground truth over the mid-flight snapshot AND over the agent's own report. The dangerous version of this (writes hit the main tree while it sits on a DIFFERENT branch than the work belongs on) did not occur here but is the thing the GATE above prevents.

Candidate fixes (verify before applying, do not hand-author blind): (1) move `.claude/worktrees` OUTSIDE the project root (e.g. a sibling `../volley-worktrees/`) so the worktree path cannot alias main-tree paths; this is the structural fix. (2) brief agents to cd into and operate with paths relative to their worktree, and to verify `git rev-parse --show-toplevel` matches the worktree before writing. (3) for an already-checked-out PR branch on the main tree, do NOT dispatch an isolated agent at all (per [[feedback_test_on_main_tree_not_worktree]] and the already-open-PR-branch rule below); the isolation hook blocks the non-isolated dispatch, so the real resolution is to do small edits in-thread or move worktrees out of root so isolation is safe.

**Merge-back pattern (one feature, one branch, one PR):** dispatch each unit from the feature branch, let it commit on its worktree branch, then `git cherry-pick`/fast-forward its commits onto the feature branch between dispatches. See [[feedback_trunk_based_development]]: trunk-based is per FEATURE not per agent.

The old `fresh`-era workaround (push branch, brief agent to `git fetch && git checkout` first) is no longer needed but is still harmless if a brief carries it.

**Fix on an already-open PR branch: do NOT use isolation.** When the work is a change-request fix on an existing open PR, a worktree on that PR branch usually already exists (it shipped the PR). Dispatching `isolation: worktree` from a DIFFERENT current branch makes a NEW worktree off the wrong HEAD, and the agent's Edit is then fenced to that wrong-branch worktree and cannot reach the target files. Seen 2026-05-31: two `general-purpose` refiners dispatched for PRs #802/#805 while the session sat on the essay branch; one (general-purpose, so the isolation hook did not even apply) landed in the right pre-existing worktree by luck, the other got fenced and stalled. The fix landed by editing the existing PR-branch worktree directly in-thread. So: for a fix to an already-checked-out PR branch, edit that existing worktree directly (small mechanical fix in-thread is fine per [[feedback_stay_in_the_dispatcher_seat]]), or `git checkout` that branch in place first. Isolation stays mandatory only for NEW code work on a fresh branch.

Related: [[feedback_trunk_based_development]], [[feedback_godotiq_worktree_isolation]], [[feedback_free_worktree_branch_then_switch_in_place]], [[feedback_my_direct_commits_skip_standing_rules]].
