---
name: feedback_commit_message_format
description: "Volley commit subjects AND PR titles are `type: subject` where type is ONE OF the closed set {fix, feat, chore, docs, refactor, test, style, perf, build, ci}. Topic words (outline, soul, sweep, champ, reconstruction, sister, gear, etc.) are NOT types and never appear before the colon. NO scope parens (`fix(ci):` is wrong). No SH-N prefix. No [Codename] suffix. Total commit message under 200 chars. Triggers any commit subject OR PR title draft (`git commit`, `gh pr create`, `gh pr edit --title`)."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7fc36157-6757-4cbe-bc3b-75bbebf242bf
---

## Pre-flight check before any `git commit` or `gh pr create`

1. **Look at the word before the colon.** Is it one of `{fix, feat, chore, docs, refactor, test, style, perf, build, ci}`? If not, you have written a topic word as the type. Rewrite. Doc-only changes are `docs:`. Don't reach for a topic word that "describes the change better"; that is what the subject is for.
2. **No scope parens.** Does the subject contain `(` or `)` before the colon? Strip the scope. Just `type: subject`.
3. **Count total chars** (subject + body + trailers). Over 200? Cut the body. Save the longer rationale for the PR description, not the commit.
4. **No SH-N prefix, no [Codename] suffix.** No Linear ID on any open surface; reference the work with the GitHub `#N` in the body if needed. Linear is linked to the PR by hand, not via the branch (see [[feedback_design_docs_subject_first_github_ids]]). Codename lives in the `Agent-Role:` trailer.

## Rationale flows to the most durable surface

Detail flows outward, each surface terser than the last: commit subject (one line)
→ PR body (a paragraph or two) → the committed doc or code (full reasoning, rejected
alternatives). Keep the long rationale OUT of the commit message; the body and doc
hold it. The PR-body rules (brevity, narrative, what-and-why, in-thread not
dispatched) live in the `pr` skill (`.claude/skills/pr/SKILL.md`), which is the
authority; this memory only covers the commit-subject end.

## The format

Applies identically to commit subjects and PR titles:

```
type: subject
```

- **Type** is `fix`, `feat`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`, `build`, `ci`. `!` after type for breaking changes per [[breaking-change-bang]].
- **Subject** is short and imperative. Lead with the verb or the affected surface, not the topic.
- **Volley does not use the conventional-commits scope field.** The type is enough to categorise.

## Common slip patterns (all wrong)

- `outline: stub Act II/III/Ending...` (topic-as-type) → `docs: stub outline Act II/III/Ending...`
- `soul: rename in items.md` (topic-as-type) → `docs: rename friendship to soul in items.md`
- `sweep: kill canon across dev prose` (topic-as-type) → `docs: kill canon across dev prose`
- `fix(ci): pin actions` (scope parens) → `fix: pin actions in CI`
- `[Kevin] docs: ...` (codename in subject) → `docs: ...` plus `Agent-Role: Kevin (...)` trailer

## Trailers

- Agent-authored commits: `Agent-Role: <Codename> (<agent-type>)`, plus `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>` if Claude-assisted.
- Organiser commits (Josh or Gru on the dispatcher seat): no trailer needed; git author field is enough.

## Why

Volley does not use the conventional-commits scope field. The type-from-closed-set is enough to categorise. The topic belongs in the subject, not before the colon, so `git log --grep='^docs:'` finds every documentation change rather than missing the ones written under topic-flavoured pseudo-types.

## Local enforcement

`scripts/ci/check_commit_msg.sh` is wired into lefthook's `commit-msg` hook and rejects every violation locally before the commit lands. Pre-flight is still mandatory because the hook runs only on machines with lefthook installed (e.g. CI cloud agents without git hooks bypass it).
