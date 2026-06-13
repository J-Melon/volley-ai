---
name: feedback-feature-pr-decomposition
description: "Greater principle governing how a feature splits into PRs; decompose into the FEWEST independently-shippable PRs, each standing alone on trunk; the one-PR default, the shared-contract <=3 parallel split, and the +1000 line cap are all tactics under this"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 332af565-6013-4f8d-ba02-8c0511478c54
---

How a feature becomes PRs is governed by one principle; the specific rules ([[feedback_trunk_based_development]], [[feedback_pr_size_cap_1000_lines]]) are tactics under it.

**The principle.** A feature decomposes into the FEWEST PRs such that each one is INDEPENDENTLY SHIPPABLE on trunk: it compiles, the full suite is green, and it leaves no half-wired feature, because each PR merges to main on its own. Trunk-independence is the hard invariant. Everything else is minimizing coordination cost under that invariant.

**A PR is ATOMIC and ENTITY-BASED.** This is the boundary axis, complementary to "fewest". Each PR covers ONE coherent entity and the changes that entity entails, not a grab-bag of unrelated edits. Same shape as the rest of the hierarchy: an ISSUE is one behaviour, a PROJECT is one area ([[feedback_projects_linear_scope]]), a PR is one entity. Josh, 2026-06-03: "prs should be atomic and entity based." On a test-suite audit that means a PR PER FILE: the test file plus what auditing it entails (the dead production code it exposes, the doc rule it surfaces) is the entity; that all belongs together, and the next file is a separate PR. "Fewest" stops you over-splitting one entity; "atomic/entity-based" stops you merging several entities into one PR. They compose: the fewest atomic entity-PRs.

**The default is N=1.** One feature, one branch, one PR is the common case, not a separate rule; it is this principle at N=1. Multiple agents/units working that feature are hands on the one branch (fold their commits serially), NOT a PR each. See [[feedback_trunk_based_development]].

**When N>1 is preferred.** If units can be made genuinely independent by landing a shared CONTRACT first (an agreed interface, signal shape, or data resource each unit builds against), splitting into parallel independent PRs is preferred over a serial fold, because it parallelises. BUT only up to **3 PRs**. Past 3, contract churn dominates (every contract revision ripples across all open PRs as re-reviews and rebases), so collapse back to one serial branch. See [[feedback_pr_size_cap_1000_lines]] for the threshold detail.

**What forces N up.** The +1000-added-line cap: when one PR's diff crosses it, split off the remainder as a follow-up (still must be independently shippable, so cut at a clean boundary, never mid-unit). A forced 1->2 split is fine (2 <= 3).

**Decision at dandori, not at fold time.** Count independently-shippable units and decide the split shape before dispatching: 1 (default) / <=3 with a contract (parallel) / serial fold (>3 or no contract). A feature that genuinely cannot be sliced into independently-shippable PRs under 1000 lines each is a planning smell to flag, not a fold-time scramble.

Established 2026-05-30 (SH-437), bubbled up from the per-rule corrections when Josh said the splitting rules "should bubble up to a greater memory."

Related: [[feedback_trunk_based_development]], [[feedback_pr_size_cap_1000_lines]], [[feedback_godot_fold_needs_reimport]].

Instance of the greater principle [[feedback_write_from_the_players_experience]] (name the player outcome, not the parts).
