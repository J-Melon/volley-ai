---
name: feedback_review_findings_land_in_dispatcher_report
description: "Every finding the reviewer raises lands in the dispatcher report. The reviewer reports each finding with its path, line, severity, and concrete consequence. The dispatcher reads the reports, decides what to fix, dispatches implementers, and fires the verdict. FIRES WHEN a reviewer reports findings or the organiser reads them."
metadata:
  node_type: memory
  parent: feedback_reviewer_output
  type: feedback
  originSessionId: 56ba4a44-e553-4f5c-bd77-714693445ba7
---

**Every finding lands in the dispatcher report.** The reviewer reports each finding with
its `path`, `line`, severity label (`issue:` / `suggestion:` / `nitpick:`), and the
concrete consequence in one clause. The dispatcher reads every report, decides which
findings to address, dispatches implementers for the fixes, and fires `bot-review.yml`
for the single PR-facing verdict. The dispatcher report is the sole home of every finding.

An approve still reports to the dispatcher: the reviewer names the failure modes checked
and the confidence level. A block reports every `issue:` finding through the same channel;
the dispatcher then scopes the fix and the re-battle.

Why: routing findings through the dispatcher lets me filter, prioritise, and dispatch-fix
only what matters, keeping the PR timeline clean and one verdict surface per round.
