---
metadata:
  node_type: memory
name: Keep brackets out of challenge titles
parent: feedback_codenames
description: PR/commit titles carry the `SH-N type: subject` format without brackets. Codenames live in agent dispatch descriptions and in commit-body trailers.
type: feedback
originSessionId: 94cc4c04-cdf0-42ec-8706-e2ea78278a1f
---
metadata:
The format `SH-N type: subject [Codename]` from earlier feedback is wrong as a title rule. **Challenge titles never carry brackets.** Period.

Examples from main: `SH-342 outline rework: structural index`, `SH-341 docs: spell out implementer's runtime omission as design`, `SH-332 Pickle Jar refine: post-Ride blockers`. Even when there is a mission name in the body of the work, it stays in prose ("Pickle Jar refine"), never in a bracketed suffix.

**Why:** Josh caught me twice in one session. First with `SH-309 docs: wall-less court control spec [Apex Hold]`, where I'd treated the codename slot as required. The first correction had me write a conditional rule (codenames OK if an agent authored). That conditional was also wrong. Brackets do not appear in titles.

**How to apply:**

- PR titles: `SH-N type: subject`. Lowercase the conventional-commit type. No brackets, no parens, no colon-separated codename. The number from `gh` (`(#591)`) is appended on merge by the squash tooling, not by me.
- Commit titles (the lefthook-prepended SH prefix preserves the same shape): `SH-N type: subject`. No brackets in the subject.
- Codenames go in two places only:
  - The Agent dispatch `description` field, so it shows in Josh's CLI (`feedback_codename_in_dispatch`).
  - The commit-body `Agent-Role:` trailer when an agent authored, alongside other trailers (`feedback_agent_role_trailer`).

A separate but related point Josh hit me with the same turn: dispatched reviewers must post their findings as **inline review comments at the offending line**, not as main-thread blocks. Brief every reviewer dispatch with that requirement explicit; do not assume the agent will infer it. See `feedback_review_comment_discipline`.
