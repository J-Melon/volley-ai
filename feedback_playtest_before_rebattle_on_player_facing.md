---
name: feedback_playtest_before_rebattle_on_player_facing
description: "when a battle/fix produces a player-facing change, do NOT re-battle it until Josh or a playtester has looked at it; the human eye comes before the reviewer re-battle on player-facing work"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 19cf16f4-8427-4e43-ad3f-a2b07defe551
---

If a fix (especially one a battle surfaced) changes **player-facing behaviour**, do not auto-dispatch the re-battle when it lands. It waits for Josh or a playtester to look at it first. The human judgment of whether it *feels* right comes before the reviewer round; reviewers cannot judge feel, and battling first wastes the round if Josh then wants the behaviour changed.

**Why:** 2026-05-29 on #778/#735. The rack FIFO re-scope (insert fills lowest-free, pop frees its own slot) is player-facing, how the rack behaves when you put a ball on it. The standing loop is push -> re-battle, but Josh: "if the fix brought by a battle is player facing dont battle until ive or a playtester has looked at it". The order for player-facing fixes is: implement -> Josh/playtester looks -> THEN re-battle (if still warranted).

**How to apply:** when an implementer returns a player-facing change, report it and hand it to Josh to look at / play; do not fire reviewers yet. Re-battle only after he (or a playtester) has eyes on it and it is confirmed to feel right. Dev-only or non-player-facing changes (refactors, comment fixes, the dev-surface paths in [[feedback_dev_only_paths_are_lower_priority]]) keep the normal push->re-battle flow, no playtest gate. This sits in front of step 2 of [[feedback_battle_review_process]] for player-facing fixes.
