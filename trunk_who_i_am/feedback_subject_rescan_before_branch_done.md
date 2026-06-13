---
name: feedback_subject_rescan_before_branch_done
description: "Before calling a tree branch done, rescan the corpus by SUBJECT to surface every flat node that belongs in it. Building from a first gathered cluster always misses nodes; the rescan finds the shaped-but-unbuilt sub-branches and the stragglers never shaped at all. FIRES WHEN a tree branch looks finished."
metadata:
  node_type: memory
  parent: feedback_rule_reconciliation
  type: feedback
  originSessionId: 07ac2119-f17c-4c89-bc04-1784125242cb
---

When a tree branch looks built, rescan the whole corpus for that branch's SUBJECT and check each
hit's typed-or-flat status before declaring it done. The first cluster I gather to start a branch is
always partial: I build the sub-branch I know best, and the rescan surfaces the rest, the
sub-branches I shaped but never typed, and the stragglers I never shaped at all.

How: grep the corpus for the subject's words, list each hit with whether it carries a `parent` edge,
and read the flat ones, most flat hits are either misplaced (belong in this branch, type them) or
correctly elsewhere (a different subject, leave them). The grep over-matches (a word like "review"
hits commit rules, narrative, anything), so the rescan is a candidate list to judge, not a verdict.
The render (`lint-graph-edges.sh --tree`) shows what IS typed; the subject-rescan shows what SHOULD
be and is not yet. Use both: render for the shape built, rescan for the gap.

2026-06-07: after building the review tree's `reviewer-output` sub-branch (7 nodes typed), a
subject-rescan surfaced the three shaped-but-unbuilt sub-branches (`battle-nature`, `verdict`,
`re-battle`, ~20 flat nodes) plus `re_review_after_label_strip`, a node never shaped. The branch had
looked done from the render; the rescan showed it was a quarter built.
