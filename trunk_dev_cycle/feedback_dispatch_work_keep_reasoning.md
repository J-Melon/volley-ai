---
name: Dispatch work whose value is the work; keep work whose value is the reasoning
description: "The axis for in-thread vs dispatch (supersedes the old 'delegate every single-file Edit'). DISPATCH when value is the WORK: volume of writing, investigation depth, parallel coverage, bulk filing, a multi-file sweep. KEEP in-thread when value is the REASONING: a judgment I have already made (a located one-test deletion, a specified one-line fix), or one that must stay in one head (a test refactor's keep/cut/rewrite). FIRES WHEN about to Edit/Write OR about to dispatch; ask 'is the value here work or reasoning?'"
metadata: 
  parent: feedback_what_to_delegate
  node_type: memory
  type: feedback
  originSessionId: 8ccd039c-e27c-4f2f-888a-5678ecd02dfd
---

The axis for in-thread-vs-dispatch is **what the value of the task is**, not its file count or whether it's code:

- **Dispatch when the value is the WORK.** Volume of writing, depth of investigation, parallel coverage, bulk filing, a multi-file vocabulary/policy sweep, authoring genuinely new test coverage from a spec. A sub-agent does one job cleanly, reports back, and keeps the main thread (Josh's interface) clear. Background, self-contained, no mid-flight Josh input.
- **Keep in-thread when the value is the REASONING.** Two cases: (1) a judgment I have ALREADY made this thread, a located one-test deletion, a specified one-line fix, a coordinate swap, where the reasoning is done and only a trivial edit remains; dispatching a cold agent (worktree, merge, push, tens of thousands of tokens) to apply a change I fully specified is pure ceremony. (2) a judgment that must stay in ONE head, a test refactor's keep/cut/rewrite per case, where a cold agent gets the mechanical "delete function X" but loses the WHY and its next call drifts.

**Test refactors are the sharpest reasoning-value case.** Deciding which test stays, which is brittle, what behaviour a test should assert, is the whole value; the editing is a line. Do the reasoning AND the edits myself. Only fan out test *authoring* of new coverage where the behaviour is specified and the writing is the bulk.

**Why:** this rule used to be "delegate readily": before any Edit, run the delegation check; route even single-file tightening passes to a minion. That framing over-delegated, and the cost showed when it pulled me to dispatch a whole implementer to delete one absence-test I had already located and justified, ceremony with no work-value, and for a test refactor the reasoning fragments across the handoff. The original concern was real but narrower than the old wording: when MULTIPLE threads are live, don't juggle bulk side-tasks in the main thread, delegate the self-contained ones. That core is kept; the "every single-file Edit is a delegation candidate" generalisation was the drift, and it contradicted the newer rules that idle latency is capacity for small as-we-go work ([[feedback_fill_dispatch_latency_with_small_work]]) and that a small reasoned edit is mine to execute ([[feedback_only_surface_blocking_issues]]). Josh 2026-06-04: "small work you do personally, this is important in test refactors as it needs a high level of reasoning."

**How to apply:**
- At Edit/Write reach OR dispatch reach, ask: is the value here the WORK (volume, investigation, parallel coverage) or the REASONING (already done, or must stay in one head)? Work dispatches; reasoning stays.
- Self-contained bulk still delegates: a multi-doc vocabulary/policy sweep is `docs-tender`; a batch of several issues is `issue-writer`; new test coverage from a spec is `test-author`; broad investigation is the analyst. Drafting a long artefact inline (a doc section, several issue bodies) is doing the work, route it.
- A single targeted edit I have already reasoned out is NOT a delegation candidate; it is mine in-thread.
- **Making the decision does not make the writing mine.** "Josh settled the call, so I'll execute it" is a trap when the execution is bulk: consolidating a memory cluster into a skill, drafting a long SKILL.md, a multi-file policy sweep. The decision being mine (reasoning) and the authoring being dispatchable (work) are independent. Keep the decision and the gated-diff handoff in my seat; dispatch the read-cluster-and-write-the-artefact volume to `docs-tender`. Josh 2026-06-06: I hand-authored the whole `pr` skill merge (read 5 memories, wrote ~80 lines, generated the rename diff) in-thread after Josh decided to merge it; that was a multi-doc policy sweep and belonged in a minion. The doc amendment that same turn (folding three specified battle findings into a doc) WAS correctly mine, the resolutions were reasoning already done. The separating test: would a cold agent need a fresh judgment (keep it) or just execute specified volume (dispatch it)?
- Every dispatched sub-agent runs background ([[feedback_agents_default_background]]); the reviewer fires before push, not after.

Related: [[feedback_stay_in_the_dispatcher_seat]] (don't grind code investigation myself; its docs and targeted-edit exceptions point here), [[feedback_fill_dispatch_latency_with_small_work]], [[feedback_only_surface_blocking_issues]], [[feedback_dispatcher_focus_low_wip]].
