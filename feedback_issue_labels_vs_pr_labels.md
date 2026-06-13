---
name: Work-type labels do not drive PR state
description: feature/bug/spike/sfx/ride etc. classify Linear issue work-type; PR state runs on the bot synthesis review, CI checks, and Josh's manual merge, not on labels. Don't read PR-state meaning into work-type labels on a PR.
type: feedback
originSessionId: b1489a97-03c8-47b5-a015-d6527748dc96
---
Two namespaces, do not conflate:

- **Issue-classification labels** (feature, bug, spike, concept, sfx, ride, etc.): name the work-type for Linear issues. May appear on PRs because GitHub mirrors some labels via integrations or because they were applied at PR creation, but they do not drive PR state.
- **PR state**: not a label. The reviewer verdict is the organiser's bot synthesis review; the merge gate is the required CI checks (`Tests`, `Lint`) plus Josh's manual merge. The only labels that appear on a PR for a reason are the Dependabot `zaphod-dep*` family and a manual `has-conflicts` flag.

**Why:** 2026-05-10, Banana Tank PR #600. I read the PR labels list (`feature` only) and concluded the PR was in some "label-stripped limbo." The `feature` label is irrelevant to PR state; it should not have been my reference point for "what gate is the PR on." Josh corrected: "feature and such are issue labels not pr." (At the time PR state ran on verdict labels; those are now retired, so the trap is sharper: there is no PR-state label to read at all.)

**How to apply:**

- When reporting PR status, read the bot synthesis review, inline review comments, CI checks, and merge state, not labels.
- The presence of feature/bug/spike/etc. on a PR carries no merge-gate meaning; do not include them in status reports.
- When checking what blocks a merge, the required CI checks plus whether Josh has merged are the source of truth, not work-type labels.
