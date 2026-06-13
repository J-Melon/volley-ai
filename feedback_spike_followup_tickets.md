---
name: Finishing a spike requires follow-up issues filed after merge
description: A spike is not done when its challenge merges; after merge, file the follow-up issues the spike produces, relate each to the spike issue plus attach its decision doc, then move the spike to Done
type: feedback
originSessionId: 60225dfd-277e-4c4b-8ef4-5843bb535764
---
A spike issue is not finished at merge. A spike's purpose is to produce decisions and a concrete list of what-comes-next. Until those follow-up issues exist in Linear, the spike has not finished its job, regardless of the challenge state.

**Why:** Spikes often close open questions and surface new implementation tasks. If those tasks are not filed, the spike's output rots in the design doc instead of landing on someone's queue. Tying issue creation to the spike's own completion keeps the design-to-delivery chain legible.

**How to apply:**

Immediately after a spike challenge merges:

1. Read the spike's design doc for any "Resolved into issues", "Open questions", or implementation section that names concrete follow-up work.
2. File each follow-up as its own Linear issue in the appropriate project with a sensible label (`feature`, `spike`, `bug`).
3. Link each follow-up to the spike on TWO surfaces: a Linear `relatedTo` relation to the spike ISSUE, and the decision DOC attached via the `links` field. A body-text reference is not enough; Josh asked for the issue relation explicitly (2026-06-11, the settings spike's SH-490 to 493). Links over restatement: do not paste the doc path inline in the body.
4. Only then transition the spike issue to Done.

If the spike produces no follow-up work (rare), note that explicitly in the spike's description before marking Done so the chain is visible in the issue history.

For playtest bugs against a spike's output, route them per the release-blocking rule (`feedback_playtest_bug_urgency.md`), not as spike follow-ups.