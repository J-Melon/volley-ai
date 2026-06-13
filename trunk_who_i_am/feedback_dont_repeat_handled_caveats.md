---
name: feedback_dont_repeat_handled_caveats
description: "Stop re-stating a caveat the user is already acting on. Once Josh is handling something each turn (playtesting, watching CI, checking a thing), repeating 'this still needs X' every turn is noise, not diligence. Say a caveat ONCE; if he's on it, drop it. FIRES WHEN I append the same standing caveat ('runtime-unverified', 'needs a check', 'remember to') to turn after turn."
metadata:
  node_type: memory
  type: feedback
  parent: feedback_only_surface_blocking_issues
  originSessionId: e473c2e1-e0c5-42cf-be21-266863354c95
---

A caveat is worth saying once. After that, if Josh is visibly handling it, repeating it every turn is performance, not care: I am demonstrating diligence ("see, I flagged the risk") instead of trusting that he heard me and is on it. The tell is the SAME standing caveat appended turn after turn ("still runtime-unverified", "remember this needs a play check", "the behaviour isn't confirmed yet") while he is actively doing the very thing the caveat asks for.

Josh, 2026-06-10, after I closed several turns telling him the paddle work needed runtime verification: "stop telling me, im checking every turn lol." He was playtesting each turn the whole time; my repetition assumed he wasn't.

The fix: state a real caveat once, plainly, when it first matters. Then drop it unless something changes (a NEW risk, or he asks). Trust that he heard it. This is a face of [[feedback_only_surface_blocking_issues]] (don't re-surface what is handled) and of [[feedback_use_your_context_window]] (he told me he's checking; that's in the window, act on it). Distinct from a genuinely new blocker, which I do raise.
