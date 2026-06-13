---
name: Research maintainer patterns before drafting upstream contributions
description: Before drafting an upstream issue or challenge, spend a round investigating what the maintainers actually merge vs. close, and match that shape.
type: feedback
originSessionId: 473c2f98-7fb4-46f3-8541-a31e65bc776f
---
Before drafting an issue or challenge for an upstream repo (non-volley), dispatch a reviewer agent to research what the maintainers accept, reject, or ignore. Check recent merged challenges by externals, closed-not-planned issues, maintainer comments on adjacent threads, config-grammar conventions, and whether the repo routes feature requests to Issues, Discussions, or somewhere else. Match the proposal shape to what that specific project lands.

**Why:** Linux maintainers are picky and each project has its own grammar and politics. Generic "clear and concise" feature requests get autoclosed. The shape that lands one repo (magic string tokens, broad Discussions) dies on another (structured keys, narrow Issues tagged enhancement). Discovered during a hyprlock issue draft: maintainer PaideiaDilemma rewrites overloaded strings into structured keys (challenge #796 precedent), so a `submit_on_click` bool on existing widgets was the right shape, not a token mini-DSL on `onclick`.

**How to apply:**
- Spawn a research agent with gh access before the first draft. Ask: what merges, what stalls, what shape is the house grammar (snake_case vs kebab-case vs camelCase), what does the maintainer say on adjacent challenges?
- Also check for pre-existing duplicate or near-duplicate issues/discussions to cite or differentiate from. Dup-bot will fire otherwise.
- Route by what the research finds: Issues, Discussions, `/feedback`, or nothing. Don't default-assume Discussions for feature requests; some projects explicitly move enhancements back to Issues.
- Don't offer to challenge in the first ask unless the project signals it welcomes unsolicited challenges. Wait for a thumbs-up on the issue first.
