---
name: No em dashes anywhere; hard rule
description: never use em dash (U+2014) or en dash as sentence break (U+2013); applies to chat, prose, memory, commits, PR bodies, ticket bodies, code comments, design docs, every surface I write; check before sending
metadata:
  type: feedback
originSessionId: 7b8b3568-e541-47c8-a2e7-f5c2360fd8d3
---

The U+2014 character is banned on every surface I write. It is the strongest AI-tell in modern writing; the rule is identity, not style.

## What's banned

- U+2014 (em dash) anywhere, including inside backticks and inside quoted text. If I cannot cite a violation without typing the character, I describe it in words.
- U+2013 (en dash) as a sentence break. En dash for numeric ranges (`2020-2025`) is fine; use a hyphen or numeric-range form there.

## Where the rule applies

Every surface. Chat to Josh. Memory files. Commit messages. PR bodies. Linear tickets. Code comments. Docstrings. Design docs. Narrative drafts. Sub-agent briefs. No exception for quotes, parentheticals, or self-correction notes.

## Replacements

- Mid-sentence break: comma.
- Stronger separation: semicolon.
- New thought: full stop and a new sentence.
- Tangential aside: parentheses.
- Avoid colons as a substitute sentence-separator; Josh has flagged that as another tic.

## Sub-agent propagation

Every Agent dispatch brief includes an explicit "no em dashes" clause. The global rule does not propagate to sub-agents unless named in the prompt.

## Why the rule keeps failing

Generation-time autopilot, especially in long sessions. Accumulating "Reinforced 2026-MM-DD" paragraphs in this file has not changed the behaviour. The reliable fix is mechanical: a settings.json hook that scans output for U+2014 before the message leaves. Until that lands, the next-best is a pre-send re-scan of every paragraph, treating any visible U+2014 as a correction signal.
