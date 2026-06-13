---
name: volley-ci-merge-gate-shape
description: "How the volley repo's branch ruleset, merge queue, required checks, and review attribution fit together. Read before touching .github/ to avoid breaking the merge pipeline."
metadata: 
  node_type: memory
  type: reference
  originSessionId: 07114971-0755-4628-bfe9-5c815fd107cc
---

## Ruleset (ID 14392483, target=main)

Required status checks: `Tests`, `Lint`. Both must be `success` to merge. There is no `Human Approved` or `AI Review Passed` required check (retired in SH-452).

**Approval is the maintainer's manual merge.** The maintainer reviews and clicks Merge when ready; that act is the approval. No approval label, no auto-merge. Local hooks block the agent from running `gh pr merge` or enabling auto-merge.

Merge queue: squash only, `grouping_strategy=ALLGREEN`, `check_response_timeout_minutes=5`. `pull_request` rule has `required_approving_review_count=0` and `dismiss_stale_reviews_on_push=true`. `allow_auto_merge` is off in practice; the maintainer merges by hand.

Admin bypass (Repository Admin) for genuine chicken-and-egg cases: `gh pr merge <N> --squash --admin`.

## Review attribution (not a gate)

Reviewer agents post inline findings. The GitHub App bot identity is `volley-reviewer[bot]` (Bot account id 288611710; renamed from `shuck-volley-bot[bot]`). Its authorAssociation is NONE and `required_approving_review_count` is 0, so it satisfies no gate; attribution only. NOTE (verify before relying): `bot-review.yml` and `.github/bot-identity.md` no longer exist on disk, so the rest of this section may be stale.

## Labels

Verdict, human-approval, and conflict labels are retired (SH-452). Branch conflicts now surface as a bot request-changes review noting the conflict, no label. Remaining bot-applied labels: `zaphod-dep` / `zaphod-dep-action` / `zaphod-dep-pip` (Dependabot). The `z` prefix is a label-picker sort hack (see `designs/process/labels.md`).

## Workflow files in `.github/workflows/`

- `lint.yml` (`Lint`), `test.yml` (`Tests`): the two required checks. Fire on `pull_request` and `merge_group`. `actionlint` retries its download and skips with a warning on a flake (SH-429).
- `bot-review.yml`: `workflow_dispatch` poster for the synthesis review under the bot identity.
- `dco.yml` (`DCO`): every non-bot challenge commit needs a `Signed-off-by:` trailer.
- `release-labeler.yml`, `release-drafter.yml`, `release.yml`, `publish.yml`, `sync-wiki.yml`: release/labeling/wiki plumbing.

`approval-gate.yml` and `reviewer-re-run.yml` are retired (SH-452). All third-party actions are SHA-pinned with the version tag in a trailing comment.
