---
name: pr-comments-via-gh-api-graphql-with-jq-not-rest-and-not-python
description: "For PR comments, use `gh api graphql` + `--jq` (per [[use-graphql-reviewthreads-for-fresh-challenge-review]]). REST `pulls/<n>/comments` can miss fresh review comments. python3 heredocs to parse `gh` JSON are redundant; `--jq` is built in. Triggers any time the next step is to read PR comments."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9066ef19-7b82-42a7-aaa1-b62fb15b6ebb
---

Two rules collide on this one. Apply both.

- **GraphQL over REST for PR comments.** REST `pulls/<n>/comments` (and `gh pr view`) miss fresh review-thread comments even within the limit; the GraphQL `reviewThreads` connection is authoritative (per [[use-graphql-reviewthreads-for-fresh-challenge-review]] and [[pull-every-pr-comment-surface-not-just-gh-pr-view]]).
- **jq over python for shaping.** `gh api` exposes jq via `-q` / `--jq`. Reaching for `python3 -c | json.load` is heavier, less readable, and pipes JSON through an extra process for no gain.

## Fictionical shape

```sh
gh api graphql -f query='
  query($n:Int!) {
    repository(owner:"shuck-dev", name:"volley") {
      pullRequest(number:$n) {
        reviewThreads(first:100) {
          nodes {
            isResolved
            path
            line
            comments(first:50) {
              nodes { author { login } body createdAt }
            }
          }
        }
      }
    }
  }' -F n=680 --jq '.data.repository.pullRequest.reviewThreads.nodes[]
    | select(.isResolved == false)
    | "--- \(.path):\(.line // "n/a")\n" + (.comments.nodes[] | "\(.author.login): \(.body)") + "\n"'
```

When jq genuinely cannot express the shape (multi-endpoint reduction, character-class transforms), drop to a script file in `scripts/`; the bar is "jq cannot do this", not "I find jq awkward".

Reinforced 2026-05-16: I used `gh api repos/.../pulls/680/comments | python3 -c "..."` to read PR comments. Josh "why are you using python there?" then "not graphql?". Both pulls valid; this rule pins the standard shape.
