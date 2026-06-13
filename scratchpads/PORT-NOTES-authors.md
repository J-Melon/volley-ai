# Port Notes: authors/ slice

## gdscript-implementer

**Tools -> permission mapping:**
- Bash -> bash: allow
- Read -> read: allow
- Write -> write: allow
- Edit -> edit: allow
- Glob -> glob: allow
- Grep -> grep: allow
- No WebFetch/WebSearch listed -> webfetch: deny, websearch: deny
- task: deny (authors do not dispatch sub-agents)
- mcp__godotiq__* (26 tools listed) -> preserved as frontmatter comment: `# godotiq tools (Claude allowlist): ...`
- mcp__linear__* (get_issue, list_issues, list_cycles, save_issue) -> preserved as frontmatter comment: `# linear tools (Claude allowlist): ...`

**Body references flagged for review:**
- "isolation: worktree" appears in the session tier description ("Tier 1 with worktree isolation"). This is a Claude Code mechanics concept (git worktree). Under OpenCode the equivalent mechanism is unclear; left verbatim. NEEDS REVIEW.
- References to `.claude/skills/` paths: these are repo-local skill files, not Claude-specific mechanics. Left as-is; they are data paths, not tool references.
- The body references "the Agent tool" nowhere directly. No neutralisation needed.
- `run_in_background` not referenced. No action needed.

---

## narrative-writer

**Tools -> permission mapping:**
- Read -> read: allow
- Grep -> grep: allow
- Glob -> glob: allow
- Edit -> edit: allow
- Write -> write: allow
- Bash -> bash: allow
- No WebFetch/WebSearch -> webfetch: deny, websearch: deny
- task: deny
- No godotiq or linear MCP tools listed.

**Body references flagged for review:**
- None. Body is prose/writing process only. No tool-name proper nouns appear in the body.
- Memory file paths use `~/.claude/projects/...` convention. These are Claude Code project memory paths. Under OpenCode, whether this path convention is supported is unknown. NEEDS REVIEW: confirm OpenCode can resolve `~/.claude/projects/` memory paths, or update paths to OpenCode equivalent.

---

## infra-implementer

**Tools -> permission mapping:**
- Bash -> bash: allow
- Read -> read: allow
- Write -> write: allow
- Edit -> edit: allow
- Glob -> glob: allow
- Grep -> grep: allow
- WebFetch -> webfetch: allow
- WebSearch -> websearch: allow
- task: deny
- mcp__linear__* (get_issue, list_issues, list_cycles, save_issue) -> preserved as frontmatter comment
- No godotiq tools listed.

**Body references flagged for review:**
- No Claude-specific tool-name proper nouns in the body. "Read-only" used generically (not as the Read tool name). Clean.

---

## test-author

**Tools -> permission mapping:**
- Read -> read: allow
- Grep -> grep: allow
- Glob -> glob: allow
- Edit -> edit: allow
- Write -> write: allow
- Bash -> bash: allow
- No WebFetch/WebSearch -> webfetch: deny, websearch: deny
- task: deny
- No godotiq or linear MCP tools listed.

**Body references flagged for review:**
- "Tier 1 with worktree isolation" in session tier. Same as gdscript-implementer: Claude Code mechanics concept. Left verbatim. NEEDS REVIEW.
- Memory file paths: `memory/feedback_*.md` referenced without `~/.claude/projects/` prefix (relative). These may be repo-local memory files rather than Claude project memory. Left as-is since they are shorter paths and may resolve from the worktree root.

---

## integration-scenario-author

**Tools -> permission mapping:**
- Read -> read: allow
- Grep -> grep: allow
- Glob -> glob: allow
- Edit -> edit: allow
- Write -> write: allow
- Bash -> bash: allow
- No WebFetch/WebSearch -> webfetch: deny, websearch: deny
- task: deny
- No godotiq or linear MCP tools listed.

**Body references flagged for review:**
- "Tier 1 with worktree isolation" in session tier. Same note as test-author. NEEDS REVIEW.
- `ui_map`-style queries referenced in assertion guidance. This is a godotiq runtime tool (`ui_map`) used only as a conceptual reference for "the kind of query" to make, not as a literal tool call (integration-scenario-author has no godotiq tools). Left verbatim; context makes it explanatory not prescriptive.

---

## docs-tender

**Tools -> permission mapping:**
- Read -> read: allow
- Grep -> grep: allow
- Glob -> glob: allow
- Edit -> edit: allow
- Write -> write: allow
- No Bash listed -> bash: deny (read-only + write intent; no shell execution)
- No WebFetch/WebSearch -> webfetch: deny, websearch: deny
- task: deny
- No godotiq or linear MCP tools listed.

**Body references flagged for review:**
- Body mentions "Use Edit for surgical fixes, Write only when creating a genuinely new doc". These refer to Edit/Write as operations rather than as Claude tool proper nouns; the instruction is tool-agnostic in intent. Left as-is.
- Memory file paths use `~/.claude/projects/` convention. Same concern as narrative-writer. NEEDS REVIEW.
- No `run_in_background`, "the Agent tool", or `isolation: worktree` references in body.

---

## Summary of items needing human review

1. **"Tier 1 with worktree isolation"** (gdscript-implementer, test-author, integration-scenario-author): Claude Code mechanics for isolated git worktrees. OpenCode equivalent is unknown. Left verbatim in all three agents.
2. **`~/.claude/projects/` memory paths** (narrative-writer, docs-tender): Claude Code project-scoped memory convention. If OpenCode uses a different path or mechanism for persistent memory, these paths will not resolve. Affects all memory file references in those two agents.
3. **godotiq tool allowlist intent** (gdscript-implementer): The Claude def allowed 26 specific godotiq tools and excluded the runtime cluster. OpenCode does not gate individual MCP tools via the permission block in the same granular way. The exclusion intent (no `run`, `state_inspect`, `input`, `exec`, `verify_motion`, `screenshot`, `perf_snapshot`, `ui_map`) is documented only in the frontmatter comment and in the body prose, not enforced by the permission block. A human should confirm whether OpenCode supports per-tool MCP allowlists or whether a different mechanism is needed.
