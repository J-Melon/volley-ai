---
name: feedback-trunk-based-development
description: Trunk-based is per FEATURE not per agent; one feature = one branch = one PR off main; multiple units/agents are hands on that one branch, not a branch each; dependent FEATURES wait for the dependency to merge
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d1325475-fd0f-4d73-9889-41c0b0763a41
---

Volley follows trunk-based development. Every branch cuts off `main`, and every PR bases on `main`. No stacked PRs, no branch-on-branch.

**Why:** stacked branches create ordering coupling, fragile rebases, and review confusion. Trunk-based keeps each change independently reviewable and mergeable, and keeps `main` the single integration point.

**The unit boundary is the FEATURE, not the agent.** A feature split into units (A foundation, B core, C/D/E leaves) is still ONE branch and ONE PR. The units are agents working that one branch in sequence; each worktree branches off the feature branch's current tip (not main), and the dispatcher fast-forwards each unit's commits onto the feature branch between dispatches. That is NOT stacking and NOT a trunk violation. Do not give each unit its own off-main branch or its own PR; that fragments one reviewable feature into N coupled PRs, which is the opposite of the goal.

The no-stacking / off-main rule applies between SEPARATE FEATURES (separate tickets/missions). One feature's internal decomposition lives on one branch.

**How to apply:**
- Always branch off `main`. Always open PRs against `main`.
- One feature, one branch, one PR. Worktree agents on that feature branch off its tip; merge their commits back serially.
- If FEATURE B depends on FEATURE A, B does NOT start until A is folded/merged to main. Wait for the merge, then cut B off the updated main. Do not stack B on A's branch to "get ahead."
- This also resolves the worktree `baseRef: "fresh"` issue ([[feedback_worktree_isolation_dispatch_broken]]): fresh-off-main is exactly right under trunk-based, so isolated agent dispatches need no workaround once the dependency has merged. The earlier push-then-checkout workaround was treating a symptom of violating trunk-based, not a real need.

Corrected 2026-05-30 after stacking the skills-registration PR on the agent-roster PR. Should have waited for the roster PR to merge first.

Refined 2026-05-30 (SH-437): started dispatching each unit of one feature to its own off-main branch + own PR, reading "off main" as per-agent. Josh: "trunk based means per feature not agent." One multi-unit feature is one branch, many hands.

The "one feature = one PR" default is the N=1 case of the greater principle [[feedback_feature_pr_decomposition]]; see it for when a feature legitimately splits into a few independent PRs (shared contract, <=3).

Related: [[feedback_no_auto_merge_manual_approval]], [[feedback_my_direct_commits_skip_standing_rules]], [[feedback_feature_pr_decomposition]].
