---
name: planner-agents-have-no-write-parent-saves-the-plan
description: refactor-planner and Plan have Read/Grep/Glob but no Edit/Write/Bash; brief them to return the plan as final message
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 56ba4a44-e553-4f5c-bd77-714693445ba7
---

The `refactor-planner` sub-agent's tool list is Read/Grep/Glob plus four godotiq tools (impact_check, dependency_graph, signal_map, trace_flow). No Edit, no Write, no Bash. The built-in `Plan` agent is similarly read-only. Neither can save a plan file on its own.

**Why:** Reinforced 2026-05-12 when I briefed Nefario "write to `ai/scratchpads/...` if Read can — otherwise return it." Nefario read the brief literally and returned the plan as the final message anyway, but the "if Read can" framing was nonsense (Read reads, it doesn't write) and wastes a brief slot. Same shape as [[feedback_specialist_must_have_bash_to_ship]] but for the planning specialists.

**How to apply:**
- Brief refactor-planner / Plan agents with: "return the plan as your final message; the parent will save it to `ai/scratchpads/<slug>.md`."
- Save it from the parent thread with Write as soon as the agent returns.
- Don't ask a planner to commit, push, or open a PR; those are implementer responsibilities.
- If the plan needs to live in `designs/**` rather than scratchpad, the parent writes it (or dispatches docs-tender) after Josh blesses the shape.
