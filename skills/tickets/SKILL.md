---
name: file-issue
description: How to file a Linear issue: user story, system story, or bug report. The title, outcome-ACs, and links for each shape. Read BEFORE drafting any issue prose, including a chat proposal to Josh and any save_issue call. Load it before showing the draft, not before the save.
---

# Filing an issue

An issue is its so-that: a reason to do work, written from the user's experience. Name the outcome the user gets. The user is usually the player, but it can be any human user (a designer, the team working its own board), so write from whoever's experience the work serves.

## The three shapes

An issue is a **user story**, a **system story**, or a **bug report**. The user story is the default; the others are for narrower cases below.

### User story

```
**As a** player,
**I want** <capability>.
**So that** <payoff>.
```

Then the AC checklist. The actor is usually the player, but it can be any human user.

### System story

A bare action verb opens, in bold, no square brackets:

```
**<VERB>** <statement>
So that <reason>.
```

Then the AC checklist. Keep a system story for work whose subject is genuinely the system with no human user to name.

### Bug report

```
Summary: <one line>

Steps to Reproduce:
1. <action>
2. <action>

Expected: <what should happen>

Actual: <what happens instead>

Environment: <Godot version, build type>

Acceptance Criteria:
- [ ] <outcome the player observes>
```

## Title

Name what the work is about in a phrase that reads alone on the project list, 25 to 30 characters (ceiling 50). Pick the noun that already implies the activity. The label carries the kind and the project carries the context, so the title spends its space on the subject alone.

## Body

The user story fits discoveries and spikes too. Keep a system story for work whose subject is genuinely the system with no human user to name, so it stays rare. Punctuate each shape as full sentences. Keep the body under twelve lines: the so-that and its ACs, with the depth living in linked docs.

### Acceptance criteria

Each AC is a checkable outcome: for a user story, what the player observes; for a system story, the system's observable behaviour or property. The implementation (class, method, field, save shape) lives in the linked spike or design doc. Phrase each AC as the result, in fresh words.

### Keep the body to the story

The body is the so-that and its ACs. Everything else lives elsewhere: design detail in a linked doc, sibling and parent links in their fields, the kind in the label. Trust the reader to follow a link.

## Links over restatement

Attach design docs, scratchpads, PRs, and commits as `links`; relate sibling and parent issues via `relatedTo` and `parentId`; record blocking via `blockedBy`. If a fact only matters to the file-time reader, it belongs in a link.

## Self check before save

A finished issue is one story shape inside twelve lines, a title that names the subject and reads alone, a human user as the actor, and ACs that each name an outcome the user observes, with every supporting fact attached as a link.
