---
name: feedback_background_subagents
parent: feedback_sending
description: "Every agent dispatch is background. Never pass run_in_background false; the default is background and overriding it serialises the dispatcher on the minion for no gain. Applies to the Agent tool as well as the swarm tools."
node_type: memory
type: feedback
originSessionId: 95c429e0-5fd5-4072-8290-b32b1739e79e
modified: 2026-07-26T12:20:51.057Z
---

**Always dispatch agents in the background.** The Agent tool defaults to background; never pass
`run_in_background: false`. Blocking the dispatcher on a minion buys nothing, because the report
arrives as a notification either way, and it burns the gap that is capacity for the next piece of
work ([[feedback_fill_dispatch_latency_with_small_work]]).

This holds for parallel research, independent audits, long investigations, and every implementer or
reviewer dispatch. Don't serialise out of habit.

**How to apply:**
- Omit `run_in_background` (or pass `true`). Passing `false` is the error, and there is no case in
  this project that wants it.
- Default to parallel background agents for independent subtasks.
- When several agents must collaborate, give them a shared markdown scratchpad; tell each the path,
  which section it owns, and to read the others before finalising.
- Brief each agent fully (goal, context, constraints, output shape); they start cold
  ([[feedback_agent_prompt_economy]]).
- Verify claimed work by reading the artifacts, not the summary
  ([[feedback_verify_state_by_reading_ground_truth]]).

After dispatch, end the turn ([[feedback_dispatch_first]]) and stay in the dispatcher seat
([[feedback_stay_in_the_dispatcher_seat]]).

Josh, 2026-07-26: "always backgroud agents you should know that", said after I passed
`run_in_background: false` on an implementer dispatch, with this rule already written but orphaned
at the forest root where a dispatch-time descent never reached it.
