---
name: debrief-is-process-retro-not-status-report
description: "A debrief is a short summary of the work done, blockers that surfaced, and actions those blockers earn. Written in team voice, not from an AI / orchestrator perspective."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: bd0ca049-796f-41c8-a3e7-cb8a0a44ac81
---

A debrief is a short summary of the work done, the blockers that surfaced during it, and the actions those blockers earn. Written in team voice, not from an AI / orchestrator / swarm perspective.

**Why:** 2026-05-16, Operation Marginalia: Josh stopped a "what shipped" debrief and pointed at the scrum-retro shape (blockers, improvements, action items). 2026-05-19, Operation Nefario: Josh sharpened twice. First: "debriefs should be a short summary of the work done, any blockers exposed, and any actions based on those blockers." Second: "don't write it from an AI perspective." Prior versions of this rule had the orchestrator narrating the work as agent process (minions, dispatchers, swarms, codenames) rather than as the work itself.

**How to apply:**

Three sections, in this order:

1. **Work done.** A short summary of what the work produced. One or two sentences, plain. Not a PR list, not a deliverable catalogue; a paragraph a teammate could read and know what the period covered.
2. **Blockers.** What got in the way during the work. Named concretely. Two or three load-bearing items; not a punch list of every friction.
3. **Actions.** What changes for next time, anchored to the blockers above. Process levers (memory rules, skills, hooks, conventions, audits), not deliverable follow-ups. "File SH-N", "rewrite test X", "fix the role assertion" do NOT belong here; they are backlog. Filed / Memory-only / Parked per `feedback_debrief_action_items`.

**Voice.** Team perspective, plain English. Do NOT write from the AI / orchestrator / swarm vantage point. No "minion", "dispatcher", "orchestrator", "swarm", "agent", "Marvin reported", "the dispatcher folded", "the orchestrator placed" framing. The debrief describes the work, not the machinery that produced it. If a tool or surface is load-bearing for the blocker (merge queue, GUT, CI runner, reviewer brief), keep it; if it is just orchestration colour, drop it. Codenames stay out of the prose.

**Brevity.** Two or three load-bearing items per section. Josh, 2026-05-16: "I don't really mean shorter but only high level levers." Eight bullets is a punch list; two or three is a debrief. A debrief is brief because it is high-leverage, not because the words are trimmed.

**Other constraints:**
- A one-sentence work-done summary is fine; a list of merged PRs is a status report on a different surface.
- Flags listed per `feedback_flags_surface_or_skip.md`.
- Health label (`onTrack` / `atRisk` / `offTrack`) reflects process health, not deliverable health.
- Related: [[feedback_debrief_source_linear_and_devils]] (surface = `save_status_update` on the project; three independent agents fold). [[feedback_debrief_action_items]] (routing). [[feedback_swarm_retro]] (project choice).
