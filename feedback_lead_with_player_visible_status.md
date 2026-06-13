---
name: When reporting refactor progress, lead with the player-visible bug status
description: If a refactor mission was triggered by a player-visible bug, every progress report opens by naming whether that bug is fixed. Architectural deliverables come second.
type: feedback
originSessionId: 8cc342c4-0faf-4b52-b150-75abb72d8fcd
---
When a refactor was triggered by a player-visible bug, every status report opens by saying whether the bug is fixed. The architectural progress comes after. Otherwise the reader reads a list of merged PRs as "the mission is done" when the bug is still live.

**Why:** 2026-05-11. Ball-lifecycle refactor was framed as "the DevBallStatePanel row vanishes on grab." Steps 1-6 landed — six PRs, 24 commits — and I reported the stack as "complete." Josh played and the bug was still visible (now at the rack-return step, not the grab step). Stuart's plan had explicitly deferred step 7. When Josh asked "why aren't any of these steps done?" I had to walk back the "complete" framing. The architectural progress was real but I had buried the question Josh actually cared about.

**How to apply:**

- Refactor progress reports open with one of three lines:
  - "Bug fixed. <evidence>." then architectural details.
  - "Bug partially fixed at <symptom>; <other symptom> still live, fixed at step <N>." Architectural details follow.
  - "Bug not fixed yet; foundations in place. Visible fix lands at step <N>." Then architectural details.
- If the refactor was deferred mid-sequence, name the deferral in the same opener, not at the end.
- Same applies to PR descriptions for stacked refactor PRs: each PR body says whether the visible symptom is gone at this step.
- "Stack landed" is not a status. The status is whether the player can still hit the bug.
