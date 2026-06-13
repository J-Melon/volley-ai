---
name: project_ai_facing_docs_live_in_ai_folder
description: "Docs written for or about agents (the agent system, agent-readable authoring/style guides, AI-behaviour notes) live in designs/ai/, not scattered in research/ or elsewhere. They can stay published to the wiki; relocating to ai/ groups them under Ai-* so they read as AI material, not human design specs."
metadata: 
  node_type: memory
  type: project
  originSessionId: 5f05a52d-00d0-4a9c-a342-9027c165d0ba
---

AI-facing docs belong in `designs/ai/`. That covers the agent system, agent-readable authoring/style guides, and AI-behaviour notes. They do not need excluding from the public wiki; putting them under `ai/` is enough, because the wiki then publishes them as `Ai-*` pages that read clearly as AI material rather than human design specs.

**Why:** 2026-05-27, sweeping the public wiki. `designs/research/STYLE.md` (an authoring guide for "every contributor, human or agent") published as the human-facing page `Research-STYLE`. Josh: "is for ai not humans... they can remain they just need to be in the ai folder."

**How to apply:** when a doc is for or about agents, place it in `designs/ai/`. This is distinct from internal-but-human docs (team process, essay-production QA), which are a separate question about what the public wiki should carry. Pairs with [[project_docs_structure_prototype_to_entity]].
