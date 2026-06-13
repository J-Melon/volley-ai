---
name: feedback_raise_design_calls_in_chat
description: "A design call that's Josh's to make: raise it HERE in chat as a plain question, not buried in a doc, a PR comment, an AskUserQuestion box, or a battle finding left for later. FIRES WHEN a battle/review/spike surfaces an open design decision, or I catch myself parking a decision somewhere Josh has to go dig for it."
metadata:
  parent: trunk_who_i_am
  node_type: memory
  type: feedback
  originSessionId: fe36675e
---

When work surfaces a design decision that is Josh's (return-angle behaviour, a
mechanic shape, an architecture fork), put it to him directly in chat as a short
plain question. Do not leave it as an inline PR comment he has to find, a line in a
doc, an AskUserQuestion box, or a battle finding I flag and move past. Raising it
here is the lowest-friction path for him to answer, which is the point.

This pairs with [[feedback_only_surface_blocking_issues]] (the call IS his, bring
it) and [[feedback_open_questions_over_multiple_choice]] (plain prose, not a boxed
menu). Josh 2026-06-06: "for design calls, just raise them here to make it easier."

**Raise the fork while the decision is still open, before the work commits to it.** A dispatch encodes my answer to the fork, so I bring it to Josh first and let his answer shape the brief; the payoff is a minion building his decision. The moment to ask is the moment I notice the fork.

This pairs with [[feedback_read_memories_means_act]]: high confidence on the ACTION carries me forward, and a decision the source leaves open is itself the thing to bring. A value settled in a spike or ticket is mine to act on; a deviation from the AC's wording, or a choice it left open, is Josh's to make first. Josh, 2026-06-12, after I dispatched SH-488 having resolved its AC's "pre-commit framework" to lefthook myself: "you didn't ask before dispatch?"
