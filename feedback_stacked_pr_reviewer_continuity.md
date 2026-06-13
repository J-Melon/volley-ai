---
name: Stacked-PR specialist fan-out includes the reviewer who walked the previous step
description: When specialist fan-out runs on a stacked refactor, fan-out for step N includes the reviewer who walked step N-1 so someone has seen the cumulative ownership surface
type: feedback
originSessionId: a39316b3-d98c-4577-97d8-c03dcfbbad89
---
A stacked refactor (multiple PRs into one feature branch, each touching the same surface) becomes a coherent change only when read in sequence. Reviewing each step in isolation misses the cumulative ownership shift across steps; the per-step diffs all look defensible, but the combined surface is where the design either holds or doesn't.

When specialist fan-out runs on a stacked refactor, the fan-out for step N includes the specialist who reviewed step N-1, alongside any new specialists the diff demands. Continuity beats fresh eyes when the question is "does this still hold up across the whole stack."

**Why:** 2026-05-11 Banana Tank debrief. The seven-step `BallReconciler` refactor (#623 to #627, #630 to #631) cleared `approved-human` at each step but had no specialist fan-out across the sequence. Chert ran Battle on PR #608 (the combined squash) and surfaced five findings, four of which were variants of "two systems disagree about which ball is in play" - the cumulative ownership surface. Nobody had walked steps 7.1 to 7.6 in sequence before that.

**How to apply:**

- A stacked refactor: two or more PRs in flight against the same feature branch, each touching an overlapping per-frame / per-tick / per-state ownership surface.
- When specialist fan-out runs on step N, the dispatch brief names the specialist who reviewed step N-1 and includes them in the fan-out alongside the new specialists. The previous reviewer's brief includes a pointer to their own step N-1 review and the question "does step N still hold the design you signed off on at step N-1?"
- If step N-1 had no specialist fan-out (merge-gate only), the continuity rule promotes the first specialist who lands on the stack into the "previous reviewer" role for all subsequent steps. They become the spine of the review.
- For a stack of seven, one consistent specialist across all seven is better than seven fresh reviewers, even if the consistent one is less specialised for each individual diff.
