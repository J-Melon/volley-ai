---
name: name-prefix-every-pr-comment-and-reply
description: "Every agent-posted PR comment AND threaded reply must start with `**<commenter>**\n\n<body>`. Triggers on any `gh api ... pulls/.../comments` POST or `pulls/comments/<id>/replies` POST. The organiser (main thread) uses `**Gru**`; sub-agents use their codename. Replies are NOT exempt. Direct back-fill replies from the main thread are the highest-miss surface."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 6816739f-74ae-4ab7-bf0c-de2832b60fb1
---

## The rule

Two `gh api` surfaces; both need the prefix on the body.

- New inline comment: `gh api -X POST repos/.../pulls/<N>/comments -f body=$'**<commenter>**\n\n<body>' -f commit_id="..." -f path="..." -F line=<n>`
- Threaded reply: `gh api -X POST repos/.../pulls/<N>/comments/<id>/replies -f body=$'**<commenter>**\n\n<body>'`

Who is `<commenter>`:

- **Main thread / organiser**: `**Gru**`. Easy to miss because the organiser does not feel codenamed; it is.
- **Reviewer minion**: the codename it was dispatched under.
- **Reviewer minion replying on behalf of a fix**: still its own codename, not the original commenter's.

## Pre-flight checklist before any `gh api` POST to pulls/comments

1. Body starts with `**<commenter>**` on its own line.
2. Blank line follows.
3. Then the content.

If the command does not match this shape, do not send. Patch with `-X PATCH repos/.../pulls/comments/<id>` if the post already went out without the prefix.

## Why

Threaded replies are where back-and-forth accumulates. Without a prefix the author is ambiguous inside the thread, and Josh reads on mobile where the diff view is hard to scan. Every reply surface must be legible at a glance about who said what.
