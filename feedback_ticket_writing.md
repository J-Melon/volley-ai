---
name: Issue writing: follow the project's guide
description: Always consult designs/process/ticket-writing.md before writing or editing a Linear or GitHub issue; AC must describe outcomes only
type: feedback
originSessionId: de79f3c5-5848-4f0e-a279-dd4fb9fb942d
---
Issue-writing guidance lives in `designs/process/ticket-writing.md`. Always read it before writing or editing an issue. It covers principles, the three-tier intent model (Explore / Produce / Evolve), per-discipline guidance (tech / art / music / writing / design / sfx), templates for each intent, GitHub and Linear conventions, and the "stranger test".

Short version to keep in working memory while drafting:

- Acceptance criteria describe **outcomes only**: what the system does or what the player can do. Never mention file paths, class names, method names, or current implementation. If a file/method sneaks into AC, rewrite as the observable behaviour.
- Bugs and Stories use the formats in `CLAUDE.md`. System Story action verb is plain text (e.g. `DESIGN ...`), not `[DESIGN]`.
- Use **absolute GitHub URLs** for cross-issue references and design-doc links, not repo-relative paths or Linear-only IDs; links must resolve in both Linear and GitHub.
- Estimates: bugs 0, spikes 1, stories unpointed (Josh sizes).
- Labels reflect discipline + intent; use `good first issue` only when community-driven.

**Why:** outcome-based issues survive code churn; the guide captures hard-won discipline-specific conventions (art bible references, cue briefs, scene goals, etc.) the user has iterated on.

**How to apply:** on any request that touches issue creation or editing, open `designs/process/ticket-writing.md` first, match the intent tier and discipline, then draft. Confirm with user before filing per the "confirm before creating Linear issues" rule.
