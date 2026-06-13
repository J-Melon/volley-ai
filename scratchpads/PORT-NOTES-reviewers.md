# Port notes: reviewers slice

Ported 11 files from `/home/josh/gamedev/volley/.claude/agents/reviewers/` to `/home/josh/gamedev/volley-ai/agents/` (flat, no subdir).

## Uniform transforms applied to all 11 files

- Dropped `name:` from frontmatter.
- Added `mode: subagent`.
- Kept `description:` verbatim.
- Kept `skills:` list verbatim.
- Added `permission:` block. All 11 had `tools: Read, Grep, Glob, Bash` -> `bash: allow, read: allow, glob: allow, grep: allow`. None had Edit or Write -> `edit: deny, write: deny` explicitly set. None had WebFetch/WebSearch -> `webfetch: deny, websearch: deny`. None listed Agent/Task -> `task: deny`.
- No MCP tools (godotiq, linear) were in any of the source `tools:` lists, so no doc comments needed.

## Per-agent body changes and flags

### asset-pipeline
- Body: `.claude/skills/untrusted-content/SKILL.md` reference -> "the untrusted-content skill" (path neutralized).
- Body: `.claude/skills/reviewers/SKILL.md` reference -> "the reviewers skill".
- No other Claude-specific mechanics in body.

### ci-and-workflows
- Same path neutralizations as asset-pipeline.

### code-quality
- `.claude/skills/untrusted-content/SKILL.md` -> "the untrusted-content skill".
- `.claude/skills/reviewers/SKILL.md` -> "the reviewers skill".
- `.claude/skills/dispatch/SKILL.md` -> "the dispatch skill".
- `.claude/skills/commits/SKILL.md` -> "the commits skill".
- `.claude/skills/bash-timeouts/SKILL.md` -> "the bash-timeouts skill".
- `.claude/skills/implementer-nits/SKILL.md` -> "the implementer-nits skill".
- "Never flag an item that is already covered by" sentence: path-style refs generalized to skill names.

### docs-and-writing
- Voice skill path `/home/josh/gamedev/volley/.claude/skills/voice/SKILL.md` -> "the voice skill (SKILL.md in the voice skill directory)". **FLAG**: absolute path with user home dir was present; neutralized to generic skill reference. Caller should verify OpenCode has a canonical way to resolve skill paths.
- Memory file paths `~/.claude/projects/-home-josh-gamedev-volley/memory/feedback_*.md` -> "user memory `feedback_*.md`". **FLAG**: these are Claude project-memory paths with no equivalent in OpenCode. Kept the filenames as identifiers so the agent can still search for them, but the resolution mechanism differs. Review whether these need to become explicit read paths or OpenCode memories.

### gdscript-conventions
- `.claude/skills/untrusted-content/SKILL.md` -> "the untrusted-content skill".
- `.claude/skills/reviewers/SKILL.md` -> "the reviewers skill".
- `@onready` -> `@export` example reworded from arrow notation to prose to avoid markdown rendering issues (minor).

### godot-scene
- `.claude/skills/implementer-nits/SKILL.md` -> "the implementer-nits skill".
- `.claude/skills/untrusted-content/SKILL.md` and `.claude/skills/reviewers/SKILL.md` -> skill names.

### repetition-reviewer
- `.claude/skills/reviewers/SKILL.md` -> "the reviewers skill".
- `.claude/skills/large-doc-dandori/SKILL.md` -> "the large-doc-dandori skill".
- `~/.claude/projects/` memory paths -> "user memory `feedback_*.md`". Same flag as docs-and-writing.
- Section header "Phase-folder phase-folder residue" had a duplication in source ("Phase-folder phase-folder") -> shortened to "Phase-folder residue". Minor cleanup, not a semantic change.

### save-format-warden
- `.claude/skills/untrusted-content/SKILL.md` -> "the untrusted-content skill".
- `.claude/skills/reviewers/SKILL.md` -> "the reviewers skill".
- Memory reference `feedback_no_save_compat.md` left as filename; no path resolution needed since agent consults by name.

### signals-lifecycle
- Same path neutralizations.
- `tree_exited` -> `tree_exiting` example: reworded from arrow notation to prose.

### style-warden
- `.claude/skills/implementer-nits/SKILL.md` -> "the implementer-nits skill".
- `.claude/skills/code-comments/SKILL.md` -> "the code-comments skill".
- `.claude/skills/untrusted-content/SKILL.md` -> "the untrusted-content skill".
- `.claude/skills/reviewers/SKILL.md` -> "the reviewers skill".

### test-coverage
- All `.claude/skills/` paths -> skill names.
- `~/.claude/projects/` memory paths -> "user memory `feedback_*.md`". Same flag as docs-and-writing.
- Coverage workflow steps use `gh` CLI directly; Bash is allowed so these remain intact.

## Flags for review

1. **Memory path resolution**: `docs-and-writing`, `repetition-reviewer`, and `test-coverage` reference Claude project-memory files at `~/.claude/projects/-home-josh-gamedev-volley/memory/feedback_*.md`. These have been preserved as named references ("user memory `feedback_*.md`") but OpenCode has no equivalent mechanism. Either: (a) convert these to explicit Read paths the agent can look up, or (b) inline the content as standing instructions.

2. **Skill path resolution**: All 11 files neutralized `.claude/skills/*/SKILL.md` paths to human-readable "the X skill" references. OpenCode's skill resolution mechanism should be confirmed to match the `skills:` list format used here.

3. **No MCP tools in any reviewer**: confirmed none of the 11 source files listed any `mcp__godotiq__*` or `mcp__linear__*` tools, so no doc comments were needed.

4. **`run_in_background`, `isolation: worktree`**: none appeared in any reviewer body; no action needed.

5. **"as commits" output pattern**: several agents instruct committing mechanical fixes ("as commits"). This is task-agent behavior, and these are `mode: subagent`. The instruction is preserved verbatim because it describes intended behavior for the caller to wire up, not a self-invoked tool call. Flag for caller to confirm OpenCode subagent commit semantics match.
