---
name: Re-fan reviewers when scope materially changes, scoped to the changed diff
description: "Dispatch specialist reviewers when an implementer's push introduces new architectural shape, new public surface, or new behaviour. Do NOT re-fan after mechanical fix pushes (comment compression, UID anchor, dropping unused enum value, lint nits, etc.). Triggers before every reviewer fan-out call on an existing PR."
metadata: 
  node_type: memory
  parent: feedback_re_battle
  type: feedback
  originSessionId: 56ba4a44-e553-4f5c-bd77-714693445ba7
---

Reviewer fan-out is a real cost. Each Agent dispatch consumes a turn, the reviewer posts a Review on the PR, the thread accumulates. Volley PRs with long iteration cycles can end up with 20+ reviews, mostly from my own dispatches, when the actual decision moments were two or three.

## When to re-fan

After an implementer push that introduces material change:

- New module, class, public API surface, or signal.
- New architectural shape (a refactor that moves responsibilities).
- New behaviour or tunable a player or designer would notice.
- A fix that changes math, ordering, or invariants (not just naming or formatting).

## When NOT to re-fan

Mechanical fixes that don't change the diff's behaviour-space:

- Comment compression / one-line vs multi-line.
- Adding `uid=` anchors to .tres files.
- Dropping unused enum values or dead code.
- Renaming a local variable, adjusting whitespace, gdformat passes.
- Updating a test to match a recent behaviour change without changing production.
- Tiny PR-comment dismissals or follow-up nits the prior reviewers already raised.

For these, the prior review verdict still stands. Don't re-fan; just push and let the prior bot synthesis review ride the next push through CI.

## The verdict is the bot synthesis review, never a manual stamp

The reviewer verdict only exists when a reviewer Agent actually reviews and the organiser posts the round's bot synthesis review. **Never fake a verdict by hand.** Sharpened 2026-05-15: Josh "approved is only re-apply on a review, a signal not a checkbox." A faked verdict lies about the signal source.

For pushes that invalidate the prior verdict:
- If the push is material, dispatch a fresh reviewer pass; verdict re-earned through real review and a new synthesis review.
- If the push is mechanical (the cases listed above), the PR can ride to Josh's manual merge without a fresh AI pass. Skip the AI sign-off; do not fake it.

## How to apply at dispatch time

Before any reviewer Agent dispatch on an existing PR, ask: "what's in this diff that the prior reviewers haven't already seen?" If the answer is "nothing material," skip the fan-out. The PR proceeds without re-earning a fresh synthesis review; Josh's manual merge is the approval, and that is his to make.

For new PRs (first review pass), fan-out is the right move. The rule scopes only to RE-fanning.
