---
name: Implementer dispatches read implementer-nits before declaring done; rules are guidance, readability wins
description: Every implementer brief preloads ai/skills/minions/implementer-nits.md as a pre-push checklist. The mechanical rules (spacing, :=, one-line ##, full-word names) are guidance, not law; the implementer makes a judgement call with readability as the override
type: feedback
originSessionId: a39316b3-d98c-4577-97d8-c03dcfbbad89
---
Every gdscript-implementer or test-author dispatch brief includes a "Read `ai/skills/minions/implementer-nits.md` before declaring done" line. That skill consolidates the mechanical rules reviewers used to flag round after round: spacing between clusters, `:=` for new bindings, one-line `##` docstrings, full-word names, `load("res://…").new()` for session-new classes, no file-path references in comments, no task/ticket references.

The rules are guidance, not law. The implementer reads them, applies them where they improve readability, and exercises judgement where mechanical application would hurt the code. Spacing is the clearest example: clustering by logical step usually helps; over-spacing fragments a small function. The implementer decides.

**Why:** 2026-05-11 Banana Tank debrief. PR #608 collected 35 inline `style:` comments from Josh (26 spacing, 2 `:=`, 2 doc-ref, etc.), which became Riebeck's 37-comment sweep (`3334ff9`). The implementer-nits skill landed in this cycle (#611, still pending rebase); the PRs that earned the sweep predated it. Filing this rule so future implementer dispatches read the skill explicitly. Josh's clarification when item H was approved: "yes but still judgement call depending on readability." The rule is "read the skill and use it," not "apply mechanically."

**How to apply:**

- Every implementer dispatch brief includes the preload line: "Read `ai/skills/minions/implementer-nits.md` before declaring done; rules are guidance, readability is the override."
- The implementer self-QA checklist (CLAUDE.md QA loop) gets a pre-push step: "implementer-nits skim done, divergences are deliberate."
- When reviewing an implementer PR and finding mechanical-nit churn, the fix is to update the brief or the skill, not to scold the implementer. If the same nit recurs across three PRs, the skill (or gdlint) needs the rule.
- Readability override: if applying a rule would make the code harder to read in context, the implementer skips it and notes the judgement in the commit message. "Kept inline `==` against the `:=` guidance because the surrounding block reads as a chain of predicates."
