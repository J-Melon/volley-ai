---
name: Verify gh pr ready actually flipped the challenge
description: gh pr ready can exit 0 without flipping isDraft; always confirm with gh pr view before moving on
type: feedback
originSessionId: 60225dfd-277e-4c4b-8ef4-5843bb535764
---
`gh pr ready <N>` can return exit code 0 and "✓ marked as ready for review" while the challenge stays in draft state. This is a documented silent-success failure mode on the underlying REST draft toggle, and it has hit Volley challenges already (2026-04-22: two of four challenges stayed draft after the flip).

**Why:** the underlying REST `PATCH /repos/:owner/:repo/pulls/:N` with `{"draft":false}` returns 200 but does not persist in some cases (see https://github.com/orgs/community/discussions/156644). The GitHub CLI wraps `markPullRequestReadyForReview` and reads the response but still exits 0 on the quiet failure. Josh caught this manually; automation should not.

**How to apply:**

After every `gh pr ready <N>`, verify:

```
gh pr view <N> --json isDraft --jq '.isDraft'
```

Must return `false`. If it returns `true`, retry via the raw GraphQL mutation:

```
PR_ID=$(gh pr view <N> --json id -q .id)
gh api graphql \
  -f query='mutation($id:ID!){markPullRequestReadyForReview(input:{pullRequestId:$id}){pullRequest{isDraft}}}' \
  -F id="$PR_ID"
```

Read the returned `isDraft` to confirm the flip. If the raw mutation still reports draft, capture the response payload and stop; something structural is blocking the transition and it is not our rule to debug silently.

Applies to any agent that opens a challenge and marks it ready, and to the organiser when flipping batched swarm challenges.
