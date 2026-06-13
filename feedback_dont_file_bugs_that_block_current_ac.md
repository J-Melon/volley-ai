---
name: dont-file-bug-tickets-that-block-the-current-feature-ac-fold-them-in
description: "When a bug surfaces during playtest of a feature PR, decide first whether it blocks the feature's ACs. If yes, fold the fix into the same PR. Only file a separate bug ticket when the bug is genuinely unrelated. Triggers whenever a bug surfaces while playtesting an open PR."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9066ef19-7b82-42a7-aaa1-b62fb15b6ebb
---

A feature PR's AC is the gate to merge. If a playtest bug stops the AC from passing, the bug IS the feature; filing it as a separate ticket peels the AC off and ships an unverified feature.

## How to apply

When a bug surfaces during a feature playtest, the first question is "does fixing this matter for AC verification?":

- **Blocks AC, or makes the feature unusable in the path the AC names:** fold the fix into the current PR. No new ticket. Dispatch the implementer onto the same branch.
- **Touches a contract the feature owns** (the feature's state invariants, the feature's mutation paths, the feature's gates): folds in, even if the bug's symptom looks adjacent. A bug that lets a third path mutate the feature's state mid-use blocks the AC because the AC implicitly assumes the state is consistent.
- **Genuinely unrelated** (different system, the feature still passes its AC without this fix): file a separate ticket in the current cycle, classify as `bug`.

If unsure, ask. Default toward folding; an over-bundled PR is recoverable, a shipped-and-broken AC is not.

## Stop before filing

Before calling `save_issue` with a bug body, stop and write one sentence naming which in-flight PR's AC this would or would not affect. If the answer is "I am not sure," ask Josh before filing. Reflexive filing (three bugs in a row, all reported to belong to the SH-405 surface, all filed without checking AC) breaks the rule even when each filing looked individually reasonable.

Reinforced 2026-05-16 on SH-405. The timeout-paddle-in-ground bug was pre-existing from SH-289 but blocked the equip-flow AC. Josh "The timeout should be folded in." Same playtest surfaced rack-overlap (unrelated, correctly SH-407). Later in the same cycle I reflex-filed SH-411 (timeout auto-toggles autoplay), SH-412 (held removal leaves effect active), and SH-413 (items removable mid-play) without checking. Josh: "that blocks ac so you should have stopped to think but we can defer that anyway." SH-413 in particular touches the equip-flow's state contract (a third mutation path on `item_placements` outside `equip` / `unequip`), so a strict reading would have folded it. The fix is the stop-and-name step before every file.
