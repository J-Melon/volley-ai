---
name: resolve-scope-ambiguity-with-josh-before-dispatch-never-via-if-x-then-y-in-the-minion-brief
description: "When dispatching an implementer, every scope branch is settled by Josh first; the brief carries a definite scope, not conditional decision trees"
metadata: 
  parent: feedback_what_to_delegate
  node_type: memory
  type: feedback
  originSessionId: 61f585fd-3e13-4f8a-ad0a-30ff3fcd71af
---

When briefing a `gdscript-implementer` (or any author specialist), every scope decision is resolved with Josh before the dispatch goes out. The brief carries a definite scope. Conditional clauses like "if a left wall exists, mirror it; if it doesn't, leave to a follow-up" are scope decisions wearing implementer clothing, and they don't belong in the brief.

**Why:** 2026-05-24 on Anteater #658 revision dispatch. Point 4 of my brief said "check for a left wall mirror; if there isn't one and balls can escape to the left, the issue's spirit calls for symmetry. If a left wall exists, mirror the apex-only sizing; if it doesn't, leave to a follow-up (note in PR body)." Josh: "4 should have asked." Scope branches in a brief mean the minion picks the answer based on partial context; Josh's call goes uncalled.

**How to apply:**

- Read the scope question. If it has more than one defensible answer, it's not a brief question, it's a Josh question.
- Resolve every "if X exists/doesn't exist", "if Y is feasible", "follow-up vs in-PR" branch with Josh before the dispatch.
- The brief reads "do A and B" (definite), not "do A; if B is true also do C, else flag C for follow-up" (decision tree).
- Exception: genuinely deterministic local checks ("if the spatial_audit is clean, push; if not, fix and retry") stay in the brief because they're verification loops, not scope decisions.
- When something turns up mid-implementation that needs a scope call, the minion is briefed to stop and report, not to choose; this is already covered by [[feedback_pause_before_architectural_rework]] and [[feedback_no_cherry_picking]].

Cross-link: [[feedback_decisions_into_design_doc]] (decisions land in the design doc), [[feedback_pause_before_architectural_rework]] (block verdicts go to Josh).
