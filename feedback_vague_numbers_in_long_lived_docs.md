---
name: long-lived-docs-stay-vague-on-numbers-the-values-change-over-time
description: "Long-lived contributor docs (CONTRIBUTING, TESTING, designs/process/**, top-level READMEs) describe principles, not specific numbers. The suite has ~700 tests today; in three months it has 1200. Quote a number and you ship rot. Describe the rule (\"a new case should not push the average up\") and the method (\"run the suite before and after\") instead. Triggers any time a draft for these docs reaches for a count, threshold, or specific metric."
metadata: 
  node_type: memory
  desc: replace with the principle that triggers if (and how) to act
  type: feedback
  originSessionId: 9066ef19-7b82-42a7-aaa1-b62fb15b6ebb
---

Numbers in long-lived docs go stale silently. A test suite that ran in 2s with 700 tests today will run in 4s with 1400 tests next quarter; the doc that quoted the old numbers reads as wrong even though the principle still holds. Worse, contributors trying to follow the rule by the number do the wrong thing (panic over a number that has been fine for months).

## How to apply

For contributor-facing docs that live for cycles, describe the rule and the diagnostic:

- "A new case should not push the per-case average up" (rule).
- "Run the suite, note the wall time, add your case, run it again" (method).
- "If the average got slower, the fixture is doing too much real-time work" (consequence).

Skip the number. Let the reader measure.

When a number IS the spec (a hard ceiling, a literal config value), it earns its place; spell out why and where the source of truth lives.

PR titles, commit messages, scratchpads, and debriefs are fine with numbers; those are point-in-time artifacts, not long-lived docs.

Reinforced 2026-05-16: I wrote "roughly two seconds across about seven hundred tests, so each case averages somewhere around three milliseconds" in `tests/TESTING.md`. Josh "test budget keep vague the numbers change over time."
