---
name: Bump dispatch depth on every fix failure for the same bug
description: Each time a dispatched fix fails to resolve a player-facing bug, the next dispatch on that bug runs at a deeper tier; same-pattern retries are not allowed
type: feedback
originSessionId: a39316b3-d98c-4577-97d8-c03dcfbbad89
---
When a dispatched fix on a bug fails to resolve the player-facing repro, the next dispatch on that same bug must run at a higher depth than the last one. No same-pattern retry.

**Why:** Multiple rounds on SH-289 GONE-on-buy went trace → fix → ship → still broken → repeat. Each round burned a minion at the same depth and produced the same shape of finding. Josh asked for a better escalation system 2026-04-28; the simple version is "depth ratchets up, never sideways."

**Depth ladder, in order:**
1. Static trace + targeted fix (file_context, dependency_graph, signal_map; one fix-minion).
2. Runtime RCA: `run(play)`, `state_inspect` straddling the bug event, `verify_motion` if movement; profiler if performance-adjacent. Then a fix-minion briefed on the runtime evidence.
3. Devil's-advocate or root-cause-analyst at tier 2 with the profiler, briefed on why prior RCAs missed; fix only after the new RCA names a different root cause than the prior ones.
4. Stop. Hand-debug with Josh in the loop. Don't dispatch again until the system is understood.

**How to apply:**
- Track which round you're on by re-reading the bug ticket's prior dispatches and outcomes before launching the next minion. A repeat at the same depth is the failure mode this rule blocks.
- Skipping straight to runtime RCA on round one is fine when the bug is obviously runtime-shaped (timing, physics, state). The ladder is a floor, not a forced sequence.
- The next dispatch's brief always includes a one-line "why prior round missed" so the new minion isn't repeating the same trace.
