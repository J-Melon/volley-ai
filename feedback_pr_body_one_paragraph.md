---
name: feedback_pr_body_one_paragraph
description: "A PR body is one short paragraph of narrative prose: what changed and why, in a few sentences. That is the whole body. No `## Summary`/`## What's in this chunk` headers, no bullet lists, no checklists, no test plan (AC lives on the Linear issue, verification in the Ride). Authority: .claude/skills/commits/SKILL.md 'PR title and body shape'."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

Write a PR body as one short paragraph of prose: a few sentences saying what changed and why,
enough for a reviewer to orient. That paragraph is the whole body, and a tight body reads better
and lands faster.

The skill (`.claude/skills/commits/SKILL.md`, "PR title and body shape") is the authority: narrative
prose, one short paragraph usually the whole thing; NO `## Summary` / `## What's in this chunk`
headers, NO bullet lists of changes, NO `## Test plan` or verification checklist. AC lives on the
Linear issue; player verification lives in the Ride.

This is a recurring slip of mine, drafting PR bodies as sectioned mini-reports with headers and
bullets (2026-06-03: several SH-430 chunk PRs ran 700-2000 chars of structure). It is the same pull
as over-long commit messages and over-commented code: producing more prose to LOOK thorough, the
please-the-user weighting ([[feedback_do_the_true_thing]]). The reviewer wants the
short true thing, not a report. So: one paragraph, prose, done.
