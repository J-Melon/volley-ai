---
name: Review comments need codename, inline placement, tight length
description: Every reviewer-agent challenge comment must lead with the agent's codename in bold, post as inline review comments anchored to specific lines (not as one big main-thread review body), and stay tight
type: feedback
originSessionId: d792e612-7af1-4674-81f7-90641ad52563
---
When a reviewer agent (Gru Sister or any review specialist) posts findings on a challenge:

1. **Codename in the bold prefix.** Not just the role label — the assigned mission codename. `**Marvin:** ...` or `**Trillian:** ...`. The role can follow in parentheses if useful. This applies to the dispatch-time codename even when the underlying agent type doesn't carry one inherently.
2. **Inline review comments, not a single main-thread post.** Anchor each finding to the specific file and line via `gh api repos/<owner>/<repo>/pulls/<n>/comments` (or `gh pr review --comment` *with* `--in-reply-to`/path/line scoping where the CLI permits). The aggregate "verdict" line can land as a short main-thread comment summarising; concrete findings live inline at the offending line.
3. **Keep it tight.** Each inline comment is the smallest unit needed to act on. Conventional Comments prefix (`question:`, `suggestion:`, `issue:`, `praise:`, `nit:`) at the start. Severity in parentheses if non-obvious. No multi-paragraph essay per line.

**Why:** Josh corrected this on Goggle Squad's PR #558 (2026-04-30) when the docs reviewer posted a single review-body comment with no codename and ~600 words on the main thread. That format buries the actionable findings, breaks the codename convention, and forces Josh to re-read the diff to map findings to lines. Inline + codename + tight matches how a human reviewer would post and how Josh wants the swarm's voice to read.

**How to apply:**

- Brief every reviewer agent dispatched against a PR with: "Post inline at the specific line via `gh api .../pulls/<n>/comments`, lead each comment with `**<Codename>:**`, use Conventional Comments prefixes, keep each comment tight." Include the assigned codename explicitly in the brief — agents won't infer it from session context.
- For read-only review specialists (devils-advocate, etc.) who cannot post: dispatcher posts on their behalf, still inline, still codenamed, still tight. The agent returns findings keyed by file/line; dispatcher fans out the `gh api` calls.
- One terse main-thread "review summary" comment is fine if it carries the verdict line ("ship / ship-with-fixes / rework") and a one-line summary; the body of findings is inline.
- Do not paste a multi-page review body as a single comment. If the agent returns one, split it before posting.
- **This applies to the dispatcher's OWN review output, not just agents'.** When Gru reviews a PR directly (battling by hand, or holding a verdict), findings AND questions go inline on the line, the same as an agent's, never as main-thread prose to Josh. A question about the code (`question: should this stay Ball?`) belongs anchored at that line so it threads and Josh answers in place, like his own comments do. Reinforced 2026-05-29 on #777 after I surfaced two review questions (type-widening, test duplication) in chat prose instead of inline; Josh: "questions should be an inline comment just like the others". The chat verdict to Josh is fine as a summary, but every concrete finding/question lands inline.
- **Replying to past findings goes on the existing thread, inline, not as a new top-level PR comment.** When the dispatcher addresses prior review feedback (the diff moved, the findings landed in a new file, the verdict resolved), reply on each review thread directly via `gh api repos/<owner>/<repo>/pulls/comments/<comment_id>/replies` (or the corresponding REST/GraphQL endpoint). A new top-level comment summarising "all old findings are addressed" is the wrong shape: it doesn't surface in the threads the reviewer pinned, the reviewer's UI still shows them as unanswered, and the conversation history fragments. Surfaced 2026-05-10 on Banana Tank PR #603 when I posted a top-level explainer instead of threading replies.
