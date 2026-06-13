---
name: spike-is-issue-ready
description: "A design spike contains every piece of information needed to file the follow-up issues from it. Vocabulary, scope splits, ACs, preconditions all live in the spike, not deferred."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 548aa536-fe91-42d7-b688-9e6eb7698571
---

A spike's job is to leave the next person able to file the follow-up issues from it without going back to ask a question. Owner picks, vocabulary, scope splits between slices, acceptance criteria for each slice, technical preconditions, dependency order: all live in the spike. Anything deferred ("bikeshed later", "TBD in the migration", "left to implementation") is a hole in the spike, not a feature of it.

**Why:** Josh, PR #710 (SH-378 ball state ownership spike), 2026-05-17: the spike picked ItemManager as settledical owner but carved naming out as "bikeshed later". Josh flagged it. Sharpened 2026-05-19: "spikes should contain all info required to make issues from." The earlier framing scoped the rule to naming; the actual principle is broader. A spike that requires the next person to invent vocabulary, AC, or scope shape failed at its job. Issue-ready means a person who has not lived through the spike can read it and file the migration tickets without a follow-up question.

**How to apply:**

Spike dispatch briefs name "issue-ready" as the deliverable shape:
- **Owner pick** with rationale.
- **Vocabulary.** The standard names for every entity, field, signal, and overlay the spike touches. Old names map to new names; deprecated names are named.
- **Scope splits.** The migration broken into independently shippable slices, each consistent against current main.
- **Acceptance criteria per slice.** What proves the slice landed: a behavioural check, a state assertion, a save-format invariant. Not "make it work."
- **Preconditions and dependencies.** Save-format bumps, autoload ordering, signal-wiring changes that have to land first.
- **Out-of-scope, with reasons.** "Renaming all call sites is migration work, not spike work" is fine. "Bikeshed later" is not.

**Reviewer brief.** Docs reviewers and design-doc reviewers on spike PRs check the spike against this list. A spike that defers any of these items is blocked with a concrete-consequence finding ("the migration ticket cannot be filed without this"). Bind the rule at the reviewer surface, not only the author's. Related: [[reviewers-no-low-value-findings]], [[confirm-before-tickets]] (the spike is the source of truth that backlog shape draws from).

**Out-of-scope sections** on spike docs name what is out of scope for the spike's deliverable, not what is deferred for "later thinking." If a decision is genuinely deferred (needs a player-research call, needs benchmarking), the spike says so explicitly with the reason.
