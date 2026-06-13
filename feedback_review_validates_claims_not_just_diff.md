---
name: feedback_review_validates_claims_not_just_diff
description: "reviews check a diff's internal correctness but miss content that an EARLIER change made false; when a diff touches a line that ASSERTS something about the code (docstring naming fields, comment describing behaviour, doc citing an identifier), the reviewer must verify the assertion is still true against current code, not just that the change reads clean. FIRES WHEN reviewing any diff that touches a comment/docstring/doc, or authoring a rename/sweep"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d02a499f-c4f9-4a64-8064-3fe72205ad96
---

Diff-scoped review has a blind spot: stale content that an earlier change made false stays invisible until someone edits that exact line, and even then the reviewer (and the editing author) checks the change is internally clean, not whether the claim is still true.

Worked example: `CourtConfig`'s class docstring named a "soul-bound height" field. That field (`friendship_bound_y`) left in #724. The docstring lied from then on. #834's friendship->soul rename sweep edited that exact line, renamed "friendship-bound" to "soul-bound", and STILL did not notice the field was gone, it verified spelling, not existence. The same sweep missed `ball-state-ownership-spike.md` still naming `friendship_bound_y`. Only an SH-425 PR that happened to touch the docstring line surfaced it, by chance.

**The rule:** when a diff touches (or sits adjacent to) a line that asserts something about the code, validate the assertion against current reality.
- A docstring naming fields -> do those fields still exist on this class?
- A comment describing behaviour -> does the code still behave that way?
- A doc/comment citing an identifier -> does that identifier still exist under that name?

**Especially for rename/sweep PRs:** renaming a reference is not enough; verify each renamed reference still points at something real. A sweep is the highest-attention pass a line gets; if it only checks spelling, stale claims propagate with a fresh coat of paint.

**How to apply:**
- Reviewer: for any touched comment/docstring/doc line, grep the named identifiers against current code before passing it. Cheap, catches the class.
- Author of a rename/sweep: same grep before committing; a renamed term whose referent was deleted is a worse lie than the old one.
- This is why [[feedback_self_judgment_is_coherence_not_accuracy]] bites in review too: a docstring reads coherent while being false; only checking against ground truth (the actual fields) catches it.
