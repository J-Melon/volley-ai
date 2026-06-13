---
name: Projects finishing within a cycle must be scoped in or moved
description: any project with a target date inside a cycle needs to be either scoped into that cycle or have its dates moved; no orphan finishes
type: feedback
originSessionId: 63a922cb-9834-46c0-b48d-fd28a7512bb9
---
If a project's `targetDate` falls inside a cycle (or is already past and the project hasn't finished), the project has to be either scoped into that cycle (issues promoted to Ready, pulled in, worked) or the dates have to move (Josh-directed).

**Why:** A target date is a commitment to the initiative's timeline. Leaving a project's target inside a cycle without planning the work to land it in that cycle means the commitment is fictional. Josh flagged this on 2026-04-20 after I treated Security Hygiene as out-of-scope for Dougal despite its open issues being past due.

**How to apply:**
- During cycle prep, list every project whose `targetDate` falls inside the cycle plus every project whose `targetDate` is already past with open issues. Each one must be either:
  - Scoped in: its remaining issues promoted to Ready and added to the cycle; or
  - Moved: Josh-directed date change to a later cycle.
- Don't silently drop an overdue project. Surface it so Josh can decide in/move.
- Applies to parallel/foundation projects too; their target dates are just as committed.
