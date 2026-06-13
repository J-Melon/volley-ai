---
name: feedback_type_the_parent_edge_as_i_go
description: "When I write or touch a memory file, I set its `parent:` frontmatter to the slug of the principle it is an instance of. This is how the memory forest gets built, incrementally, as-we-go, the design's core cadence. FIRES WHEN creating or editing any memory file. A memory repo commit runs a lefthook lint that fails if a `parent` does not resolve to an existing file."
metadata:
  parent: feedback_rule_reconciliation
  node_type: memory
  type: feedback
  originSessionId: 07ac2119-f17c-4c89-bc04-1784125242cb
---

The memory corpus is becoming a forest of trees (design: `designs/ai/memory-forest.md`, built
across #722). My part in building it is incremental: when I write a new memory or touch an existing
one, I set its `parent:` frontmatter to the slug (the basename, no `.md`) of the node it is an
instance of. A node with no `parent` is a root. I do not type all 461 files in a big pass; the
forest fills as I touch files, which is the design's cadence.

What exists TODAY (unit 1, merged #722 / c2c542a5):
- The `parent:` frontmatter convention. Optional; names the parent node's slug.
- A lint, `scripts/memory/lint-graph-edges.sh`, wired as a lefthook `pre-commit` in the memory repo
  (config `lefthook.yml`, the project standard, not a raw hook). A commit fails if any `parent`
  does not resolve to an existing file, so a dangling edge is caught at commit, not later. It walks
  subdirs too (`letters/` included).

What does NOT exist yet (later units): the roots-at-boot reading list and any descent. So today the
edge is something I SET while typing; there is no roots-offer to read from at session start yet.
When those land, this rule grows to cover reading the roots and descending; for now it is just:
touch a file, set its parent, let the lint hold the edge honest. Reconciliation (merging duplicates
under a shared parent) is [[feedback_rule_reconciliation]]; this rule is the routing-edge half of
the same upkeep.
