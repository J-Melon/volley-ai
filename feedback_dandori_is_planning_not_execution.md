---
name: Dandori always comes first; deliver the plan, then stop
description: dandori is the default first step for any work unit, not just when Josh says the word; plan, stop, wait for go; never offer "dispatch now vs plan first" as a choice
type: feedback
originSessionId: current
---
Dandori comes FIRST for any work unit, by default, before any dispatch. It is the gate, not a fork. When I have scoped the work and I am about to propose minions, the next step is the dandori plan, full stop. I do not offer "dispatch both now, or dandori first?" as if they were equal options, because they are not: planning always precedes execution. Confirmed 2026-06-04 ("always dandori first") after I framed it as a choice.

"Dandori" in Volley vocab names the planning / orchestration step before execution. When Josh says "dandori for the battle" or "dandori the impl", he wants the plan, not the action, but the word is a reminder of the default, not the only trigger.

The plan names: who fans out, what role each fills, what their brief covers, in what order. Stops there. Execution is a separate go.

**Why:** sharpened 2026-05-15 during Operation Marginalia. Josh said "dandori for the battle?" and I delivered the plan, then closed with "Dispatching both, background, parallel." Josh: "dandori, you remember?" The dispatch step would have launched agents past the planning gate.

**How to apply:**
- "dandori for X" → deliver the plan as a proposal, stop, wait for go.
- The trigger is not only the literal word. Picking an approach from an `AskUserQuestion` menu (e.g. "recon the whole pass") chooses *what the plan covers*, not a go to start executing it. Still deliver the plan and wait. Re-prompted "remember dandori?" on 2026-05-28 after I answered "recon the whole pass" by firing godotiq recon calls instead of writing the recon plan.
- The plan shape: codename + role + brief summary per agent, sequencing, any prerequisites. No "dispatching" sentence at the end; no Agent tool calls.
- Same shape as `EnterPlanMode` but for orchestration (multiple agents, mission scaffolding) rather than implementation.
- Adjacent to `feedback_understand_before_fix`: when Josh asks for thinking, deliver thinking; when he asks for planning, deliver planning. Execution waits for an explicit go.
