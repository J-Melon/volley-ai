---
name: skill-consolidates-not-restates
description: "A skill that assembles SEVERAL memory rules is a checklist plus pointers, not a restated rule body. Each step names the action and links the source; load-bearing detail lives in the memory only."
metadata: 
  node_type: memory
  type: feedback
  parent: feedback_rule_reconciliation
  originSessionId: bd0ca049-796f-41c8-a3e7-cb8a0a44ac81
---

A skill positioned as the assembly point for several memory rules is a **checklist plus pointers**, never a re-statement of the rules. Each step names the action verb and links the source memory; the load-bearing detail (signature, regex, exemplar, "why") lives in the memory only.

The failure: the skill copies the rule body to "make it self-contained," and now skill and memory drift independently. The skill becomes a third surface saying what the memory already said.

**Why:** `debrief.md` blocked (PR #700, 2026-05-16): it named five memory files as sources but restated their bodies (the `save_status_update` signature, the Filed/Memory-only/Parked taxonomy, the exemplar). Three concentric copies of one recipe.

**How to apply:** skill body = numbered checklist + one-line verb per step + memory pointer; one sentence per pointer, not a paraphrase. Triggers and ordering are skill-content, rule bodies are memory-content. If it runs longer than the index plus a paragraph of triggers, trim. The single-owning-branch case is [[feedback_skill_renders_owning_branch]]. Related: [[feedback_refactor_rules_for_readability]].
