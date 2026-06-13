---
name: Spike-flow shape — time-boxed exploration, output is feature tickets
description: A spike answers a question that can't be answered without exploring. The deliverable is feature issues filed in Linear, not the writeup. A spike without tickets is unfinished.
type: feedback
originSessionId: 8cc342c4-0faf-4b52-b150-75abb72d8fcd
---
A spike mission's entry is a question that can't be answered without exploring code, prototyping, or research. Time-boxed up front.

**Shape.** A writeup (in `ai/scratchpads/` by default; promoted to `designs/research/` only when Josh elevates it — see `feedback_research_findings_to_scratchpad`) and often a throwaway prototype branch. The prototype is for evidence, not for merging.

**Deliverable.** **Feature issues filed in Linear.** The writeup is a vehicle; the tickets are what carries the value forward. A spike that ends without feature issues is unfinished — the question got answered, but nothing acts on the answer.

**Done when.** Linear has the tickets that the spike's findings unlocked. The writeup may stay in scratchpads or get promoted; the tickets are the load-bearing artifact.

**Reporting discipline.** Spike progress reports lead with the open question and what's been learned, not with code. At spike close, the report names the tickets that were filed.

**When this flow is wrong.** If the question is small enough to answer with a single grep or a quick read, don't spike — just answer it inline. If the question turns out to need a prototype that ships, promote to a feature mission and dispatch under the new shape.
