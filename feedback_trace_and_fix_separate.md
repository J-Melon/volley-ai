---
name: Trace and fix are separate dispatches
description: When a real-game regression surfaces, dispatch root-cause-analyst to trace and report; do NOT have the same agent apply the fix. Fix lands in a second dispatch with the diagnosis as input.
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
A bug-trace and a bug-fix are two different agent dispatches. Never bundle them.

**Why:** Josh corrected 2026-04-27 after I drafted a Gabbro continuation that would "trace and fix" the equip-loop regressions on #506. Combining them collapses the cognitive separation that makes diagnosis honest. The agent fixing the bug has a strong prior on what the cause is (whatever they decided in step one) and writes the patch against that prior, not against the actual cause. If diagnosis was wrong, the fix doesn't address the real bug.

**How to apply:**
1. **First dispatch; root-cause-analyst (Tier 2).** Brief: trace the cause, do NOT apply the fix, write the diagnosis with file:line, confidence, and a fix sketch. Tier 2 is exclusive (one minion at a time per `ai/skills/gru/dispatch.md`).
2. **Second dispatch; impl agent.** Brief: apply the fix per the diagnosis. Reads the RCA report and the named files, writes the patch, runs ggut, commits, pushes.
3. Diagnosis and patch as separate commits OR one commit with the diagnosis quoted in the body; preserves the trail.

Pairs with the existing pair-shape rule (`feedback_swarm_paired_dispatch.md`): trace separation is the same cognitive-separation discipline as test-vs-impl separation.

If diagnosis is trivial and obvious to the organiser (one-line typo, removed export still referenced), skip the trace dispatch; the organiser is the diagnostician. The rule is about non-trivial bugs where a wrong diagnosis costs more than a second dispatch.
