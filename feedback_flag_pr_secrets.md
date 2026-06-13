---
name: Flag any new PR-triggered workflow secrets
description: Josh runs Actions with "Do not require approval"; if a PR-triggered workflow gains access to a repo secret, flag it immediately so he can reconsider the gate.
type: feedback
originSessionId: 8ccd039c-e27c-4f2f-888a-5678ecd02dfd
---
Josh set GitHub Actions → General → "Do not require approval" on 2026-04-19 to break the merge approval loop. That decision was safe because at the time no PR-triggered workflow referenced any repo secret: secrets only flow through `release.yml` (trigger: `release:published`) and `sync-wiki.yml` (trigger: `push:main`), neither of which runs on challenge.

**Trigger:** whenever adding or editing a workflow that runs on `pull_request:*` (including `pull_request_target:*`, `workflow_run:*` following a challenge-gated workflow) and references `${{ secrets.* }}` beyond `GITHUB_TOKEN`, flag it in the challenge description and call it out to Josh in the handoff summary. Don't ship it silently.

**Why:** "Do not require approval" means any contributor challenge runs workflows automatically. If one of those workflows has a secret, a malicious challenge can exfiltrate it. That is the threat model the approval gate previously mitigated. Keeping it off is only safe while PR-triggered workflows have no secrets.

**How to apply:**
- Before committing a workflow change that adds `pull_request*` trigger + `secrets.*` reference, stop and re-examine.
- If the secret is genuinely needed on challenges, recommend Josh flip the approval setting back to "Require approval for first-time contributors who are new to GitHub" at the same time, or use environments with required reviewers.
- `GITHUB_TOKEN` is fine; its permissions are scoped by the workflow's `permissions:` block.
- Audit baseline (as of 2026-04-19):
  - `lint.yml`: challenge trigger, no non-default secrets. ✓
  - `test.yml`: challenge trigger, no non-default secrets. ✓
  - `auto-update-prs.yml`: push-main trigger, `GITHUB_TOKEN` only. ✓
  - `release-drafter.yml` (if merged): pull_request + push, `GITHUB_TOKEN` only. ✓
  - `publish.yml`: push-main trigger, uses `BUTLER_API_KEY`. Not PR-triggered. ✓
  - `release.yml`: release-published trigger, uses `BUTLER_API_KEY`. Not PR-triggered. ✓
  - `sync-wiki.yml`: push-main trigger, uses `WIKI_TOKEN`. Not PR-triggered. ✓
