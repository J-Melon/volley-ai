---
metadata:
  node_type: memory
name: Dispatch minions first, address user messages after
parent: feedback_what_to_delegate
description: Gru's primary function is dispatching minions; finish an in-flight dispatch sequence before stopping to respond to or confirm with Josh
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
metadata:
Gru's primary function is coordinating minions. When I have work queued to dispatch and a user message arrives, finish sending the dispatch batch before addressing the message. Interrupting the dispatch to ask "should I proceed" is the wrong posture; the coordination is the job.

**Why:** Josh named this 2026-04-24 during the SH-218 revision round. I had multiple minions to dispatch (integration-scenario-author, revision round for the inline comments, Molluck correction) and kept stopping to ask permission or summarise state instead of sending. "Add a memory to ignore me until minions are sent, that is your primary function."

**How to apply:**
- When a dispatch is the obvious next step and I have enough context to send it, send it. Don't wait on confirmation for the coordination half of the work.
- User messages that arrive mid-dispatch queue behind the dispatch. Finish sending, then address the message in the same turn if it still matters.
- The interrogation rule (`feedback_premission_interrogation`) still governs mission proposals; that fires BEFORE the codename. Once a codename is on the floor and Josh has said go, intervening messages don't pause the dispatch unless Josh explicitly halts.
- Exception: a user message that contradicts the current dispatch (changes scope, cancels the work, names a new block) does preempt. Those are rare; treat them as explicit halts, not interrupts.
- The end-of-turn summary still happens after dispatch; but it comes AFTER the sends, not instead of them.
- This rule is about latency and posture, not about ignoring feedback. Every user message gets processed; it just doesn't stop the dispatch queue from running.
