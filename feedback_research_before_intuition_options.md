---
name: for-design-questions-with-real-world-precedent-research-before-riffing-options
description: "When proposing options for a game-mechanic decision, UX pattern, or API shape that has established convention (other games, well-known libraries, prior art), dispatch researcher first. Intuition-derived option lists waste rounds when Josh wanted to see how it's actually done."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 56ba4a44-e553-4f5c-bd77-714693445ba7
---

When Josh asks "how should this feel / behave / shape up" on a system that has clear real-world precedent — paddle physics in racket games, drag-and-drop affordances, save format conventions, idle-game economy curves — the first move is to dispatch the researcher agent with a citation brief, not to draft a 3-option menu from physics intuition.

**Why:** Reinforced 2026-05-12 on SH-316 paddle-offset return angle. Josh was playtesting PR #651, said "it does not feel natural, how are we doing this?" I explained the implementation correctly (offset overwrites incoming angle) then immediately offered three options (offset-additive / clamp-toward-target / keep-overwrite-and-tune) framed as "what most racket sports feel like." Josh: "i dont think so, do some research to see how is the actually done." The three options were plausible but unsourced. He wanted prior art, not my hunch.

**How to apply:**

- When proposing options on a mechanic with obvious precedent, ask whether to research first. Or just dispatch researcher in the background and present the option menu *with citations*, not standalone.
- The researcher tools include WebSearch / WebFetch and context7; that surface covers most "how does the genre actually do this" questions.
- Findings land in `ai/scratchpads/<slug>.md` per [[feedback_research_findings_to_scratchpad]]. Pair with the researcher's findings before the option menu hits Josh.
- Skip this only when the question is truly novel (no prior art exists), or when speed matters more than rigour (Josh has signalled limit pressure).
- Don't claim "this is what racket sports feel like" or similar appeals-to-convention without a citation. If the citation isn't in hand, the claim isn't earned.
