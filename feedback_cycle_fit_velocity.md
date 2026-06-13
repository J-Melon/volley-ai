---
name: Cycle fit reasons from velocity, not days remaining
description: Judge whether a mission fits the current cycle by velocity, not raw calendar days
type: feedback
originSessionId: d15b1172-9e53-401f-b338-5c126b669606
---
When sizing a mission against the current cycle, reference the cycle's actual velocity (completedScopeHistory / scopeHistory arrays from `list_cycles`) before deciding "fits" or "tight". Don't reason from "N days left" alone.

**Why:** Calendar days don't ship code. A 9pt bundle in 5 days is fine if velocity is averaging 3pt/day and dangerous if it's 1pt/day. Saying "tight" or "acceptable" without the velocity check is hand-waving.

**How to apply:** Pull the active cycle's history before any mission-fit claim. Compute approximate per-day or per-cycle velocity from the arrays, compare against the proposed mission size, and state the comparison explicitly. If the mission exceeds remaining velocity headroom, name that and propose a scope cut or a slip into the next cycle.
