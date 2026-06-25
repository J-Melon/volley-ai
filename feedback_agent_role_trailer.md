---
name: Agent-Role trailer on every agent-authored commit
description: One trailer; `Agent-Role:`; on every commit a swarm agent authors. Codename stays in subject tag. No Co-Authored-By, no other agent trailers.
type: feedback
originSessionId: 60225dfd-277e-4c4b-8ef4-5843bb535764
---
Every commit a swarm agent authors carries **one** new trailer: `Agent-Role:`. The role names match the stable swarm roles (`code-quality`, `test-author`, `docs-tender`, `supply-chain-scout`, and so on). No other agent-specific trailers; codename stays in the subject tag (`[slartibartfast]`), and `Co-Authored-By:` is not added because emails would not map to real GitHub accounts, so there is no avatar value and the line is pure noise.

Shape:

```
refactor: explicit types in rack_display [slartibartfast]

Body prose.

Agent-Role: code-quality
Signed-off-by: Josh Hartley <josh@shuck.gg>
```

The lefthook `issue-prefix` hook auto-prepends `SH-XXX ` from the branch name, producing the final subject:

```
SH-99 refactor: explicit types in rack_display [slartibartfast]
```

**Do NOT also include `(SH-XXX)` as the conventional-commit scope**; that produces the doubled-prefix `SH-99 refactor(SH-99): ...` pattern Josh corrected 2026-04-26. The hook handles issue attribution; the conventional-commit scope is for actual scope (subsystem name) and is usually omitted entirely.

**Why:** avatar-per-agent on GitHub requires either real accounts (ToS-capped at 1 machine account per person) or GitHub Apps per role (real setup cost, commits must route through the Contents API). Both are too heavy for current velocity. The `Agent-Role:` trailer is the cheapest data path that makes role attribution queryable without any GitHub-side change. Rule given by Josh 2026-04-23 after researching alternatives.

**How to apply:**

- Every agent-authored commit appends `Agent-Role: <role>` before `Signed-off-by`.
- Role names are the stable ones (not rotating codenames): `code-quality`, `gdscript-conventions`, `test-author`, `test-coverage`, `godot-scene`, `asset-pipeline`, `ci-and-workflows`, `signals-lifecycle`, `save-format-warden`, `supply-chain-scout`, `docs-and-writing`, `docs-tender`, `refactor-planner`, `researcher`, `root-cause-analyst`, `design-doc-reader`, `devils-advocate`, `integration-scenario-author`, `pr-describer`, `issue-writer`.
- Codename stays in the subject tag `[<codename>]` where it already lives.
- Query across history: `git log --pretty='%(trailers:key=Agent-Role)' | sort | uniq -c`.
- Organiser-authored commits (direct edits, no agent dispatch) skip the trailer; the absence is itself the signal.
