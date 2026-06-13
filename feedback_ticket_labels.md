---
name: Bug issues use the bug label, not feature
description: Linear issues filed as bug reports should carry the bug label; reserve the feature label for user/system stories
type: feedback
originSessionId: d3492d2a-f090-42d1-ac35-103c678183d0
---
When filing a Linear issue in the Bug Report format, set the label to `bug` (id `5a8e37f2-5617-4aec-9d26-fdc9291d1c54`). The `feature` label is for User Stories and System Stories only. CLAUDE.md calls out feature as the default, but that default only applies when the issue body is a story; a bug body (Summary / Steps / Expected / Actual / Environment / AC) needs the bug label to match.

**Why:** Josh filters and reports off the label. A bug tagged feature pollutes the feature list and hides real regressions.

**How to apply:** Before calling `save_issue` for a new issue, look at the body. Story format → feature. Bug format → bug. If unsure, ask.

Beyond the tech work-type label, the workspace has discipline label groups (each exclusive: one label per group per issue). The set was trimmed 2026-05-29 to only the labels in real use:

- **tech**: feature, bug, spike
- **art**: concept, asset
- **design**: spec
- **music**: (group exists, no leaf yet)
- **writing**: narrative
- **audio**: sfx
- **test**: ride, carnival

(`discovery` was renamed `spec`, `draft` renamed `narrative`; `study, cue, rework, revision, tune, rewrite` were deleted.) A single issue can carry one label from each relevant group. Apply discipline labels when the issue needs work from that discipline. Pull live descriptions via `list_issue_labels` if uncertain which fits.

**Authoritative taxonomy lives in `designs/process/labels.md`** (discipline × tier matrix). Read it before choosing a non-default label. Common trap: there is no standalone `tech` label; `tech` is the discipline column header, and tech-produce work (chore/infra, CI tightening, pinning, SECURITY.md) takes `feature`. Spike/bug are the other cells in the tech column.

**Feature, spike, and bug are mutually exclusive** (same label group). When briefing an issue-writer, pass exactly one of the three, never a combination. Reinforced 2026-04-23 after I briefed Tom with "spike + feature" on SH-209/210; he correctly dropped `feature` and applied only `spike`.
