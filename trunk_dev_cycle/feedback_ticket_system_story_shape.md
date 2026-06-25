---
name: ticket-system-story-shape
description: The system-story ticket shape: bare verb, statement, so-that, ACs. FIRES WHEN I draft a refactor, extraction, or infrastructure ticket with no human actor.
node_type: memory
type: feedback
parent: feedback_ticket_shape
---

A system-story ticket frames work whose subject is genuinely the system with no human user to name. It opens with a bare action verb in bold:

```
**<VERB>** <statement>
So that <reason>.
```

Then the AC checklist. The verb is bare text, no square brackets. Punctuate as full sentences. Keep the body under twelve lines.

Each AC is a checkable outcome: the system's observable behaviour or property. The implementation lives in the linked design doc.

Keep a system story for work whose subject is genuinely the system. When a human user exists, use a user story instead.
