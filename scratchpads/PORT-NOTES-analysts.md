# Port Notes: analysts/ slice

## devils-advocate

Mapping:
- tools: Read, Grep, Glob, Bash -> bash: allow, read: allow, glob: allow, grep: allow
- No Edit/Write -> edit: deny, write: deny
- No WebFetch/WebSearch -> webfetch: deny, websearch: deny
- No Agent/Task tool -> task: deny

Flags:
- Body references "inline review comments" and "the dispatcher synthesises the verdict" -- these are workflow conventions, not Claude-specific mechanics. Kept verbatim; they describe role boundaries that apply in any orchestration model.
- No Claude-specific tool-name references in body that would mislead under OpenCode.

---

## researcher

Mapping:
- tools: Read, Grep, Glob, WebSearch, WebFetch, mcp__context7__resolve-library-id, mcp__context7__query-docs
- bash: deny (Bash not in allowlist)
- read: allow, glob: allow, grep: allow
- webfetch: allow, websearch: allow
- edit: deny, write: deny
- task: deny
- context7 MCP tools noted in doc comment line

Flags:
- Body references "WebSearch" and "WebFetch" as tool names. These are generic enough to apply in OpenCode too (or map to the permission equivalents). Kept as-is since they name the capability, not a Claude-specific invocation mechanism.
- "Write findings to ai/swarm/tasks/{topic}-findings.md" -- researcher has write: deny in permissions, but the original source file also lacks Write in its tools list. This is an apparent inconsistency in the source: the agent is told to write a file but was not granted Write. Preserving as-is; flagged for review. In the source the agent may have been expected to produce output that the orchestrator writes, or this was an oversight.

---

## runtime-verifier

Mapping:
- tools: Read, Grep, Glob, Bash + 13 godotiq MCP tools
- bash: allow, read: allow, glob: allow, grep: allow
- No Edit/Write -> edit: deny, write: deny
- No WebFetch/WebSearch -> webfetch: deny, websearch: deny
- task: deny
- All godotiq tools listed in doc comment line

Flags:
- "run_in_background" does not appear in body. No Claude-specific invocation mechanics to neutralize.
- Body references `.claude/skills/dispatch/SKILL.md` skill path -- this is a Volley repo path, not a Claude Code mechanism. Kept verbatim; it is a file path the agent reads, not a Claude invocation.
- "isolation:worktree" not referenced in body. Clean.
- `feedback_bump_depth_on_failure` referenced as a memory key -- environment-specific, kept verbatim.

---

## root-cause-analyst

Mapping:
- tools: Read, Grep, Glob, Bash + 7 godotiq MCP tools
- bash: allow, read: allow, glob: allow, grep: allow
- No Edit/Write -> edit: deny, write: deny
- No WebFetch/WebSearch -> webfetch: deny, websearch: deny
- task: deny
- All godotiq tools listed in doc comment line

Flags:
- References `.claude/skills/dispatch/SKILL.md` and `.claude/skills/bash-timeouts/SKILL.md` -- Volley repo file paths, kept verbatim.
- "Write the diagnosis to ai/swarm/tasks/{bug-id}-cause.md" -- same inconsistency pattern as researcher: Write not in tools allowlist but body instructs writing a file. Preserving; flagged for review.
- "run `git worktree list`" and "run `ggut`" in Bash discipline section -- tool-agnostic shell commands, kept verbatim.
- `feedback_bump_depth_on_failure` referenced -- kept verbatim.

---

## refactor-planner

Mapping:
- tools: Read, Grep, Glob + 4 godotiq MCP tools (no Bash, no Edit/Write)
- bash: deny
- read: allow, glob: allow, grep: allow
- edit: deny, write: deny
- webfetch: deny, websearch: deny
- task: deny
- All godotiq tools listed in doc comment line

Flags:
- Body references memory file paths under `~/.claude/projects/...` -- these are Volley-project memory paths that the agent is instructed to read. They are file paths, not Claude Code invocation mechanics. Kept verbatim; may need updating if OpenCode uses a different memory path convention.
- "Never apply edits; if a step feels trivial, still route it through the executing agent" -- workflow convention, not Claude-specific. Kept verbatim.

---

## design-doc-reader

Mapping:
- tools: Read, Grep, Glob, Bash, mcp__linear__get_issue, mcp__linear__list_issues
- bash: allow, read: allow, glob: allow, grep: allow
- No Edit/Write -> edit: deny, write: deny
- No WebFetch/WebSearch -> webfetch: deny, websearch: deny
- task: deny
- Linear MCP tools listed in doc comment line

Flags:
- Body references `~/.claude/projects/-home-josh-gamedev-volley/memory/` paths -- same as refactor-planner: file paths the agent reads, not Claude invocation mechanics. Kept verbatim; flagged if OpenCode memory paths differ.
- One body line read "so the next agent (or Josh) does not waste turns grepping" -- "grepping" is a generic term here; neutralized to "searching" since it referenced a specific tool name in a way that could mislead about available tools under OpenCode.
- `mcp__linear__get_issue` appears verbatim in the operating rules prose -- kept since it names the specific tool the agent should call, which is meaningful regardless of runtime.

---

## Cross-cutting flags for review

1. researcher and root-cause-analyst both instruct the agent to write output files (findings / cause) but neither source file listed Write or Edit in the tools allowlist. The ported files preserve this inconsistency. Review whether OpenCode agents should have write: allow to fulfil those instructions.

2. Memory paths under `~/.claude/projects/...` appear in refactor-planner and design-doc-reader body text. If OpenCode uses a different project memory layout, those paths will need updating.

3. All six agents reference `.claude/skills/...` paths in their body text. These are Volley repo-internal skill files read at runtime. They are not Claude Code invocation mechanics and were kept verbatim.
