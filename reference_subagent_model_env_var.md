---
name: reference-subagent-model-env-var
description: CLAUDE_CODE_SUBAGENT_MODEL env var sets the default model for dispatched sub-agents; undocumented but verified working; set to sonnet 2026-05-30
metadata: 
  node_type: memory
  type: reference
  originSessionId: 332af565-6013-4f8d-ba02-8c0511478c54
---

`CLAUDE_CODE_SUBAGENT_MODEL` (in the `env` block of `~/.claude/settings.json`) sets the default model for dispatched `Agent`/Task sub-agents, scoped to sub-agents only; the main thread keeps its own `model`. Set to `"sonnet"` on 2026-05-30 (Josh: "downgrade agents to use a sonnet default and see how that goes").

**Verified, not from docs.** The Claude Code settings docs do NOT list this var (checked 2026-05-30); they only document `ANTHROPIC_MODEL` (global, hits the main thread too) and `teammateDefaultModel` in `~/.claude.json` (agent-team teammates, not Task agents). Confirmed empirically: dispatched a throwaway probe agent and grepped its transcript JSONL for `"model":` -> `claude-sonnet-4-6`. The probe is how to re-verify if behaviour seems off.

**Took effect same session,** not just at next startup, despite env normally binding at session start. So a mid-session change to this var is testable immediately via a probe dispatch.

To revert to Opus sub-agents, remove the key or set it to an opus alias. Per-dispatch `model:` on an `Agent`/`Workflow` call still overrides this default for that one call.

Related: [[feedback_agents_default_background]], [[feedback_extended_thinking_off]].
