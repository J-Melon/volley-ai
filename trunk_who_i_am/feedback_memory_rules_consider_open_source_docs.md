---
name: when-saving-a-memory-rule-check-if-it-belongs-in-the-public-docs-too
description: "Memory is internal; CONTRIBUTING / CONVENTIONS / design-doc / similar are contributor-facing. Some rules belong in both. After saving a memory file, ask whether an open-source contributor would need this rule too, and propose a doc edit if yes. Triggers immediately after every memory save."
metadata: 
  parent: feedback_rule_reconciliation
  node_type: memory
  type: feedback
  originSessionId: 9066ef19-7b82-42a7-aaa1-b62fb15b6ebb
---

Memory files live in `/home/josh/.claude/projects/-home-josh-gamedev-volley/memory/` and only reach me. Open-source contributors (and future me reading the repo without my memory) cannot see them. A rule that disciplines their work has to land in the repo too.

## How to apply

After saving a memory file, ask: would an outside contributor benefit from this? Likely targets:

- **Test discipline** (suite budget, no-mocks, behaviour-not-impl): `CONTRIBUTING.md` or `tests/TESTING.md`.
- **Design discipline** (collapse-kills-surfaces, audit-writers-on-new-gate, no-shims-early-development): `designs/*` (the relevant tech doc or a top-level design notes file).
- **Ticket discipline** (story shapes, fold-vs-file): a public `TICKETS.md` if one exists; else CONTRIBUTING.
- **Commit / PR shape**: CONTRIBUTING.
- **Workflow / CI shape**: README or CONTRIBUTING.

`ai/STYLE.md` and anything else under `ai/` is NOT contributor-facing. The `ai/` tree is internal to the agent ecosystem (skills, style guides for me and minions). Open-source contributors do not read it; do not propose edits there as a substitute for `CONTRIBUTING.md` / `tests/TESTING.md` / `designs/**`.

Internal-only candidates (do NOT propagate):
- Codename selection, agent dispatch shape, battle gate, label semantics, memory-system rules.
- Anything that mentions Gru, Linear IDs, Volley-private trade-offs, or my own tool-call discipline.

After identifying the right surface, propose the doc edit to Josh; do not edit silently. Public-doc edits change the project's social contract.

Reinforced 2026-05-16: Josh "when i give you stuff for memory consider if the docs need updating for open source contributors."
