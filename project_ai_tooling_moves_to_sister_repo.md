---
name: project_ai_tooling_moves_to_sister_repo
metadata: 
  node_type: memory
  type: project
  parent: trunk_volley
  originSessionId: fbbcf40e-661f-4d23-879b-7bff45043a80
---

The AI tooling currently co-located in the volley repo is destined to **extract to a sister repo**: `.claude/**` (agents, skills, hooks, settings), `scripts/memory/**` (the memory-forest tooling), and the AI-facing material. It lives here now for convenience, but the long-run home is separate from the game.

**Why:** AI infrastructure and the game are diverging concerns; keeping the game repo lean (the same premise behind the asset pipeline) means the agent/memory machinery moves out rather than accreting in the game's tree. Josh, 2026-06-12.

**How to apply:**

- Treat AI tooling as a SEPARATE lane from game-repo infrastructure. The `infra-implementer` owns game-repo plumbing that stays (CI, hooks-as-config, version-control config, build/deploy, wrangler); it does NOT own `.claude/**` or `scripts/memory/**`, which are on their way out.
- When placing new AI tooling, keep it groupable for the eventual extraction, alongside [[project_ai_facing_docs_live_in_ai_folder]] (AI docs live in `designs/ai/`). Do not scatter agent/memory machinery into game directories.
- A structural move of AI tooling is its own concern, not folded into a game-infra change.
