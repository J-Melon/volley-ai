---
name: Spike a new feature as two issues
description: Rule that new-feature spikes must split into a design spike and a tech spike; never one combined issue
type: feedback
originSessionId: 60225dfd-277e-4c4b-8ef4-5843bb535764
---
New-feature spikes are filed as at least two separate issues: one design spike, one tech spike. Never collapse them into a single "spike: new feature X" issue.

**Why:** design questions (shape, feel, player experience, narrative framing) and tech questions (feasibility, architecture, dependencies) pull in opposite directions when crammed into one issue. Keeping them separate lets each run at its own pace, gets reviewed by the right eye, and produces two clean writeups instead of one sprawling one. Established during the SH-99 cycle review, 2026-04-23.

**How to apply:** when drafting or proposing a spike for a **game** feature that does not yet exist, present at least two candidates; one design, one tech; before filing. Each may have its own sub-questions. The implementation feature issue is written against both spike outputs, after they resolve. Applies to new game features only.

**Does not apply to:**
- Pure-tech infrastructure spikes (MCP servers, CI gates, build pipelines, agent tooling); single tech spike, no design spike. "Design" in Volley means game design.
- Spikes that investigate a single existing system (perf regression, refactor question).
