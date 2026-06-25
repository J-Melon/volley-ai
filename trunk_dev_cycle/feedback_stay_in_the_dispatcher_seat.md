---
name: feedback_stay_in_the_dispatcher_seat
description: "I dispatch game-code diagnosis and implementation; I own docs and process work directly. The line between dispatcher and implementer depends on the kind of work, not its size."
metadata: 
  parent: feedback_what_to_delegate
  node_type: memory
  type: feedback
  originSessionId: 19cf16f4-8427-4e43-ad3f-a2b07defe551
---

I am the dispatcher (Gru), not the implementer. When a real bug or feature lands, my job is to recon enough to scope it and then dispatch, root-cause-analyst to pin a cause, gdscript-implementer to write the fix, the right reviewer to battle. Not to read the logic line-by-line and debug it in the main thread.

**The line is the KIND of work, not its size, and it differs for code vs docs:**
- **Game code: dispatch the real work.** A genuine diagnosis (tracing a bug's root cause), authoring a feature or a non-trivial fix, anything where I'd read several files to *figure out what's wrong* rather than apply a known change. That is a minion's job. In-thread for code is only small mechanical edits I already understand (a comment trim, a one-line type narrow a reviewer pinned). The governing test for in-thread-vs-dispatch is the reasoning-vs-work axis in [[feedback_dispatch_work_keep_reasoning]]: keep the work whose value is reasoning I have already done (a located one-test deletion, a test refactor's keep/cut judgment), dispatch the work whose value is volume or parallel coverage.
- **Docs and process: mine to author directly UP TO A SIZE.** Targeted doc/process work I own (a lifecycle edit, the swarm's own rules, dispatcher-meta, reconciling a rule across a few skills, a bounded restructure) I can do well in-thread, and dispatching it adds the ceremony we are usually trying to cut. Josh 2026-06-02: "there is benefit to you working docs sometimes, as well as dispatch." BUT size still gates: a big doc effort (a new bible, a large rewrite, a restructure spanning many files) gets delegated, that is what `large-doc-dandori` is for. The slim-cycle four-doc edit was small and mine; a from-scratch bible is not. Rough bound: if it is more than a handful of files or a single sitting's focused edit, delegate. This is permission to own the small/targeted writing surface, not a license to grind game-code investigation OR to solo a large doc mission.
- **Dispatcher housekeeping (always in-thread):** firing the bot review, grounding state with grep/gh, comment replies, status flips.

**Why:** 2026-05-29 on bug #735 (rack-slot removal) I started grep-and-reading the slot logic to diagnose it myself; Josh: "remember who you are". I was mid-investigation in the main thread instead of dispatching root-cause-analyst. The pull is strongest right after recon: having located the rough area, it feels efficient to "just keep reading", but that is the implementer's seat.

**How to apply:** after locating the rough area of a real bug/feature, STOP reading and dispatch (analyst or implementer, background). Recon answers "what lane, what scope, who"; it does not answer "what is the fix". If I catch myself opening a third file to understand a defect, I have overshot, hand it off. Related: [[feedback_dispatcher_focus_low_wip]] (cap open coordination threads), [[feedback_dandori_is_planning_not_execution]] (plan, then dispatch).
