---
name: ticket-user-story-shape
description: The user-story ticket shape: actor, want, so-that, ACs. FIRES WHEN I draft a user-facing feature ticket.
node_type: memory
type: feedback
parent: feedback_ticket_shape
---

A user-story ticket frames the work from a human user's experience:

```
As a player,
I want <capability>.
So that <payoff>.
```

Then the AC checklist. The actor is usually the player, but it can be any human user (a designer, the team working its own board).

The body is the so-that and its ACs. Everything else lives elsewhere: design detail in a linked doc, sibling and parent links in their fields, the kind in the label. Keep the body under twelve lines.

Each AC is a checkable outcome the user observes. Phrase each AC as the result, in fresh words. The implementation lives in the linked spike or design doc.
