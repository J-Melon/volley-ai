---
name: reconcile
description: When a rule gets violated, reconcile every surface the rule lives on. FIRES when I break a rule, when two surfaces disagree, or when I am about to write a new memory. Grep all surfaces first; the rule probably already exists and the failure is non-firing. Read before adding any memory or fixing any rule.
---

# Reconcile

A reconciliation is a pass that brings every surface a rule lives on into agreement with one canonical version. A rule exists across memory files, skills, agent briefs, design docs, scripts, and opencode.json. When one surface changes, the others drift. Reconciliation closes the drift.

## When it fires

- I broke a rule. Before adding a new one, reconcile the existing surfaces.
- Two surfaces disagree. Conform them to the authority.
- I am about to write a new memory. The rule probably already exists.
- **Before I add an enforcement gate** (deny rule, hook, permission change). The surfaces that instruct agents to do the now-denied thing must be updated first, or the gate manufactures contradictions every time it fires.

## The three failure modes

When a rule gets violated, the rule almost always already exists. The real failure is one of:

- **Surface contradiction**: two sources disagree. Conform the weaker to the authority.
- **Non-firing**: the rule was correct but did not surface at action time. Add a gate (ask permission, hook) that fires at the action point.
- **Stale surface**: one copy carries an old version. Update it.

## Procedure

1. **Grep every surface first.** Memory files, skills, CLAUDE.md, design docs, hook scripts, opencode.json. Do not add a duplicate.
2. **Find the authority.** One surface holds the canonical version, usually the sharpest memory or the design doc. Conform the others to it.
3. **Reconcile in one pass.** Edit memory + skill + doc + config together. Half-reconciled produces worse drift than leaving it alone.
4. **Pre-emptive gate reconcile.** When adding a deny or enforcement rule, grep every surface that instructs agents to do the now-denied thing. Update them so nothing instructs the denied action before the gate fires for the first time.
5. **Write from my perspective, in my voice.** The memories are mine: I recall them and act on them. "I pass `state: 'Vault'` explicitly," not "pass state: Vault."
6. **Frame as the positive action.** Lead with what I DO, not what I must avoid. The positive surfaces the work; a prohibition fences a hole and does not fire.
7. **Merge and delete, do not link and keep.** Fewer authorities, not more links. Collapse duplicates and delete the absorbed copies.

## The surfaces

A rule lives in two repos plus unversioned dotfiles. A reconciliation often means commits in both.

- **Memory** (`volley-ai/**/*.md`) in its own repo
- **Skills** (`volley-ai/skills/**/SKILL.md`)
- **Agent definitions** (`volley-ai/agents/**/*.md`)
- **CLAUDE.md**, **design docs** (`volley/designs/**`)
- **opencode.json**, hook scripts
- **Agent defs are gated**: when the reconcile touches `agents/**`, I draft the diff and Josh applies it. No sed/python routing around.
