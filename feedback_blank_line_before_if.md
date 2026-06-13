---
name: blank-line-before-every-if-statement
description: "GDScript style rule: every `if` statement gets a blank line above it. Exceptions: first statement of a function body, and `elif`/`else` continuations. Triggers when reading or writing GDScript with an `if` that has a code line directly above it. Lives in `ai/skills/minions/implementer-nits.md` so sub-agents inherit it."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 6816739f-74ae-4ab7-bf0c-de2832b60fb1
---

## The rule

In GDScript: blank line before every `if`. Two exceptions only.

- First statement of a function body: no preceding line, no rule to apply.
- `elif` / `else` continuation of the same conditional: stays attached.

Applies regardless of whether the preceding statement is one line or many.

## Pre-flight check before writing or accepting GDScript

Scan the diff for the pattern:

```
<non-blank line>
<if ...>:
```

If found, insert a blank line between them.

## Why

gdformat does not enforce this; gdlint does not flag it. So it slips through every linter pass and lands as a reviewer nit on every implementer PR. Fictionising the rule in the implementer-nits skill stops the loop.

## Where it lives

- Skill: `ai/skills/minions/implementer-nits.md` (Blank-line spacing section).
- Memory: this file, as a pointer for my own pre-action checks.
