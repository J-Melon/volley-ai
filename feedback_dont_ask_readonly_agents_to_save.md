---
name: Don't brief read-only agents to save scratchpad files; they can't
description: Tier-0 specialists like devils-advocate and root-cause-analyst (default tools) have Read/Grep/Glob without Write or Edit; if a brief tells them to save findings to a scratchpad, they fail silently or work around it
type: feedback
originSessionId: a39316b3-d98c-4577-97d8-c03dcfbbad89
---
When dispatching a read-only specialist (devils-advocate's tools are `Read, Grep, Glob, WebSearch`; root-cause-analyst pre-tier-up was similar; researcher is `Read, Grep, Glob, WebSearch, WebFetch, mcp__context7__*`), do not include "save findings to `ai/scratchpads/<name>.md`" in the brief. They cannot write. The dispatcher saves the agent's returned report verbatim to the scratchpad if persistence is wanted.

**Why:** 2026-04-28. Briefed Dave (devils-advocate) and Carl (root-cause-analyst) to save their findings to `ai/scratchpads/<name>-<topic>.md`. Both reports came back in the task notification but neither file existed afterward. Dave flagged it explicitly: "I cannot use Write or Edit tools in this session tier (static/headless, read-only critique)." Carl just didn't write the file and the missing scratchpad surfaced later when Dave's review tried to read it. Net effect: the dispatcher had to scrape the report from the task notification anyway, and a downstream agent expecting the scratchpad found a 404.

**How to apply:**

- Brief read-only agents to deliver findings inline in their final report. Cap the report length so the dispatcher can absorb it.
- Dispatcher saves the report to `ai/scratchpads/<codename>-<topic>.md` after the agent returns, if a durable record is wanted.
- Briefs to write-capable specialists (gdscript-conventions, code-quality, test-author, godot-scene, save-format-warden, signals-lifecycle, integration-scenario-author, refactor-planner, ticket-writer, docs-tender) can include the save instruction.
- A quick check before dispatch: read the agent's `tools:` line in `.claude/agents/<name>.md`. If `Edit` and `Write` are absent, the brief is read-only.
- **researcher is technically Write-capable but its agent contract may forbid writing findings files** — in 2026-04-30 (Goggle Squad demo) Ford Prefect refused a scratchpad path I gave him, citing "agent-level instruction" overriding the dispatch brief, and returned the report inline instead. Treat researcher as inline-return by default; let the dispatcher persist.
- **Same rule for posting GitHub Reviews / comments.** A read-only agent cannot call `gh pr review` either. Twice now (Bartleby on PR #560, then Silas Ramsbottom on PR #560 after the rewrite) I briefed devils-advocate to "post one GitHub Review on the PR"; both came back asking the dispatcher to post on their behalf. If the brief is a creative or architectural critique that needs to land as a Review, either (a) dispatch a write-capable specialist (general-purpose, docs-tender + Bash brief, etc.) instead, or (b) brief the read-only agent to return the review body inline and post it from the dispatcher. Default to (b) when the agent role is genuinely read-only critique; the dispatcher posts.
