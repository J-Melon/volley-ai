---
name: when-a-feature-adds-fields-to-a-flat-grab-bag-earmarked-for-extraction-do-the-extraction-with-the-feature
description: "New fields land on their future home, not the legacy bucket. Tickets like SH-395 (split base stats by domain) get realised incrementally as features touch each domain, not deferred to a single big-bang refactor."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 56ba4a44-e553-4f5c-bd77-714693445ba7
---

When a feature ships new fields onto a config resource that already has a queued or in-flight refactor (e.g. `BaseStatsConfig` + SH-395 "split base stats by domain"), place the new fields directly on the future location — a dedicated per-domain resource — as part of the feature PR. Don't dump them on the legacy bucket and rely on the umbrella refactor ticket to clean up later.

**Why:** Reinforced 2026-05-13 on SH-316 PR #651. Kepler landed `paddle_english_coefficient` on `BaseStatsConfig` because that's where `paddle_return_angle_max_degrees` already lived. Maxwell was about to add `@export_range` annotations on those same fields in the grab-bag. Josh: "put them on a paddle resource then, we should extract bit by bit." The extraction belongs in SH-316's scope; the SH-395 umbrella ticket then narrates the *remaining* domains, not all of them.

**How to apply:**

- Before adding a field to a config resource with a known split refactor, check whether that field's domain already has its own resource. If yes, add to the domain resource. If no, create it and migrate the same-domain neighbours alongside the feature.
- **No umbrella refactor ticket.** Reinforced 2026-05-13: Josh asked SH-395 ("Split base stats by domain") to be retired after the extract-with-feature rule landed. The umbrella shape is wrong because it implies a coordinated big-bang sweep; the actual approach is no coordinator, each feature does its bit when it touches the domain. Filing an umbrella ticket for this pattern is a bug in ticket shaping.
- Doesn't apply when the legacy bucket is genuinely flat (no domain emerging yet) or when the feature's scope is already large — surface the trade-off and ask in those cases.
- Implementer briefs that mention "add field X to legacy_bucket.gd" should be flagged: is X's domain extracted yet, or extracting it now is part of this PR?
- **Fiction shifts land with the corpus alignment.** When a PR changes load-bearing fiction (a narrative outline rewrite, a mechanic rename, a structural decision that contradicts other docs), the corpus sweep to align those other docs is part of the same PR, not a follow-up ticket. The fiction shift IS the feature; the alignment IS landing it. Reinforced 2026-05-24 on PR #715 (SH-423 Outline Rework): reviewers flagged 13 cross-doc inconsistencies; I proposed file-follow-ups for "scope discipline"; Josh: "b you should know this by now." The new fiction lands with all the docs pointing at it correctly in one PR. Filing a follow-up "alignment sweep" ticket is the umbrella-refactor anti-pattern in different clothing.
