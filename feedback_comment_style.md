---
name: Comment length and TODO format
description: Comment style for code/tests/configs - one line ideal (3+ blocks), todo SH-XX format, no issue numbers in body comments, no second-person "you", present tense not migration history
type: feedback
originSessionId: aa72aedf-9357-4e3c-83df-beba4a0e68e4
---
**Comment length:** One line is ideal. Two lines is exceptional (use only when genuinely warranted; a reviewer may nit but should not block). **Three or more lines is a hard block**; trim it, or move the detail to a linked issue / design doc. Applies to both `#` line comments and `##` doc comments.

Rule for reviewers: block at 3+ lines only. Flag 2 lines as a nit-level suggestion if you think it can collapse, but do not block.

**Why:** Long comment blocks over-explain and age poorly. A single line forces the comment to say what matters; anything longer belongs in an issue or design doc. Josh explicitly asked for one-line comments.

**TODO format:** Write TODOs as `# todo: SH-XX <description>`. Lowercase `todo`, colon, issue ID directly, no parentheses. **Not** `# TODO(SH-XX):` or `# TODO:` without an issue.

```gdscript
# todo: SH-66 replace with friend reaction animation on art pass
```

**How to apply:**
- When adding explanatory comments, draft freely then trim to one line before writing.
- If context won't fit on one line, capture it in a `todo: SH-XX` referencing an issue that holds the full explanation.
- Every TODO must reference a tracked issue; if there is no issue, don't write the TODO, file one first (remember: always confirm before filing).
- Applies to all new code in this repo.

**Non-TODO comments do not carry issue numbers.** Test file headers, doc-comments, inline notes: describe what the code does, not which ticket it came from. Issue numbers belong in commit messages, PR bodies, and `todo:` lines, not in body comments. The code outlives the ticket; the comment ages into a dead reference. Reinforced 2026-05-24 on #727 after I wrote `## #691 #692: pressing an equipped item mid-rally...` as a test file header. Josh: "dont put the issues numbers in comments plz."

**No second-person address.** Comments state facts impersonally, never addressing a reader: "the guard resolves the set", not "you resolve the set". Josh, 2026-05-28 ("dont use words like you ... in code and comments"). Does not apply to user-facing ticket templates ("As a player, I want") or quoted text.

**Present tense, not history.** Comments describe what the code is now, not what it replaced. Cut migration narration and contrast-with-the-old framing: "retired", "no longer", "now X, not the old Y", "rather than the old Z", "previously". That belongs in the PR description and git log; it rots in a comment. A standing warning against a known mistake (the why) is fine; narrating the past is not. Josh, 2026-05-28.

**These rules are not lint-enforced and already live in a skill + a reviewer.** gdlint has no comment-length or blank-line-before-`if` check, so CI green proves nothing here. But the rules are NOT only in CODE_STYLE.md: `ai/skills/minions/implementer-nits.md` consolidates comment policy + blank-line-before-`if` (and `code-comments.md` the comment detail), and the `code-quality` reviewer agent is scoped to "comment policy" and told to read implementer-nits. Do not restate these rules in new briefs or memory; point at the skill.

**The #777 miss was a routing failure, not a missing tool.** Two gaps, both mine: (1) the authoring agents (test-author, gdscript-implementer) were not told to read `ai/skills/minions/implementer-nits.md`, so they wrote 5-line comments and dense `if` blocks; (2) the `code-quality` reviewer I dispatched was briefed to focus on "correctness / semantic quality" and I never told it to apply its standing comment/spacing scope, so it skipped the nits Josh then caught by eye. Fix forward: every brief that authors `.gd` says "read ai/skills/minions/implementer-nits.md first"; never narrow a reviewer's brief so far it drops its own standing scope. Reinforced 2026-05-29 on #777.

**Structural gap + the `style-warden` agent.** Blank-line-before-`if` was owned by NO reviewer: `gdscript-conventions` puts "formatting, whitespace" out of scope and `code-quality` puts "empty lines" out of scope as "gdlint catches it", but gdlint does not catch blank-line-before-`if`. Both punt to CI; CI is blind to it. Created `.claude/agents/style-warden.md` (2026-05-29) to own the full lint-invisible style surface of CODE_STYLE.md + implementer-nits.md (comments, blank-line spacing, full words, descriptive names, magic-numbers-into-data, @export-over-@onready, resource clustering), reading the skills as source of truth, deliberately overlapping the other two on the most-skipped rules. NOTE: a newly-created agent is not dispatchable until the next session (registry loads at startup); same for effortLevel. `.claude/agents/**` is Edit/Write-gated, create via shell heredoc.
