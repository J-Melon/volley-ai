---
metadata:
  node_type: memory
name: feedback_agent_prompt_economy
parent: feedback_what_to_delegate
description: Keep Agent-tool briefs tight to cut token and startup cost: shorten, pre-load the chosen path, batch related work, skip the agent for trivial edits. The distinct danger of restating skill-owned mechanics lives in [[feedback_brief_names_judgment_not_mechanics]].
type: feedback
originSessionId: 8ccd039c-e27c-4f2f-888a-5678ecd02dfd
---
metadata:
Agent dispatch has a fixed startup cost plus a token cost that scales with prompt length, paid twice: writing the prompt and the agent reading it. A focused ~100-word brief plus a pointer to the docs the agent already reads is faster and produces the same work. Josh flagged slow per-agent turnaround on 200-400 word prompts with exhaustive hard-rules blocks.

**How to apply:**
- **Shorten** to ~100 words; cap hard rules at a one-line pointer.
- **Pre-load the path.** Specify the known branch/file/edit directly; narrow "research X or fall back to Y" to the chosen path.
- **Drop the structured-report ask.** "commit SHA and challenge URL" is enough; agents volunteer surprises.
- **Batch** related edits in one dispatch; **reuse** a live agent via `SendMessage` rather than a cold respawn.
- **Skip the agent** for a one-line edit + commit (~10s inline beats ~30s plus dispatch overhead).

The separate, sharper rule that a brief must not restate the mechanics a minion's skill already owns (restating OVERRIDES the skill) is [[feedback_brief_names_judgment_not_mechanics]]; that one is about correctness, not cost.
