---
name: Numbered replies may refer to an earlier list
description: When Josh replies with a bare number or letter (1, 2, a, b), don't assume it maps to the most recent numbered list; confirm which list he meant when ambiguous
type: feedback
originSessionId: dfb51429-dfc0-47c3-890d-afd0f8559c9a
---
When Josh answers a multiple-choice question with just a number or letter, he may be picking from an *earlier* numbered list in the conversation, not the most recent one. If more than one numbered list is live in the thread, stop and ask which list the answer refers to before acting. Small cost (one clarifying question) vs large cost (wrong work + a revert).

**Why:** Happened once in the label-ordering thread; two numbered lists were live (one about where the label sorts, one about hiding bot labels). Reading "1" as the most recent list produced a challenge that solved the wrong problem.

**How to apply:** Before acting on a bare number/letter answer, scan the recent conversation for multiple numbered lists. If more than one is live, ask "option 1 from list X or list Y?" rather than assuming.
