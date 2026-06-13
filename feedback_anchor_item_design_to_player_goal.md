---
name: feedback_anchor_item_design_to_player_goal
description: "Before pitching an item effect or reward, anchor it to the player's real goal in the core loop (keep the cooperative rally alive, gather soul, reconcile, climb levitation; a miss is the only reset). Don't borrow scoring or combat frames that don't exist in the co-op rally."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 5f05a52d-00d0-4a9c-a342-9027c165d0ba
---

When designing an item's effect or its reward, first recall the player's actual goal in the core loop, then make the reward serve it. The loop lives in `designs/concept/the-game.md` and `designs/01-prototype/design/levitation-progression.md`: a cooperative rally, each consecutive hit gathers soul and speeds the ball, hitting the limit reconciles the soul into something stronger and raises the floor, levitation height banks by time aloft, and a miss resets the streak (the only reset).

**Why:** 2026-05-27, brainstorming the goop ball's L3 reward. I proposed "a big hit for a score" and "a power shot", which belong to the competitive duel, not the cooperative rally where there is no score. Josh: "remember the player's goal here." A reward that introduces a foreign objective does not fit what the player is doing.

**How to apply:** re-read or recall the core loop before proposing item mechanics. A good reward helps the player keep the rally alive or climb higher; it should not import scoring, combat, or any objective the co-op rally does not have. Pairs with [[feedback_read_related_docs_first]] and [[project_items_are_gameplay_changers]].
