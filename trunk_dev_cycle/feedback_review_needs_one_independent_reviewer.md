---
name: feedback_review_needs_one_independent_reviewer
description: "Every PR gets at least one INDEPENDENT reviewer before I call it reviewed; me reading my own diff is not a review. Floor means floor: smallness lowers fan-out toward one, never toward zero. FIRES WHEN I am about to call a PR reviewed / hand it to Josh as ready, or ask whether a small change is worth a reviewer."
metadata: 
  node_type: memory
  parent: feedback_battle_review_process
  originSessionId: 750fc386-96f7-4511-a3d3-efe767fb41ba
---

**Every PR gets at least one independent reviewer before I call it reviewed.** The minimum is one, not zero. Reading my own diff and finding it correct is not a review: I wrote it, so I find it coherent, which is [[feedback_self_judgment_is_coherence_not_accuracy]] applied to my own change. An independent reviewer is the external signal that catches what my own reading cannot. "No fan-out" and "spot-check" mean one reviewer at the right depth, not no reviewer; the dispatcher reading the diff first is due diligence before handoff, not the review.

The tell: I am about to tell Josh a PR is "ready" or "yours to merge" having only read it myself, or I ask whether a small change is worth a reviewer. That PR has had zero reviews. Dispatch the one fitting lens first (devils-advocate for a rule-bearing doc, code-quality for small code, docs-and-writing for prose), without asking.

**Floor means floor: smallness lowers the fan toward ONE, never toward zero.** A trivial two-line or dead-code PR is the one-lens case, not the no-reviewer case. The diff's size sets how wide the fan is, never whether there is one. Josh, 2026-06-08: #889 (a dispatch-skill fix) I presented as reviewed off my own reading, "the min is 1 otherwise it is not a review"; then on #901/#902/#903 (small skill and hook PRs) I kept framing the floor as a judgment call on whether the change deserved review, "floor means floor."
