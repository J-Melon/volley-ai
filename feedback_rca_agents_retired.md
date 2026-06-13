---
name: feedback_rca_agents_retired
description: Stop dispatching root-cause-analyst agents for Volley bugs. They proved ineffective 2026-06-01 (read the wrong branch once, concluded "code is correct, must be observation" the easy way out, both missed a live-runtime-only bug). Diagnose with direct instrumentation + runtime evidence instead, or a focused general-purpose probe.
metadata:
  type: feedback
---

Josh, 2026-06-01: "lets kill rca agents, they are not effective enough."

Evidence on the soul-multiplier bug: two root-cause-analyst dispatches. The first read the WRONG branch (the main tree was left on a chore branch) and reported HIGH-confidence "the tier system is missing", all void. The second concluded "the code is functionally correct, the symptom must be an observation issue", which was the easy-way-out non-answer; the bug was real and live-runtime-only. The refactor-planner's diagnosis step was also unconfirmed ("the implementing agent must reproduce the exact failure"). Net: the agents cost large token spend and returned tidy-but-wrong stories, the coherence-not-accuracy failure at agent scale ([[feedback_self_judgment_is_coherence_not_accuracy]]).

**How to apply:**
- Do NOT dispatch root-cause-analyst. For a "why does X happen" bug, diagnose directly: read the suspect path, then INSTRUMENT the live path (temporary prints at each hop) and have Josh trigger one repro, reading actual fired/not-fired evidence. Runtime ground truth beats an agent reasoning from code.
- A frame-stepped headless GUT probe (call the function N times, log state) is a cheap, honest way to test a mechanism in isolation without an RCA.
- If a bug genuinely needs a second pair of hands, a focused general-purpose probe with a NARROW, falsifiable question beats the RCA's open "find the cause" framing.
- The lesson that keeps recurring: static analysis and forced probes pass while the LIVE path fails; only watching the live path (instrumentation, Josh's repro) catches it. Reach for that first, not an agent.
