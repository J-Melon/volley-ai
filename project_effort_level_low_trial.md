---
name: project_effort_level_low_trial
description: trialling effortLevel=low (was medium) from 2026-05-29; track whether low is fast enough and whether it overcommits without grounding
metadata: 
  node_type: memory
  type: project
  originSessionId: 19cf16f4-8427-4e43-ad3f-a2b07defe551
---

On 2026-05-29 Josh switched `effortLevel` from `medium` to `low` (file edit for the persistent default + `/effort low` slash command). The `/effort` command applies **live** to the running session, no restart needed; the file edit is just the persisted default.

**The bet:** most turns (recon, tracker hygiene, ticket shaping, state grounding) don't need deep reasoning; low buys speed. Hard turns escalate via `MAX_THINKING_TOKENS` (currently 0/off) per [[feedback_extended_thinking_off]], or by bumping effort with `/effort` mid-session.

**What to watch (report to Josh, don't silently revert):**
- Speed: is low noticeably snappier on routine turns?
- The risk: low's failure mode is committing too fast, which is exactly Josh's overstep concern (asserting PR/issue state without a live read, acting before grounding, mentioning/updating things prematurely). If low starts overstepping more, that is the signal to go back to medium. The state-check Stop hook and memory rules are the guard.

Outcome pending. Update or delete this once Josh decides low stays or reverts.
