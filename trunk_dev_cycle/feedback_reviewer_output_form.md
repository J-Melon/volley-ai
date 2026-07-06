---
name: feedback_reviewer_output_form
description: "The form a reviewer's findings take in the dispatcher report. Approve reports silently with failure modes checked. Block reports each finding with path, line, severity, and consequence. Only `issue:` blocks; `nitpick:`/`suggestion:` ride along non-blocking (max 1 nitpick). FIRES WHEN a reviewer is about to report."
metadata:
  node_type: memory
  parent: feedback_reviewer_output
  type: feedback
  originSessionId: 07ac2119-f17c-4c89-bc04-1784125242cb
---

The two outcomes reported to the dispatcher:

- **Approve:** report the verdict, name the failure modes checked, state the confidence
  level. No findings to report. The dispatcher receives this silently.
- **Block:** at least one `issue:`. Report every finding: `path:line`, severity label
  (`issue:` / `suggestion:` / `nitpick:`), and the concrete consequence in one clause.
  At most one `nitpick:` per report. `suggestion:` and `nitpick:` ride along non-blocking;
  only `issue:` gates the verdict.

The report is free-form prose to the dispatcher. It carries enough detail for the
dispatcher to scope a fix and dispatch an implementer without re-reading the diff.
