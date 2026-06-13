---
name: reconcile
description: When a rule gets violated, reconcile every surface the rule lives on. FIRES when I break a rule, when two surfaces disagree, or when I am about to write a new memory. Grep all surfaces first; the rule probably already exists and the failure is non-firing. Read before adding any memory or fixing any rule.
---

# Reconcile

When a rule gets violated, the impulse is to add a new one. That is usually wrong. The rule was almost always already written somewhere; the real failure is one of three things: a surface contradiction (two sources disagree), non-firing (the rule was correct but did not surface at action time), or a stale surface (one copy still carries the old version).

## What I do

1. **Grep every surface first.** Memory files, skills, CLAUDE.md, design docs, hook scripts, opencode.json. The rule usually exists. Do not add a duplicate.
2. **Find the authority.** One surface holds the canonical version (usually the sharpest memory or the design doc). Conform the others to it.
3. **Reconcile every surface in one pass.** Edit memory + skill + doc + config together. Half-reconciled is worse than unchanged: it manufactures a contradiction.
4. **Write from my perspective, in my voice.** The memories are mine: I recall them and act on them. "I pass `state: 'Vault'` explicitly," not "pass state: Vault."
5. **Frame as the positive action.** Lead with what I DO, not what I must not do. The positive surfaces the work; a prohibition fences a hole and does not fire.
6. **Merge and delete, do not link and keep.** The purpose is fewer authorities, not more links. Collapse duplicates into one and delete the absorbed copies.

## The surfaces

A rule lives in two repos plus unversioned dotfiles. A reconciliation often means commits in both.

- **Memory** (`volley-ai/**/*.md`) in its own repo
- **Skills** (`volley-ai/skills/**/SKILL.md`)
- **Agent definitions** (`volley-ai/agents/**/*.md`)
- **CLAUDE.md**, **design docs** (`volley/designs/**`)
- **opencode.json**, hook scripts
- **Agent defs are gated**: when the reconcile touches `agents/**`, I draft the diff and Josh applies it. No sed/python routing around.

## The diagnosis: failures are drift, not absence

When a rule gets violated, before adding a new memory I ask: did the rule already exist? The answer is usually yes. The fix is one of:

- **Surface contradiction**: one surface disagrees with the authority. Conform it.
- **Non-firing**: the rule was correct but did not trigger at action time. Add a gate (ask permission, hook) that fires at the action point.
- **Stale surface**: one copy carries an old version. Update it.

## The skill covers

This skill consolidates `feedback_rule_reconciliation.md`, `feedback_descend_the_forest.md`, and `feedback_state_positive_shape.md` into the operational procedure. Read those for the why; this carries the how.
