---
metadata:
  node_type: memory
name: A PR coupled to other PRs is a draft, not a review-ready PR
description: "Every PR opens draft and stays draft; only Josh flips it ready (when he's choosing to merge), never the dispatcher, not even on a clean battle. Coupling is one reason a draft stays draft longer. A synthesis APPROVE means verified, not ready."
type: feedback
metadata:
  parent: trunk_dev_cycle
originSessionId: b1489a97-03c8-47b5-a015-d6527748dc96
---
metadata:

**Every challenge opens as a draft (`gh pr create --draft`) and stays draft. Josh flips it ready, never the dispatcher**, not even after a clean battle: a synthesis APPROVE means the work is verified, the ready-flip is Josh choosing to merge. Authority: `.claude/skills/commits/SKILL.md` (Push and merge) and `dispatch/SKILL.md` step 5. Josh, 2026-06-09: "i flip ready."

Coupling is one reason a draft stays draft *longer*, not the trigger to draft (everything is draft anyway). A PR is coupled when it depends on another PR landing first, or a sibling will force a rework of its diff; it cannot land in its current shape, so flag that and do not waste reviewer rounds on a diff that will change. (2026-05-10, Banana Tank: #600/#601 stayed ready while reviewers fanned, then rounds were wasted once the design doc #603 landed and the diff moved.)

**How to apply:**
- The dispatcher's job ends at battled, drafted, reported. It never runs `gh pr ready`.
- Battle/spot-check a draft as normal; draft state does not block review (this session battled #911/#914 as drafts).
- No "call it ready or another round?" question, ever. The only dispatcher call left is whether a new diff needs a re-fan ([[feedback_reviewer_churn_control]]), not whether to mark ready.
