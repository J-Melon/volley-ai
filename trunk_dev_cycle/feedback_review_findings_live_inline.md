---
name: feedback_review_findings_live_inline
description: "Every finding the reviewer raises lands inline on the challenge at path:line, whatever its severity. The dispatcher report carries additional reasoning; inline comments carry the finding itself. Only an approve with no findings posts nothing. FIRES WHEN a reviewer posts or is briefed, or the organiser reads a report-only finding."
metadata:
  node_type: memory
  parent: feedback_comment_discipline
  type: feedback
  originSessionId: 56ba4a44-e553-4f5c-bd77-714693445ba7
---

**Every finding lands inline on the challenge**, anchored at its line, via
`gh api repos/<owner>/<repo>/pulls/<n>/comments` (`path`/`line`/`side`). Every severity, a blocking
`issue:` most of all: the inline comment is what a fresh reader sees to know why the challenge was
blocked. A doc-level or off-diff finding picks a representative line in the diff. The dispatcher report
is ADDITIONAL reasoning, never a finding's home.

The one thing that legitimately posts nothing is an approve with NO findings: report the verdict,
post no Review. A report-only path for an actual finding does not borrow that exception.

When a reviewer reports a finding only in the dispatcher report, the organiser gets it inline, never
accepts it as posted. 2026-06-12, #938: a reviewer blocked with an `issue:` that sat only in the
report, and I read "an approve with no findings posts nothing" as licence for it; a block with nothing
inline leaves the challenge with no record of what was raised.

Why: GitHub renders every Review into the timeline, so per-dispatch verdict bodies make it unreadable;
inline keeps a finding by its code and the timeline to the one synthesis verdict. Stay out of a
`gh pr review` body, a top-level `gh pr comment`, or a report-only finding.
