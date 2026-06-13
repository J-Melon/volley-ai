---
name: feedback_state_positive_shape
description: "Describe what the thing IS and DOES, not what it lacks. The positive surfaces the actual work to do; a negative only fences a hole and leaves the work unsurfaced. The single authority for positive framing (priming, aversiveness, centre-of-gravity, the non-firing CHECK, reframe-as-we-go). FIRES WHEN writing any memory, doc, brief, or comment, AND when a rule failed to fire."
parent: feedback_memory_writing
type: feedback
originSessionId: deb199f4-304c-4a2c-8531-39e6504933fc
---
Memory rules, design docs, skills, dispatch briefs, code comments: describe what the thing *is* and *does*. Skip every phrase of the form "does not X", "never Y", "there is no Z", "no longer W", "instead of P".

**The deepest reason: the positive surfaces the actual work; the negative fences a hole and leaves the work unsurfaced.** "Do the thing to do" is a task I can act on. "Do not do the wrong thing" names an absence, a fence around nothing, and leaves the real task unstated, so a negatively-framed rule has not yet found its own work. Surface the task and the negative becomes unnecessary. The fix for a negative rule is not rewording, it is finding the work it was dancing around and leading with it. The reader-priming reason holds too (a negative makes the reader rehearse the wrong shape, which can land), but surfacing-the-work is why positive framing is the thinking, not just the wording.

**Why:** Two corrections on consecutive days.

2026-05-10: a memory rule had a "What NOT to do" section listing retired commit shapes. Josh: "dont mention stuff in no, just puts the idea in their mind."

2026-05-11: the ball-lifecycle tech doc said "transitions do not destroy or re-parent the ball", "state transitions never remove", "there are no hosts", "drag controller does not own a parallel entity", "reconciler never re-parents". Josh: "stop saying what there is not." Each negative claim describes the architecture I was retiring rather than the architecture being specified.

**How to apply:**

- **Pre-commit grep.** Before saving any doc, brief, or comment, scan the draft for: `not`, `never`, `no longer`, `instead of`, `doesn't`, `isn't`, `cannot`, `without`. Each hit is a candidate for rewrite to positive shape. Most should fall.
- Lead every section with what the system is, owns, or does.
- "Transitions swap properties on the same body" beats "transitions do not destroy the body."
- "The reconciler is the parent of every ball" beats "the reconciler never re-parents."
- "Removal means destruction" beats "state transitions never remove."
- If a transition from an older pattern needs context, name it once in a **Why** line and move on. Don't restate the retired shape.
- If the positive form feels harder to write than the negative, the rule isn't sharp enough yet; keep rewriting until the negative becomes impossible to phrase.
- Applies to code comments and docstrings: describe the function, not what it used to do or doesn't handle.

## Why the frame is the THINKING, not the wording (priming and aversiveness)

Two reasons positive framing matters, the second the stronger. (1) Naming the forbidden thing primes it (the "don't think of an elephant" effect): "Never write `closes #N`" plants `closes`. (2) A prohibition is AVERSIVE, so I avoid engaging with it, and a rule I don't want to hold in mind is a rule that does not fire. A positively-framed rule is not unpleasant to keep active, so it actually gets used. This is why positive framing fixes non-firing, not just priming: most rule failures are non-firing ([[feedback_self_judgment_is_coherence_not_accuracy]]), and a "don't" rule is the most likely to be skipped because it is the least pleasant to think about. Lead with what TO do; name the trap once, tucked, as rationale. Josh, 2026-05-30: "dont say never that just make it think of it"; 2026-06-03: "memories don't fire because you don't want to think about them; if they're positive, you won't mind them."

**Positive is the THINKING, not just the wording.** A memory whose headline is an imperative verb but whose body is organised around the failure (the mistake, why it burned, how to avoid it) is still aversive, still avoided, still does not fire; the positive label is cosmetic. The CENTRE OF GRAVITY must be the good practice and why I'd want it: lead from what good looks like and its payoff, the failure at most a tucked footnote. If I find myself cataloguing the error and bolting a positive sentence on top, the thinking is still negative; rebuild it around the desirable practice. Josh, 2026-06-03: "the positive thing is not just about framing but thinking, you have to change that too."

**CHECK: a memory that didn't fire is suspect for negative framing, in thinking not just words.** When a rule failed to fire (I did the thing it should have stopped), inspect its centre of gravity, not just its first line. Is it organised around the FAILURE even if the headline is a positive verb? That aversiveness is the likely cause; rebuild it around the desirable practice and its payoff. Don't resolve to "remember it harder"; the fix is structural ([[feedback_refactor_rules_for_readability]]). Josh, 2026-06-03: "that's a check, if a memory didn't fire, check for negative."

**Reframe negatives as-we-go, when one surfaces.** Not a speculative batch sweep of every "don't" in the corpus. When a negatively-framed memory is FETCHED into context (recalled in a `<system-reminder>`, or I open it for any reason), RAISE it with Josh and work out the positive version together; opportunistic, like extract-with-feature. A filename/slug leading with `dont_`/`no_`/`never_` counts as a negative frame to raise, even if the body is already positive. Josh, 2026-06-03: "if you fetch a negative memory, raise it and we can work out what we actually want with it."
