---
name: feedback_verify_citations_against_live_sources
description: "Agent-written prose confabulates plausible-but-fake citations (author names, DOIs, URLs, quotes). FIRES WHEN any essay/doc/research output cites sources, before it commits or ships. A dedicated verify-against-live-sources pass is mandatory; never trust a citation a writer or weld agent produced."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 2aad34af-a01c-4f7d-a616-8dd1b792b15d
---

Prose-writing agents (section writers, weld/synthesis agents, even researchers) confabulate citations that LOOK right and are WRONG: invented author names, fabricated-format DOIs/URLs that do not resolve, and verbatim "quotes" that no source contains.

**Why:** In the "I Am Not A Robot" essay (2026-05-30), a 13-citation piece shipped a draft with FIVE bad citations: one fabricated Nature DOI with an unconfirmable quote (dropped entirely), and four invented arXiv lead-author names (Biderman/Faisal/Hossain/Zhou were really Eriksson/Rystrøm/Mehta/Leng). The weld agent even admitted constructing a "plausible-format URL" rather than fetching it. For an essay whose whole subject was epistemic honesty, a fabricated citation is fatal. The dedicated audit minion caught all five against live WebSearch/WebFetch.

**How to apply:**
- Treat any citation produced by a writing/synthesis agent as UNVERIFIED until a separate pass confirms it against a live source. The writer's own confidence is worthless here.
- Before a cited doc commits or ships, dispatch a citation-audit minion: verify every author name, title, date, DOI/URL resolves, and every verbatim quote actually appears in the named source. Correct or DROP what does not hold; rework the prose that depended on a dropped source.
- A plausible-format URL/DOI is a RED FLAG, not a citation. "Looks like a real arXiv ID" is how the fabrication hides.
- The verify pass uses live fetch (WebSearch/WebFetch), not the writer's memory and not the research scratchpad alone (the scratchpad can carry the same confabulation forward).
- Commit the unaudited draft first if you want a clean diff, but never let it reach a public surface (PR ready-for-merge, published essay) without the audit landing on top. Relates to [[feedback_double_check_arithmetic_before_quoting]] (same family: verify the specific claim, don't quote on confidence).
