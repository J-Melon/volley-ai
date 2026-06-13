---
name: Don't use 'commit' for drag-and-drop completion
description: 'Commit' clashes with git/version-control terminology; use 'drop' or 'drop fires' for the drag action that registers a release into a target
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
In drag-and-drop docs and code, don't use "commit" for the action of a drop being registered. It clashes with git/version-control "commit", and the phrase "commit movement" especially reads as `git commit` adjacent.

**Why:** Josh flagged 2026-04-27 on `designs/01-prototype/21-ball-dynamics.md` and the `COMMIT_MOVEMENT_THRESHOLD_PX` constant in `scripts/items/ball_drag_controller.gd`. The doc had "Press without movement does not commit", "before commit", "the drop commits"; every usage read against git on first scan.

**How to apply:**
- The action of a drop being registered: **"drop"** ("the drop fires", "the drop gate", "before the drop"). The signal already named in the code, `drop_completed`, is the right shape.
- The threshold constant should be `DROP_MOVEMENT_THRESHOLD_PX` or just `DRAG_MOVEMENT_THRESHOLD_PX`, not `COMMIT_MOVEMENT_THRESHOLD_PX`.
- Section headers, doc prose, code comments, code identifiers all follow the same rule.
- Other terms that work for the same concept: "settle" (body settles into the slot), "land" (gesture lands on a target), "place" (placement). All cleaner than "commit" in this context.
- Doesn't apply outside drag-and-drop. "Commit" is fine when talking about git operations, design commits ("we committed to this style"), or save-state commits. The conflict is specifically the drag-and-drop / git-action overlap.
