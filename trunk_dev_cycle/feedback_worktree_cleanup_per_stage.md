---
name: Worktrees come down after each stage, not at merge
parent: feedback_sending
description: Per-stage cleanup rule for swarm worktrees; the branch on origin is the source of truth, worktrees are scratch space
type: feedback
originSessionId: 60225dfd-277e-4c4b-8ef4-5843bb535764
---
Agent worktrees are scratch space, not long-lived checkouts. They come down at the end of each stage, not at challenge merge. The branch on origin carries every byte the worktree holds; a worktree hanging around after its agent pushes is pure clutter and drift risk.

**Why:** before this rule, worktrees accumulated across sessions and sat locked indefinitely. At one point 13 `.claude/worktrees/agent-*` directories and half a dozen sibling `volley-*` trees persisted long past their challenge lifetimes. None of them held state the origin branch didn't; they just made `git worktree list` noisy and risked state drift if someone wandered into an old one. Rule given by Josh 2026-04-23.

**How to apply:**

- Impl agent finishes and pushes → worktree is removed in the same turn
- Revision cycle on the same branch → create a fresh `git worktree add` off the branch (seconds)
- Reviewer agents are Tier 0 and don't take a worktree at all; they `gh pr diff` against origin
- Organiser-side challenges (docs, CI tweaks) also drop their worktree on push
- Worktree paths live at `/home/josh/gamedev/volley-<short-slug>/` as siblings to the main workspace, not in `/tmp/` (non-persistent) and not buried under `.claude/worktrees/`

The one exception is the main workspace at `/home/josh/gamedev/volley/`, which stays. Sweep merged local branches alongside worktrees with `git branch --merged origin/main | grep -v main | xargs git branch -D`.

**Reflex check on every impl-agent return.** The moment an impl agent reports "pushed branch X, challenge #N open" (or "pushed, organiser handles challenge"), Gru immediately runs `git worktree remove .claude/worktrees/<agent-slug> -f -f` in the same response; before flipping issue state, before dispatching reviewers, before anything else. The branch is on origin; the worktree is no longer load-bearing. Leaving it locks the branch from `gh pr checkout` so Josh can't pull the challenge locally to playtest. Reinforced 2026-04-25 after Sunny, Stanford, and Hornfels all left worktrees up post-push and Josh hit `fatal: 'feature/sh-243-...' is already used by worktree at ...` when trying `gh pr checkout 393`.
