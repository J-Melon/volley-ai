---
name: zaphod- namespace reserved for bot-applied labels
description: Any label applied by automation (CI, reviewer dispatch, conflict detector, dependabot) carries the `zaphod-` prefix; human-applied labels do not
type: feedback
originSessionId: 60225dfd-277e-4c4b-8ef4-5843bb535764
---
Labels applied by a bot, workflow, or automation go under the `zaphod-` namespace. Labels applied by humans (Josh) do not.

**Why:** The namespace makes author legible at a glance, and the leading `z` sorts the bot labels to the bottom of GitHub's label picker (see `designs/process/labels.md`). The verdict labels are retired: the reviewer verdict is now the organiser's bot synthesis review, not a label, and merge approval is Josh's manual merge. The namespace survives only for the remaining bot-applied labels.

**How to apply:**

- Bot-applied (live): `zaphod-dep`, `zaphod-dep-action`, `zaphod-dep-pip` (Dependabot). Branch conflicts no longer get a label; they surface as a bot request-changes review noting the conflict.
- When filing a new automation that applies a label, prefix it with `zaphod-`. When proposing a human-only label, do not use the prefix.
- Renaming an existing label to match the convention is fine; update all workflow and doc references in the same pass.