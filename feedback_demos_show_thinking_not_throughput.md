---
name: Demo missions show agent thinking, not parallel throughput
description: When picking live-demo or showcase missions, prioritize judgment work (design spikes, RCA, devils-advocate disagreement, architecture synthesis) over mechanical fan-out across many files
type: feedback
originSessionId: d792e612-7af1-4674-81f7-90641ad52563
---
When picking a mission to demo the swarm — or any "show me the system" example — don't equate parallelism with sophistication. Mechanical fan-out (rename across 15 agent frontmatters, apply prefix to N reviewers) is just sharding; it shows throughput, not intelligence.

The interesting demo material is agents reasoning: refactor-planner producing a sequenced plan, devils-advocate stress-testing it, root-cause-analyst diverging from the implementer's assumed cause, a Gru Sister overruling on judgment, two minions proposing different architectures and a synthesis pass picking between them.

**Why:** Josh wants to show his tech team agent *thinking*, not parallel work. A demo of N minions doing the same mechanical edit in parallel reads as a glorified `xargs`. The differentiator vs. ordinary scripting is judgment under disagreement.

**How to apply:** When Josh asks for a demo / showcase / live-example mission, filter ticket candidates by whether they require judgment under uncertainty (design spikes, architecture choices, security threat-modelling, RCA, refactor sequencing) rather than by blast radius or file count. Bundle so multiple agent roles must engage and disagree, not so multiple implementers shard a list. If the only fan-out shape is "every agent does the same thing to a different file," reject it for demo purposes regardless of how visible the parallelism is.
