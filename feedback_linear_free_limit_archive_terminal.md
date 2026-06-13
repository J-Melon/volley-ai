---
name: feedback_linear_free_limit_archive_terminal
description: "FIRES WHEN save_issue fails with 'exceeded the free issue limit'. The Shuck Linear workspace is on a limited plan; active issues count toward it, archived ones do not. Free quota by ARCHIVING terminal-state issues (Retired + Duplicate) via GraphQL issueArchive (reversible, issueUnarchive recovers). Cross-check first: each terminal issue's GitHub mirror should already be CLOSED, archiving Linear must not orphan a live GH issue. Contributors file on GitHub (no limit); this is a maintainer-side concern, not a CONTRIBUTING doc."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

The Shuck Linear workspace is on a limited (free) plan. When `save_issue` returns
`exceeded the free issue limit`, the fix is to free quota by archiving issues in a terminal
workflow state (Retired, Duplicate), they are done, but still count as active until archived.

Procedure:
1. List terminal issues: GraphQL `issues(filter: { team: { key: { eq: "SH" } }, state: { type: { in: ["canceled","duplicate"] } } })`.
2. **Cross-check GitHub first.** Pull each issue's GitHub mirror (its `attachments` url), and verify
   the GH issue is CLOSED. Archiving the Linear side must not leave a live GitHub issue with no
   tracked counterpart. (2026-06-03: all 59 mirrors of 84 terminal issues were already closed, clean.)
3. Archive each with `issueArchive(id)`. It is REVERSIBLE (`issueUnarchive`); do not delete.
4. Refile the blocked issue.

This is maintainer operations, not a contributor concern: contributors file on GitHub (no limit),
and the Linear mirror is maintainer-side (CONTRIBUTING.md is GitHub-issue-based). So this is a
memory, not a CONTRIBUTING doc. Done 2026-06-03 to file SH-470; archived 84 (78 Retired + 6
Duplicate), freed quota, refiled.
