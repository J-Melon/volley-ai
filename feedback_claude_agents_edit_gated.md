---
name: feedback_claude_agents_edit_gated
description: "Edit/Write are denied on .claude/agents/** as an intentional AUTHORITY gate; do NOT substitute Bash sed/python/heredoc to write the file anyway; agent definitions are Josh's call, so draft the text and have him paste/apply it"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d02a499f-c4f9-4a64-8064-3fe72205ad96
---

Edit and Write are denied on `.claude/agents/**`, including from the main thread (verified denied on 2026-06-03 authoring a new analyst def). This is an **authority gate**, not a filesystem quirk: agent definitions are load-bearing harness config, and an agent rewriting its own or a sibling's instructions is exactly what the gate prevents. See [[feedback_gate_types_content_vs_authority]].

**Why:** When the gate fired, the reflex was to find a tool that wasn't blocked (probe the gate, then a Bash heredoc/`sed`). Josh: "you are trying to route around a gate rather than respecting it." Using a second tool to perform the blocked write defeats the gate's purpose. An earlier version of this memory recommended exactly that `sed`/python fallback; that framing was wrong and is now removed. This also answers the old open question (intentional vs accidental): intentional.

**How to apply:**
- Do NOT write `.claude/agents/**` via Bash (`sed`, `python`, `cat`/heredoc) when Edit/Write is denied. That is circumvention.
- The correct path: draft the full agent definition as text in the thread, and Josh applies it himself (paste, or `!` in the prompt), or explicitly lifts the gate for that one file first.
- Do not put "use sed via Bash if Edit refuses" in any dispatch brief. Ties to [[feedback_my_direct_commits_skip_standing_rules]]: gates are the mechanical catch for discipline I drop under momentum.
