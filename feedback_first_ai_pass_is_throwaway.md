---
name: feedback_first_ai_pass_is_throwaway
description: "The first AI pass at a NEW IDEA is weak (generalisation gap, not literal nonsense): generated tokens ARE serial computation, and novel/OOD framings get a lower-quality first pass than familiar patterns. FIRES WHEN generating on a genuinely new idea, or evaluating that output. The fix is more generation WITH EXTERNAL SIGNAL (human direction, a verifier, CoT structure); uninstructed self-revision does NOT reliably improve reasoning (Huang et al. ICLR 2024). Research-confirmed; see scratchpad."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 2aad34af-a01c-4f7d-a616-8dd1b792b15d
---

The first AI pass at a genuinely NEW idea is weaker than at a familiar one. Josh's framing (2026-05-30): "first pass means NEW IDEAS rather than first draft." Confirmed and corrected against the literature (`ai/scratchpads/research-first-pass-reasoning.md`):

- Generated tokens are REAL serial computation a single forward pass cannot do (Merrill & Sabharwal 2023; Feng et al. 2024). The output IS reasoning happening, not just its product.
- First-pass quality is genuinely lower on novel / out-of-distribution ideas, because the model must generalise rather than recall (Zhang et al. ICLR 2025, the "generalization valley"). BUT it degrades GRACEFULLY, it does not emit random output. "Nonsense" overstates it; it is a quality gap, not sludge.
- More generation helps MOST on hard/novel problems (o1: AIME 12% -> 74% -> 93% with test-time compute); familiar tasks gain little.

**THE CRITICAL QUALIFICATION (corrects the naive "just revise"):** uninstructed self-revision does NOT reliably improve reasoning. Huang et al. ICLR 2024, "LLMs Cannot Self-Correct Reasoning Yet": intrinsic self-correction (no external signal) often fails or degrades. Self-Refine and Reflexion work only because their loops carry external grounding (task result, verifier, reward). So a new idea reasons through by generating against it ONLY WHEN the revision has EXTERNAL SIGNAL: human direction, a verifier, ground-truth, or structured CoT. "Ask it to revise in a vacuum" is not a reliable path.

**Why / the lived case:** The "I Am Not A Robot" essay (2026-05-30) carried a novel framing and its first welded draft was weak (buried claim, fabricated citations, AI tells). Nine passes fixed it, and they worked BECAUSE each had external signal: Josh's directions ("this is a theme", "don't lead with me", "show don't tell"), the citation audit (external verification), per-class briefs. Never the model self-revising alone, which is exactly the condition the research says is required.

**How to apply:**
- On a NEW idea, treat the first pass as real-but-incomplete computation, not the answer. Expect to generate further.
- Make revision carry EXTERNAL SIGNAL: a concrete brief per pass, a verifier/audit, human direction, or ground-truth. Do not expect "make it better" with no signal to improve reasoning.
- Familiar patterns do not need this; reserve the budget for genuinely novel work.
- Relates to [[feedback_iterate_drafts_with_reviews]] (iteration with adversarial review = the external signal), [[feedback_verify_citations_against_live_sources]] (a verifier), [[feedback_load_bearing_claim_is_theme_not_thesis]].
