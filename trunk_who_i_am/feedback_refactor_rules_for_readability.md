---
name: feedback_refactor_rules_for_readability
description: "When a rule keeps getting violated, restructure it for how AI reads it: tight checklist at the top, high-recall trigger words in the description, concrete patterns to match before acting. The file holds the current rule, not its history; a fresh reader meets the sharpened rule, not a stack of incident logs. FIRES WHEN a rule fails twice, or when touching a memory that has grown incident paragraphs."
metadata: 
  parent: feedback_memory_writing
  node_type: memory
  type: feedback
  originSessionId: 56ba4a44-e553-4f5c-bd77-714693445ba7
---

## The anti-pattern

Memory files accumulate sediment: a tight rule, then "Reinforced 2026-04-24 after X", "Reinforced 2026-05-10 after Y". Each is a war-story explaining a fresh violation; the file grows monotonically and signal-to-noise drops. This is anti-AI: humans retrieve a rule via the incident ("oh yeah, the X one"), but generation does not. The `description:` decides whether the file surfaces, and the body's FIRST paragraphs get attention; mid-file warning prose blurs and gets skimmed. So restructure the file, do not append evidence.

## The restructure

1. **Sharpen `description:`.** Put high-recall triggers there: the moments, phrases, patterns that should fire the rule. "Triggers on `assert_almost_eq(<literal_number>)`" beats "covers test best practice."
2. **Actionable triggers at the TOP of the body.** Concrete patterns and code-shapes to match against before acting. Bury the rule in paragraph 6 and it dies.
3. **ONE concise WHY that names the BOUNDARY, not just the motivation.** A why with only motivation invites incidents that keep WIDENING the rule until it overreaches; naming where it STOPS holds the edge. Three incidents proving the same rule is validation. Incidents each EXTENDING scope (`feedback_delegate_readily` grew to delegate-everything and over-dispatched) is drift: re-bound the rule, do not bolt on the next extension.
4. **Delete the incident log.** "Reinforced YYYY-MM-DD after Y" is a human audit trail; at generation time it is noise. Cut it on the next touch. This file self-applies: if it grows a "Reinforced" paragraph, strip it.

Reducing or splitting a node that has grown big is its own rule: [[feedback_reduce_or_split_big_nodes]].

## On a new incident

Ask whether it fits WITHIN the rule's boundary or pushes PAST it. A fresh instance of the same rule earns a new checklist bullet (and a `description:` trigger update), never a trailing paragraph. An incident that only "fits" by widening scope to bless what I just did is the drift signal: re-bound the rule instead. A fresh file (under 5 days) may carry an annotation before its restructure, scheduled for the next touch.

## Why

Josh, 2026-05-14: "make a memory to stop this reinforced stuff, you need to think about how ai calls this stuff." The em-dash and test-behaviour files both accumulated incident paragraphs that did not improve compliance. This is the write-for-AI-recall axis of [[feedback_rule_reconciliation]].
