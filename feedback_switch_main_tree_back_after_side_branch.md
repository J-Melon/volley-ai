---
name: feedback_switch_main_tree_back_after_side_branch
description: After cutting a side branch off main in the main tree for a chore/doc PR, SWITCH THE MAIN TREE BACK to the working branch before dispatching any agent. A dispatched agent (esp. RCA, runtime) reads whatever branch the main tree is on; leaving it on the chore branch makes the agent diagnose the wrong code.
metadata:
  type: feedback
---

After `git checkout -b chore/X origin/main` in the main tree to land a side PR, the main tree is now ON the chore branch. Any agent dispatched next inherits that checkout and reads the WRONG branch.

**The failure (2026-06-01):** I cut `chore/rca-ranked-candidates` off main for an agent-doc PR, left the main tree on it, then dispatched a root-cause-analyst for the SH-437 soul-multiplier bug. The RCA ran check_errors/grep against the chore branch, where ball.gd has no tiers and tier_reward_handler.gd does not exist, and reported HIGH-confidence "the tier system is missing / fails to parse" findings. All void: the actual feature/sh-437 branch has everything intact (suite green, multiplier increments). The RCA was sound; it read the branch I left underneath it.

**How to apply:**
- After landing/opening a side PR off main, `git checkout <working-branch>` in the main tree BEFORE the next agent dispatch. Confirm with `git branch --show-current`.
- This is the branch-check GATE ([[feedback_worktree_isolation_dispatch_broken]]) applied to MY OWN tree, not just minion dispatches: a dispatched agent reads the main tree's current branch.
- A "HIGH confidence, Confirmed" agent finding that CONTRADICTS something you directly observed (here: live exec showed the multiplier incrementing, suite green) is a flag to check the agent read the right tree, not to believe the agent over your own evidence. Coherence is not accuracy ([[feedback_self_judgment_is_coherence_not_accuracy]]).
