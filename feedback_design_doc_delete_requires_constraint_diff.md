---
name: Deleting constraint-bearing design doc requires a constraint-diff before close
description: When a design doc that constrains shipped code is deleted or wholesale-replaced in the same mission that ships the code, a separate agent diffs the old doc's enumerable constraints against the new doc and the shipped code before the mission closes
type: feedback
originSessionId: a39316b3-d98c-4577-97d8-c03dcfbbad89
---
A design doc deleted in the same mission that ships the code it constrained is a load-bearing change. The new doc is by construction shaped to what shipped: nobody is checking that everything the old doc demanded still holds. Before the mission closes, a separate agent must diff the old doc's enumerable constraints (AC-style claims, named invariants, numeric bounds) against the new doc and the shipped code.

**Why:** 2026-05-11 Banana Tank debrief. Commit `e8b9123` killed `designs/01-prototype/design/21-ball-dynamics.md`; the replacement `tech/02-ball-lifecycle.md` was rewritten twice during the mission "as the implementation taught it new things." No artefact shows anyone diffed the old doc's constraints against the new doc and the code. SH-309's apex spec was already on a different code path by the time SH-368's AC list expanded. When a constraint-bearing design doc is deleted in the same mission that ships the code it constrained, the replacement is by construction shaped to what shipped.

**How to apply:**

- Detect: any mission whose diff includes a deleted or renamed `designs/**/*.md` and a `.gd` change in the same merge window triggers the rule.
- Dispatch: a separate cold-read agent (general-purpose works) reads the deleted doc from git history, enumerates its constraints, and checks each one against (1) the new doc and (2) the shipped code.
- Output: a short list of "constraint X from deleted doc; status: covered by new doc / covered by code / dropped / silently changed." Anything in the last bucket is a finding that goes in the mission debrief and either gets restored or gets an explicit "we changed this" note in the new doc.
- This is part of the milestone-close fan-out, alongside cold-read, devils-advocate, and CI pattern-miner.
