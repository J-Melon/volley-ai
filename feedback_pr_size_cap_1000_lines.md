---
name: feedback-pr-size-cap-1000-lines
description: "Hard cap of +1000 added lines per feature PR; cross it and PR what's done, move the rest to a follow-up; split only where each PR functions independently on main or it breaks the trunk; prefer shared-contract parallel PRs but ONLY at 3 PRs or fewer (past that contract churn dominates, go serial)"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 332af565-6013-4f8d-ba02-8c0511478c54
---

A feature PR has a hard ceiling of **+1000 added lines** (insertions; deletions don't count toward it). When a multi-unit feature's accumulated diff crosses that line, stop folding, open the PR for what's done, and move the remaining units to a follow-up: their own ticket, branched off main once this PR merges.

**Why:** caps reviewer load; stops one feature ballooning into an unreviewable megadiff.

**The overriding constraint: each PR must FUNCTION INDEPENDENTLY on main.** The line count is the TRIGGER; an independently-shippable slice is the REQUIREMENT, and the requirement wins. A split PR must compile, pass the full suite, and leave no half-wired feature, because it merges to trunk on its own. Never split mid-unit or at a point that leaves main non-functional just to honour the line count. If the only place you would cross 1000 is inside a unit that cannot stand alone, finish that unit (accept the overage) or find an earlier clean boundary; do NOT cut a unit in half.

**Independence via shared contract, but only at small N (<=3 PRs).** When units CAN be made independent by landing a shared contract first (an agreed interface, signal shape, or data resource that each unit builds against), that is PREFERRED over a serial single-branch fold, because the units then parallelise as separate independent PRs. BUT only when the split is **3 PRs or fewer**. Past 3, contract churn dominates: every contract revision ripples across all in-flight PRs as re-reviews and rebases, and that cost exceeds the parallelism gain. So:
- **<=3 independently-shippable units with a clean shared contract:** land the contract, split into <=3 parallel independent PRs.
- **>3 units, or no clean contract:** one feature branch, fold serially, one PR (subject to the +1000 cap below, which can then force a 2-PR done/follow-up split, still <=3 so fine).

The +1000 cap is a REACTIVE ceiling; the contract-preference is a PROACTIVE choice to parallelise when cheap. They agree at small N. (SH-437 ran 5 units on one branch: 5 > 3, so serial fold was correct; unit A acting as the de-facto shared contract for B-E is fine as a foundation, but making all five independent PRs would have been churn.)

**How to apply:**
- Decide split shape at dandori: count independently-shippable units. <=3 with a contract -> parallel PRs; else serial fold.
- Measure as you fold: `git diff --numstat main...<branch> | awk '{a+=$1} END {print a}'` for added lines.
- Sequence units so early ones are independently green (data/foundation first, consumers next, polish last); this is what makes a clean cut point exist when you need one. See [[feedback_trunk_based_development]] (one feature, one branch) and the dandori unit ordering.
- At the cap: PR the largest independently-functional prefix; file the remainder as a follow-up issue off main.
- A feature whose units genuinely cannot be made independently-shippable below 1000 lines is a planning smell; flag it at dandori, not at fold time.

Established 2026-05-30 (Josh, during SH-437). The independence clause was Josh's immediate correction: "but it has to function independently, otherwise it breaks the trunk."

Governed by the greater principle [[feedback_feature_pr_decomposition]] (fewest independently-shippable PRs); this file is the threshold detail.

Related: [[feedback_trunk_based_development]], [[feedback_godot_fold_needs_reimport]].
