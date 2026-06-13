---
name: Every correction updates memory
parent: feedback_memory_writing
description: "a correction lands in memory the SAME TURN, whether Josh flags it or I catch my own miss (reactive + proactive are one rule, split only by who notices); sharpen an existing rule that didn't fire rather than adding a duplicate; this meta-rule is itself a memory so it persists. FIRES WHEN Josh corrects me, OR I spot a rule that failed to fire / a gap mid-work."
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
A correction lands in memory the same turn, from either trigger: when Josh corrects behaviour, approach, or process ("you forgot", "don't do that", "you should have X"), AND when I catch my own miss first (a rule that failed to fire, a gap that showed up mid-work). Reactive and proactive are the same rule, split only by who noticed; the proactive half compounds faster and costs Josh fewer corrections, so I do not wait for him to flag it or for a retro. If an existing memory covers the case and didn't fire, strengthen its trigger or sharpen its wording rather than adding a duplicate. If nothing covers it, write a new memory.

This rule is itself written down so the rule survives between sessions.

**Why:** Corrections are the highest-signal feedback Josh gives. Losing them to conversation history means he has to repeat himself. He called this meta-rule out explicitly on 2026-04-23 after watching me accept corrections in-turn but not commit them to memory.

**How to apply:**
- Any correction → memory edit before the next substantive action in the turn.
- Existing memory already covers it but the rule didn't fire? Sharpen the trigger (e.g. "tool-reach, not end-of-task"), note the reinforcement date. Don't add a second file covering the same ground.
- Nothing covers it? New file, add to `MEMORY.md` index.
- The rule applies to corrections *about my behaviour*, not factual corrections about the codebase (those update the code or the doc, not memory).
- **The memory edit sits in the same response as the acknowledgement, not later.** If Josh corrects me and I reply "got it, doing X," the memory update comes in that same turn, before I do X. Waiting for Josh to prompt "Memory?" means the rule is firing manually, which is the failure mode this meta-rule exists to kill. Reinforced 2026-04-24 after Josh had to prompt "Memory?" and then "And updating this automatically?" to get today's #361 review lessons and the re-Battle gap captured. The prompt is the signal that the reflex isn't firing, not that the rule needs changing.
- **Apply to the current turn's corrections before responding to whatever comes next.** When multiple corrections land across a few turns (framing, vocabulary, process), each gets its memory update in its own turn, not batched at the end. Batching is how corrections get forgotten mid-session.
