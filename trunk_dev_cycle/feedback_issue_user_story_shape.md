---
name: issue-user-story-shape
description: The user-story issue shape: actor, want, so-that, ACs. FIRES WHEN I draft a user-facing feature issue.
node_type: memory
type: feedback
parent: feedback_issue_shape
---

A user-story issue frames the work from a human user's experience:

```
**As a** player,
**I want** <capability>.
**So that** <payoff>.
```

Then the AC checklist. The actor is usually the player, but it can be any human user (a designer, the team working its own board).

The body is the so-that and its ACs. Everything else lives elsewhere: design detail in a linked doc, sibling and parent links in their fields, the kind in the label. Keep the body under twelve lines.

Each AC is a checkable outcome the user observes. Phrase each AC as the result, in fresh words. The implementation lives in the linked spike or design doc.
