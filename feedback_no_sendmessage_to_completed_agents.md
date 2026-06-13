---
name: feedback_no_sendmessage_to_completed_agents
description: "SendMessage cannot continue a COMPLETED agent (and is often not even an available tool this session). A finished agent's context is gone; to do follow-up work, dispatch a FRESH agent with the needed context, or do small fixes in-thread. Stop rediscovering this."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9411911b-5a8f-49cf-b403-486f789e4da3
---

A completed background agent CANNOT be continued. SendMessage targets a still-running agent; once an agent reports done, its context is gone and there is no resuming it. In this session SendMessage is not even a loaded tool. Josh, 2026-06-01: "you keep rediscovering that" - I have hit this multiple times (tried to continue Lincoln for the SH-437 refine, tried again for the review fixes) and keep relearning it mid-task.

**The rule:**
- Do NOT plan to "SendMessage the agent back" for a follow-up once it has completed. That path does not exist.
- For follow-up on finished work, the options are: (a) dispatch a FRESH agent, briefed with the context it needs (it starts cold, so the brief carries the relevant findings/SHAs); or (b) if the follow-up is small and mechanical, do it in-thread (per [[feedback_stay_in_the_dispatcher_seat]]: small mechanical fixes in-thread are fine).
- When weighing fresh-dispatch vs in-thread for review fixes: a cold agent needs the full finding set re-briefed, so for a handful of precise, reviewer-specified edits, in-thread is often cheaper than the cold-start brief. That is a judgment call, but it is NOT "continue the agent" because that is not possible.
- Re-review after a fix is always a FRESH reviewer dispatch on the incremental, never a continuation of the original reviewer.

Pairs with [[feedback_approve_is_the_rebattle_verdict]] (the re-review is a fresh dispatch) and [[feedback_agent_prompt_economy]] (fresh dispatch means paying the brief cost).
