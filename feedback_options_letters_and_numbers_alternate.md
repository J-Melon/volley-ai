---
name: When offering options, alternate letters and numbers across nesting levels
description: Outer options letters → sub-options numbers, OR outer numbers → sub-options letters. Stay consistent across sibling sub-questions in the same message; don't mix within a level.
type: feedback
originSessionId: b1489a97-03c8-47b5-a015-d6527748dc96
---
When offering nested options for Josh to call, alternate the marker style across nesting levels:

- Outer options use letters (A, B, C…), sub-options use numbers (1, 2, 3…), OR
- Outer options use numbers (1, 2, 3…), sub-options use letters (a, b, c…).

Stay consistent across sibling sub-questions in the same message. Do not have one outer option's sub-choices in numbers and another outer option's sub-choices in letters.

**Why:** 2026-05-10. Banana Tank PR #603. I posted outer (A, B) with A's sub-choices in numbers (1, 2, 3) and B's sub-choices in letters (a, b). Josh corrected: same nesting level should use the same marker family. Mixing forces him to track two parallel schemes when answering.

**How to apply:**

- Pick one of the two patterns at the start of an options message.
- Inner letters use lowercase to distinguish from outer uppercase letters.
- For deeper nesting (rare), use roman numerals or bullets, not a third style.
- Reply parsing: when Josh writes "A3 ba" or "1c 2a" he is naming outer + inner; alternation makes that unambiguous.
