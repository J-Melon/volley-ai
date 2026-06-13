---
name: GitHub Actions quirks learned in volley
description: Non-obvious behaviours of GitHub Actions, the ruleset API, and the label picker that bit us during the volley CI overhaul. Save the diagnostic time next time these show up.
type: reference
originSessionId: dfb51429-dfc0-47c3-890d-afd0f8559c9a
---
## `pull_request_review_thread` is NOT a valid workflow trigger

It's a webhook event but Actions' workflow schema rejects it. A workflow file that lists it under `on:` will:

- Parse fine in YAML linters (Python `yaml.safe_load` accepts it).
- Fail silently at GitHub's schema layer; no error surfaced.
- Show up as `name: .github/workflows/<file>.yml` in the workflows API instead of the file's `name:` field. **That mis-naming is the canary.**
- Fire phantom failed runs on every push event with zero jobs; no check runs ever posted.

Diagnose by `gh api repos/<org>/<repo>/actions/workflows/<id> --jq .name`. If the name is the path, the schema is broken.

## glibc's `libc::signal` adds `SA_RESTART` silently

Calling Rust's `libc::signal()` on Linux glibc installs the handler with BSD semantics, which includes `SA_RESTART`. That makes `poll()` (and other restartable syscalls) silently auto-restart instead of returning `EINTR`. A flag-based shutdown loop (`while RUNNING { poll(...) }`) will never see the flag flip until the next event arrives.

Use `libc::sigaction` with explicit `sa_flags = 0` instead. Or pair the flag with a self-pipe whose read end is in the `poll` set so the signal handler can wake the loop directly.

This was Mabel's diagnosis but turned out to be a red herring for the specific volley bug; that one was actually a stderr `lock()` deadlock in the logger thread. Both are real GotChas worth remembering separately.

## GitHub label picker uses ICU collation, not codepoint sort

Punctuation characters (`@`, `~`, `!`, `-`, `_`) are **primary-ignorable** in the Unicode Collation Algorithm. They're skipped during the primary sort pass; the picker collates as if the prefix weren't there.

`@human-approved` collates as `human-approved` → sorts in the `h` band, NOT first.
`~action-required` collates as `action-required` → sorts in the `a` band, NOT last.
`🤖 action-required` same; emoji is ignored, the word after determines position.

To force position you need a letter: `aa-foo` for top, `zz-foo` for bottom. The volley repo uses `zaphod-*` for its bot-applied labels (bottom via `z` + meaningful name from Hitchhiker's two-headed alien; fits a multi-headed automation chorus).

Discussion `#20983` in `github/community` has been open since 2022 with no roadmap commitment; this is permanent.

## Merge queue + label-based required checks need `merge_group` trigger

If a workflow posts a check via `github-script` and the check is in `required_status_checks`, the workflow must also fire on `merge_group` so the check appears on the integration branch the queue creates. Otherwise the queue stalls waiting `check_response_timeout_minutes` (5 min default) for a check that never lands.

`pull_request_target` alone is not enough; the queue creates a separate `gh-readonly-queue/main/pr-N-<sha>` branch via push, not a challenge event.

## A blanket checkout 403 / "account is suspended" is an account outage, not a PR defect

When every job on a PR fails identically at the `actions/checkout` step with `remote: Your account is suspended` and `HTTP 403` / `git failed with exit code 128`, the org account is suspended, not the code. Seen 2026-05-26: ~88 min outage (12:42-14:10), six wasted runs across both open PRs. SSH push can still work while the Actions token is rejected, so pushes land but no CI passes. Do not re-run failed jobs during the window (a re-run fired mid-outage just burns a billed minute and fails at setup fetching the action tarball from `codeload.github.com`, also 403). Diagnose from the checkout log first, confirm at the account status page, hold re-dispatch until any branch checks out clean.

## Re-running a `pull_request_target` job replays the frozen event payload

A label-triggered run is bound to the label that fired it. The job body can re-fetch live labels via `github.rest.pulls.get()`, but the job-level `if:` guard evaluates `github.event.label.name` from the immutable triggering payload. So a check that first ran on one label event can never observe a different label applied afterward via "Re-run failed jobs"; the re-run replays the same frozen payload. To re-evaluate, fire a fresh event: push, or remove and re-apply the label. Never "Re-run failed jobs" to pick up a later label. Seen 2026-05-26 on #748 (then under the now-retired label-driven approval gate).

## Renaming a branch with an open PR closes the PR, does not retarget it

The branch-rename API (`POST /repos/.../branches/<old>/rename`) succeeds and returns the new name, but an open PR whose head was that branch ends up **closed**, not retargeted to the new ref. The old head ref no longer exists, so the PR cannot be reopened directly; it needs the old branch restored first (which resurrects the old name). Seen 2026-05-28: renaming `feature/sh-229-...` to `feature/371-...` closed PR #768; opened #769 on the new branch instead. Do not rename a branch that has an open PR; recreate the PR on a correctly-named branch from the start, or rename before opening the PR.

## Workflow run `event=push` + `name=path` = startup failure

If `gh api .../actions/runs/<id>` shows `event: push` for a workflow that doesn't have `on: push`, AND the run name is the file path instead of the workflow's `name:` field, GitHub failed to parse the workflow and is firing orphan failed runs on whatever event happens to touch the repo. Always investigate the workflow file's parse-validity first.
