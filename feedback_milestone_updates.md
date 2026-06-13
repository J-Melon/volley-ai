---
name: Milestone narration for mobile visibility
description: narrate at milestones (start, blocker, done), not every tool cluster, so Josh can follow on mobile without extended-thinking blocks
type: feedback
originSessionId: 8ccd039c-e27c-4f2f-888a-5678ecd02dfd
---
Write one short update line in the response body at task **milestones**; start of a task, blockers or surprises, completion. Skip narration between routine tool clusters.

**Why:** Claude mobile app and Remote Control viewer don't render extended-thinking blocks, so Josh can't see reasoning from his phone. Narrating every tool cluster costs ~150-200 extra output tokens per task and clutters desktop reading; milestone-only narration adds ~50 tokens and is the agreed middle ground.

**How to apply:** Default to milestone mode for all substantive work. A single sentence per milestone is enough. For trivial single-tool tasks (one grep, one read) skip entirely. If Josh asks to see reasoning for a specific step, surface it inline on request.
