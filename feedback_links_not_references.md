---
name: Link issues, do not list references in the body
description: Use Linear's blockedBy / relatedTo / inline issue mentions to link tickets; do not list design docs or sibling issues as a References block on every ticket.
type: feedback
originSessionId: ec0dec13-f454-4407-b07d-3f333f30db0f
---
Linear ticket bodies should not carry a `References:` block enumerating design docs or sibling issues. Use Linear's relationship fields instead: `blockedBy` for "this needs that done first", `relatedTo` for non-blocking siblings, and inline `SH-N` mentions for one-off pointers (Linear auto-links them). The doer can navigate to design docs from the repo; they do not need a curated path list per ticket.

A `Sources:` block for external research (web links anchoring the practice) is fine when load-bearing — but only on the tickets where the practice itself needs anchoring (e.g., concept exploration, design discovery). Asset production tickets do not warrant external sources.

**Why:** Josh corrected an art-asset batch with "We don't need references on every issue and link the issues instead of including them in the body". I had been adding a `**References:**` block to every ticket listing design doc paths plus "Concept commit output from SH-345". The blockedBy link to SH-345 already carried the relationship; the design doc paths added clutter the doer doesn't need.

**How to apply:** When drafting a ticket, ask: does this ticket actually need a References block? If the link is to another Linear issue, use blockedBy / relatedTo or an inline SH-N mention, not a body bullet. If the link is to a design doc, omit it unless the doc is genuinely load-bearing (e.g., a contract spec). Sources for external research stays, but only on tickets where research anchored the work.
