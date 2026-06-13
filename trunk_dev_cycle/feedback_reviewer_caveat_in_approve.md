---
name: A reviewer's caveat in an approve is a block the organiser weighs
description: "When a reviewer approves but flags a global-mutation, engine-state, or production-vs-test divergence concern as \"advisory\", the caveat downgrades the approve. Orchestrator reads the caveat in the reviewer's report, not just the headline verdict."
metadata: 
  node_type: memory
  parent: feedback_verdict
  type: feedback
  originSessionId: bd0ca049-796f-41c8-a3e7-cb8a0a44ac81
---

A reviewer specialist can approve a PR while flagging a real concern as "advisory, not blocking." When the concern names global mutation, engine-state change, production-vs-test divergence, or any property that affects more than the PR's local diff, the orchestrator must read the caveat as a soft block, not as a footnote on an approval.

The pattern: a reviewer sees the concern, judges it not-blocking-for-this-PR, and approves. The PR ships. The concern lands on main. The cost only surfaces later, in a future divergent test, or in production behaviour that drifts from test behaviour.

**Why:** PR #696 (2026-05-16) bumped `Engine.physics_ticks_per_second = 120` in the GUT pre-run hook. Both Dax (devils-advocate) and Eli (test-coverage) approved. Dax explicitly flagged: "Production / test delta mismatch is real but latent ... worth a future addition to TESTING.md but not a blocker for this PR." The advisory was load-bearing. I (Gru) caught it manually by reading Bex's brief, not by reading the reviewer reports. PR #698 unwound the bump three hours later. The reviewer-approve-with-caveat shape lets the cost ship before anyone notices it.

**How to apply:**
- After every reviewer dispatch, read the **body** of the approve, not just the headline verdict. The verdict is "approve"; the load-bearing claim sits in the prose of the reviewer's report.
- A reviewer caveat that names any of these gets escalated to a soft block: global state mutation, engine config change, autoload-side change, test/production environment divergence, signal contract change, save-format-affecting field, autoload init order. Tell the reviewer to re-verdict as block.
- The orchestrator's pre-merge check: does any reviewer's approve body contain "advisory" or "not blocking" plus one of the escalation triggers? If yes, hold the merge and dispatch a focused devils-advocate on the specific concern, not the whole PR.
- Sharpens `feedback_battle_is_a_confidence_pass`: a confidence pass can still leak under-named blockers via the approve-with-caveat shape. The fix is reading the body, not extending the battle.
- Related: [[feedback_review_findings_live_inline]] (the verdict is the organiser's bot synthesis review; the reviewer's caveat lives in the report to the organiser, not on the PR).
