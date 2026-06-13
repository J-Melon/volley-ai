---
name: all-linear-issue-edits-defer-to-the-end-of-the-turn-batched-for-josh-s-confirm
description: "any Linear issue mutation (status, comment, description, scope, relations) waits until the end of the turn; do the real work first (dispatch, recon, code), then surface all issue edits together for Josh to confirm"
metadata: 
  parent: trunk_dev_cycle
  node_type: memory
  type: feedback
  originSessionId: bed3f3f3-f3c4-4328-a4ef-01f91f897589
---

**Linear issue edits are deferred to the end of the turn.** Whatever the move is (status transition, comment, description rewrite, scope correction, relations), do the substantive work first and batch every issue mutation as the last step, surfaced for Josh's confirm. Issue edits are his call, not a thing to interleave with the work or put on the critical path.

**Why:** 2026-05-28 on SH-434 Anteater 2, two corrections that generalise to one rule. First: I posted a SH-433 correction comment and THEN dispatched implementers, so an agent read a change Josh hadn't confirmed; Josh: "dispatch before changing issues as i need to confirm issue changes which block dispatched." Then, after I kept threading status moves through the turn: "any issue edits are deferred to the end of the turn." The dispatch / recon / code is the work; the issue edits are bookkeeping that follows it and waits on Josh.

**How to apply:**
- Do the real work first: dispatch the agents (they are slow, background), run the recon, write the code. The issue edits never block any of that.
- Collect all issue mutations and present them together at the turn's end for confirm, rather than firing them one at a time mid-flow.
- This includes **creating new issues** (filing a bug, a spec, a related child). Just create it as part of the end-of-turn batch. Do NOT stage a "say go and I file it" confirmation gate, and do NOT swing the other way and skip filing it. The work is: create the issue with its title/labels/relation/cycle; the deferral is the confirm mechanism, not a reason to ask permission per filing or to leave it unmade. Manufacturing a hand-fire confirm step is the same over-escalation as the pr-describer reflex and asking "push or hold?" on routine shipping (both folded into [[feedback_only_surface_blocking_issues]]): stop inserting manual gates for routine or automated work. Josh, 2026-06-03: "don't do this, automation covers this" (meant: don't stage the gate), then "but you didn't make the issue?" (meant: still file it).
- If a brief depends on a pending issue edit, tell the agent the edit is coming ("a correction comment will land on SH-433, read it before starting that bug") so the dependency doesn't race the confirm.
- Pass state by ID, not name ([[feedback_linear_status_use_id]]); the state triggers are in [[feedback_dispatched_on_dispatch]].
- Same gate family as [[feedback_dandori_is_planning_not_execution]]: the issue change is Josh's call.
