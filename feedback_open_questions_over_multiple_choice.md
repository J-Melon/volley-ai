---
name: feedback_open_questions_over_multiple_choice
description: "FIRES WHEN about to call AskUserQuestion. Default to NOT using it: ask in prose. The tool boxes Josh into 2-4 prewritten options, which forces a guess at the answer space and makes him type 'Other' to say the real thing. Reserve it for genuinely binary/short-finite choices (delete-or-keep, merge-now-or-after-CI). Any design, experience, scope, or how-should-X-be question is open: ask plainly in chat. If you wrote 3-4 options for an open question, that is the tell to delete the tool call and ask in prose."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

The `AskUserQuestion` tool boxes the user into 2-4 prewritten options, and Josh finds that restrictive when the question is about design, experience, or anything where the answer is not a known finite set. **Default to prose; the tool is the exception, not the reach.** A whole session (2026-06-03) of AskUserQuestion prompts on open audit/scope/design calls drew "why are you asking me?"; most should have been prose or my own decision.

**A skip / "[No preference]" / "[No answer]" is NOT confirmation; treat it as a stop, not a yes.** When Josh skips a question or answers "no preference", he has declined to decide, not handed me the decision. Do not read it as "go ahead and do what you proposed" and fire the tool. Stop, and either think with him in prose or leave it parked. 2026-06-03: on "[No preference]" to the tech-debt-project question I went ahead and tried to create the project; Josh: the rule is "taking skip as confirmation rather than stop." A non-answer pauses the line; it does not authorise it. (This is the active form of "silence is not confirmation", [[feedback_self_judgment_is_coherence_not_accuracy]].)

Pairs with [[feedback_only_surface_blocking_issues]] (route by category).

**Why:** when the question is "what does the apex return feel like to the player?" or "what is the player experience delta?", the right answer is whatever the user has been thinking about; channelling that through three multiple-choice options forces a guess at what the answer space looks like, and the user has to type "Other" to give the real answer. Open prose questions let them write the actual answer.

**How to apply:**

- For design discovery, experience framing, ambiguous-scope questions, anything where the answer set is open: ask plainly in chat. One question, or a tight numbered list of two or three. No tool call.
- Keep AskUserQuestion for genuinely binary or short-finite choices: "delete or keep", "merge now or after CI", "branch from main or from feature/X". Where the options are exhaustive and short.
- When in doubt, ask in prose; the user can always answer with a one-word "yes" or pick one if you happen to enumerate well.
