---
name: Scrub agent state when work completes
description: delete per-agent scratchpad files once the unit of work they supported is done, so stale context does not leak into later unrelated work
type: feedback
originSessionId: 608651d3-3b61-4b71-9a83-894f4e86b346
---
Persistent per-agent state (e.g. `ai/swarm/agents/{name}.md`) lives only for the duration of its unit of work. Once the work closes; issue merged, research thread shipped, design doc landed; scrub every agent file associated with it.

**Why:** Stale agent context is worse than no context. A Mabel who still thinks she is researching delegation surfaces will drag old framing into unrelated work. Scrubbing forces a fresh cold start with fresh eyes, and keeps `ai/swarm/` from becoming a graveyard. Flagged on 2026-04-21.

**How to apply:**
- Treat "unit of work" as: one research thread, one issue, one challenge, one design-doc drop. The organiser (main thread) decides when a unit is done.
- On completion, delete every `ai/swarm/agents/{name}.md` and every `ai/swarm/tasks/{id}.md` that belonged to that unit. Do not archive, do not rename with a timestamp, do not keep "for reference". Delete.
- Exception: if a finding is worth keeping long-term, promote it to memory (user/feedback/project/reference) or to a repo doc *before* scrubbing. The scratchpad is working memory, not a record.
- Codenames are per-session and disposable (per `feedback_sub_agent_codenames.md`), so scrubbing a name frees it for reuse later if the next topic wants it.
- Confirm with Josh before scrubbing if the unit-of-work boundary is ambiguous.
- **`ai/scratchpads/` is included.** The rule covers every scratchpad file in the swarm surface, which includes `ai/swarm/agents/`, `ai/swarm/tasks/`, AND `ai/scratchpads/`. Research scratchpads in the latter (research-*, *-research-*, session-handoff-*, spike notes) scrub at the same trigger as agent files. Reinforced 2026-04-24 after a mission-complete sweep left ten research scratchpads lingering from prior sessions; Josh had to flag "1 should have been cleared" before I swept.
- **Trigger on mission complete, not just issue close.** When a mission's last Challenge merges (Mission complete state), sweep ALL scratchpads associated with any work in that mission, not only the per-issue ones. The sweep belongs to the mission-complete ritual, same turn I switch main back to main and prune merged branches.
