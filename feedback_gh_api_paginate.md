---
name: Use --paginate on every gh api list query
description: `gh api` silently returns only the first page (default 30 items) without `--paginate`. Anything that could plausibly exceed 30 results gets paginated.
type: feedback
originSessionId: 8cc342c4-0faf-4b52-b150-75abb72d8fcd
---
The `gh api` CLI returns one page at a time by default. Listings (PR comments, issue comments, runs, checks, releases, etc.) cap at ~30 items per page. Without `--paginate`, the rest is silently dropped.

Add `--paginate` to any list query whose result count could realistically exceed 30. PR comments and inline review threads on a long PR cross 30 quickly.

**Why:** 2026-05-11. I queried PR #608 comments without `--paginate`, found 30, told Josh "yes I read every one of yours," and missed 38 inline comments he had left. Josh: "No i had 37 comments or about." The miss cost a turn and trust.

**How to apply:**

- Default to `--paginate` on `gh api repos/.../comments`, `.../reviews`, `.../runs`, `.../issues`, `.../pulls`, etc.
- When summarising counts, run the paginated query first; check `length` is consistent across pages before quoting numbers.
- For single-resource fetches (`gh api repos/owner/repo/pulls/N`) `--paginate` is harmless; default to it.
