---
name: When Josh references his open-development essay, read it before responding
description: designs/research/the-case-for-open-development.md is Josh's load-bearing thesis with worked-out company-scale precedents (Valve, Bay 12, Stardew, Aseprite, Mindustry, Shapez, etc.); don't reach for surface analogies (Dwarf Fortress, "tip jar") when the essay names the actual lineage
type: feedback
originSessionId: 9540bb2a-b9f6-48df-8a1d-63419bcf3e9d
---
When the conversation touches open development, distribution model, pricing posture, or "the goodwill thing", the first move is to grep `/home/josh/gamedev/volley/designs/research/the-case-for-open-development.md` for the specific anchor Josh is invoking. The essay is dense with worked-out cases (the Valve / Steam section runs ~lines 175–189; Aseprite, Mindustry, Shapez are in §§ around 95–97; Stardew, Bay 12, Caves of Qud are 45–65). Reaching for a surface analogue (Dwarf Fortress as a tip-jar reference, a generic "PWYW" framing) when the essay names the precise lineage is the failure mode.

**Why:** Established 2026-05-01 mid-conversation about Volley's prototype pricing. Josh said "vis a vi dwarf fortress" and I locked the analogy as Dwarf Fortress = free-with-donations. He corrected to Aseprite (small fixed price, source-as-escape-hatch). I locked that. He then said "Goes with steam's strategy too" and I read it as "Volley shipped on Steam follows the same model". He had to ask: "did you look at the essay?" The actual answer (Steam-as-a-company is the load-bearing open-development case study, documented in his own published essay) was sitting in `the-case-for-open-development.md` the whole time. Two corrections that wouldn't have happened if I'd grepped the essay before answering.

**How to apply:**
- Triggers: any mention of open development, source availability, pricing posture, the studio's stance on free-vs-paid, devlogs as marketing, "the goodwill thing", "the trust thing", piracy-as-service-problem, the open-development essay itself.
- First move: grep the essay for the relevant keywords before responding. The Valve / Steam section especially is the primary reference for "open at the layers that act as the engine of trust, paid at the layers that fund the work" (Spolsky's complement-commoditisation, named at ~line 103).
- When citing a precedent in conversation, name the essay's source line or section so Josh can verify and so the cite is grounded, not invented.
- This applies to any conversation Josh marks as substantive (pricing, marketing, positioning, distribution); it does not apply to ticket-shape or implementation work that doesn't touch the studio's posture.
- Adjacent rule: `feedback_named_influences_must_be_load_bearing` already covers "characterisations of named influences must be defensible." This rule extends it to *Josh's own published writing*: don't paraphrase the essay from memory when the file is on disk.
