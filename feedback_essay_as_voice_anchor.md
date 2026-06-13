---
name: Essay is the voice anchor for prose work
description: Any minion writing or reviewing Volley prose preloads designs/research/the-case-for-open-development.md before touching the doc; STYLE.md alone is insufficient
type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---
Any minion writing or reviewing prose for Volley reads `designs/research/the-case-for-open-development.md` (the open-development essay, 600+ lines of Josh's own long-form prose) before producing or judging output. STYLE.md gives the rules but does not transfer voice; the essay does.

**Why:** 2026-04-25, Josh on the artist world bible after three rewrite rounds: "Why is the writing style so artificial? Did they see the essay and that style doc?" The answer was no: Esker (writer) was given `artist-brief.md` and `mood-boards.md` as tone references, neither of which is in Josh's hand long-form. Arthur (voice reviewer) was given STYLE.md but no writer was. The result was prose calibrated to other agent-authored docs, not to Josh's actual voice. Predictable artificiality.

**How to apply:**

- Before writing or reviewing any Volley prose surface (bible, essay, README, CONTRIBUTING, designs/**, ai/*.md), read at least the opening sections of `designs/research/the-case-for-open-development.md`. Skim the rest. Capture cadence, sentence-length variation, paragraph shape, where Josh lands a beat, where he lets a sentence run.
- The essay is now a preload pointer in `.claude/agents/docs-tender.md` and `.claude/agents/docs-and-writing.md`. When dispatching general-purpose agents to do prose work, name the essay explicitly in the brief; sub-agents see the .md anchors automatically when they share a name with the agent file.
- The signal that the calibration is missing: prose that reads "fine" line by line but feels generically AI when read aloud. Stilted opening descriptions, forced parallelism, hedge stacks, soft closes, lifted-from-other-agent-docs phrasing.
- This rule is the prose-equivalent of "read the design docs before writing code." Voice is not a layer to add at the end; it has to be present from the first sentence written.

**For the writing-Battle six dimensions (SH-272 follow-on):** the voice-reviewer's brief MUST cite the essay as the comparison anchor, not just STYLE.md. The other five dimensions (fact-checker, linguistic, form, prosody, structural) cite the essay too where their dimension touches voice (linguistic and prosody especially).

**Carve-out:** purely technical documentation (engine pipelines, tool reference, architecture diagrams) can lean on STYLE.md alone since voice load is low. Anything player-facing, contributor-facing, artist-facing, or narrative-adjacent reads the essay first.
