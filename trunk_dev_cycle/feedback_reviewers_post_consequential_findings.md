---
metadata:
  node_type: memory
name: Reviewers post only findings with named consequence
description: "Post a finding only when you can name a concrete consequence in one clause (player bug, maintainer trap, save corruption, contract violation). Only `issue` blocks; nitpick/suggestion ride along, nitpick capped at 2. Review churn is the cost; hold findings to the named-consequence bar."
parent: feedback_reviewer_output
type: feedback
originSessionId: deb199f4-304c-4a2c-8531-39e6504933fc
---
metadata:
Volley reviewers (code-quality, gdscript-conventions, signals-lifecycle, godot-scene, docs-and-writing, ci-and-workflows, asset-pipeline, save-format-warden, test-coverage, repetition-reviewer, fresh-eyes) post a finding only when they can name a concrete consequence in one clause: player-visible bug, future-maintainer trap, silent save corruption, contract violation. Conventional Comments vocab (`issue`, `suggestion`, `question`, `nitpick`); only `issue` blocks, the rest ride along non-blocking and `nitpick` is capped at 2 per reviewer ([[feedback_reviewer_output_form]]). The bar still holds: style preferences, alternative phrasings, taste calls, "could also" suggestions, and self-answerable questions stay out entirely, a nitpick is the rare exception within budget, not licence to post polish.

**Why:** Josh's review experience on PR #608 and the Banana Tank mission was buried in churn from low-value findings; every nit triggers an implementer-fix round, a re-review, and a re-label race. Implementer-nits skill (SH-373) absorbs the mechanical class so reviewers don't need to police it; the human review gate exists for substantive concerns only.

**How to apply:** When dispatching reviewers, the brief leans on this rule by default, no per-mission restatement needed. When reviewing, the bar before posting any inline is "what breaks if this stays?" — if the answer is "nothing, but it would read nicer," drop it. Report approve to the organiser silently rather than posting a clean-with-suggestions block.

**Draft-state amplifier.** For non-final docs (mid-iteration narrative drafts, in-flight design docs, docs still being authored), the "named consequence" bar is even harder to clear for grammar / style findings: the polish pass catches comma splices, fragments, missing articles, AI-tell vocab. None of those break anything in a draft; all become noise. Reviewer focus on drafts is structure (does the doc say what it needs to say, in the right order?), cross-reference consistency (do siblings still point here? did content removed actually land in its new home?), and fiction alignment (do load-bearing claims survive the rewrite?). STYLE.md compliance is a final-pass concern, fired when the doc is being shipped. Sharpened 2026-05-24 on PR #715: Slartibartfast (docs-and-writing) returned eight grammar threads on a mid-iteration narrative outline; Josh: "all the comments are grammar stuff for AI that's not the review, these are not final, general structure and cross-reference consistency is more important." Eddie (repetition-reviewer) returned five structural findings, all useful. The dispatch brief should match the doc's state: structural reviewer for drafts, style reviewer only at ship time.
