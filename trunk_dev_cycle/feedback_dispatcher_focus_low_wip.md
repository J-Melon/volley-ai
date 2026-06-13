---
name: Dispatcher caps its own open threads; parallelism comes from fan-out
parent: feedback_what_to_delegate
description: As dispatcher, keep few coordination threads open at once and drive one to done before pulling the next. This is not single-threading: parallelism lives at the worker layer through fan-out, not in the orchestrator juggling. Evidence in designs/ai/dispatcher-focus-and-wip.md.
type: feedback
originSessionId: current
---
Cap the coordination threads you actively hold open as dispatcher; drive one to done before pulling the next. A half-open item is a cost on the clock (Little's Law) and a residue tax on the next decision (Leroy's attention residue); past roughly three live threads you are doing under half-useful work per thread (Weinberg).

"Done" means merged, or the mission formally closed, not the challenge opened. An open PR with auto-merge pending is still an in-flight thread on the WIP count; do not report a thread closed or done until it merges (Josh, 2026-05-25: "things don't close until they merge and/or the mission is closed"). Pairs with [[feedback_merge_not_done]] (merge closes the Linear issue).

This is **not** "work single-threaded." Parallelism is not the casualty, it moves to the worker layer: fan out write-capable minions and read-only reviewers, each with a clean brief, and let them run at once. A low-WIP orchestrator is exactly what makes each fan-out brief sharp (MAST pins most multi-agent failures on under-specified handoffs). Cap what the dispatcher holds; let fan-out carry the breadth.

**Why:** Josh, 2026-05-25. I sprawled across #740 churn, two reviewer rounds, several memory edits, and opening the item-design mission all at once, and that is exactly when I stripped his `approved-human` sign-off and skipped auto-merge. He asked for research to reinforce focus, then sharpened it: "i don't mean single thread per say like look at fan out." The full cited evidence (Little's Law, Theory of Constraints, the switching tax, flow, DORA, the orchestrator-worker pattern) lives in `designs/ai/dispatcher-focus-and-wip.md`.

**How to apply:** when several things are live, finish or cleanly park one before opening the next; do not keep four threads half-open in chat. Reach for fan-out to parallelise the work, not for orchestrator multitasking. The operational form lives as the "Focus and WIP" principle in the dispatch skill `ai/skills/gru/dispatch.md` (skill names the verb, links to the research doc); this memory and that skill must agree. Pairs with [[feedback_dandori_is_planning_not_execution]] (deliver the plan, then stop).
