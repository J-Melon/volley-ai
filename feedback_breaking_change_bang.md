---
name: Use the conventional-commit `!` suffix for breaking changes
description: when a commit or challenge breaks compatibility (save format, public API, workflow contract), put the `!` right after the type so autolabeler picks it up and release-drafter surfaces it correctly
type: feedback
originSessionId: 608651d3-3b61-4b71-9a83-894f4e86b346
---
Breaking commits and challenges use the conventional-commit `!` suffix on the type prefix. Examples: `feat!: route effects through placement`, `fix!: rename save schema field`, `SH-96 feat!: ...` (after the issue-prefix hook).

The autolabeler in `.github/release-drafter.yml` already has the aliases (`feat!`, `fix!`, with or without the `SH-NN` prefix) so no config change is needed; the `!` carries the signal on its own.

**Why:**
- Bumps the right version on the release draft (minor vs major / wipes save etc).
- Flags the challenge in the change list so future-Josh and contributors see the break coming.
- The AC-side cousin of "no save compat shims": the break is loud, not quiet.
- Flagged 2026-04-21.

**How to apply:**
- Any commit that wipes saves, renames a public signal, removes a tool, shifts a workflow input, or otherwise requires a caller to change carries `!` in the subject.
- Same on the challenge title, since autolabel reads the challenge title not the commit.
- In the challenge body, include a short "Breaking: ..." line naming what the caller sees and how they resolve it. For save wipes, literal "wipes saves" is enough.
- When in doubt, err on applying `!`; a false positive flags a challenge more loudly than warranted, a false negative ships a silent break.
