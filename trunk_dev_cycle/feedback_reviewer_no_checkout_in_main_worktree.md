---
name: reviewer-agents-must-not-gh-pr-checkout-in-the-main-worktree
description: "Non-isolated reviewer agents share the main worktree. A gh pr checkout from any of them silently switches the main branch and pollutes Josh's editor checkout"
metadata: 
  parent: feedback_sending
  node_type: memory
  type: feedback
  originSessionId: 61f585fd-3e13-4f8a-ad0a-30ff3fcd71af
---

Reviewer agents (code-quality, gdscript-conventions, godot-scene, test-coverage, etc.) are dispatched without `isolation: "worktree"` because they only need to read the diff. That means they share the main worktree's checkout. If any of them runs `gh pr checkout <N>`, the main worktree silently switches to that PR's branch, breaking Josh's editor view and confusing any further investigation.

**Why:** 2026-05-24 during #724 review fan-out. After the four reviewers reported, the main worktree was on `feature/691-692-item-removal` instead of `feature/658-walls-cover-apex-height` (where Josh was inspecting the SoulBound marker in the editor). Comments themselves were all correctly posted on PR #724, but Josh saw the branch mismatch and asked "why did the reviewers of 724 post on main?" The reviewer that switched the branch was likely code-quality (the one that ran a formal `gh pr review` flow); the others used `gh pr diff` which doesn't checkout.

**How to apply:**

- Reviewer briefs must say "use `gh pr diff <N>` only; do NOT `gh pr checkout`." Add to the brief, not just to memory.
- Formal reviews via `gh pr review` work without a checkout when given the PR number and the file paths.
- If a reviewer genuinely needs to read files in the PR's tree (rare), dispatch with `isolation: "worktree"` so the checkout lives inside the agent's worktree.
- After a reviewer fan completes, Gru runs `git status` and `git branch --show-current` before any next action; if the branch differs from the intended one, switch back BEFORE inspecting any diff or editor state.

Cross-link: [[feedback_dont_switch_main_worktree_branch_during_agent_dispatch]] (the general no-switch rule), [[feedback_godotiq_worktree_isolation]] (godotiq follows main worktree).
