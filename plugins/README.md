# OpenCode guard plugins

Enforcement hooks ported from the Claude Code `.claude/hooks/` set to OpenCode
plugins. Each `tool.execute.before` handler throws to deny a tool call (OpenCode's
equivalent of Claude's `permissionDecision: "deny"`); the thrown message is the
reason the agent sees. All fail open: a guard that cannot parse its input does
not throw.

Mounted into a project by symlink: `volley/.opencode/plugins -> ../volley-ai/plugins`
(gitignored in volley, so a clone without this repo alongside gets no dangling link).

## Files

- **git-guards.js** — `block-pr-merge`, `git-rebase-ask` (degraded: ask -> block,
  OpenCode has no return-an-ask primitive), `rm-permission-reason`. Bash command gates.
- **em-dash.js** — bans U+2014 and the spaced-hyphen prose connector on prose
  surfaces (bash prose-writing commands, edit `newString`, write `content`,
  Linear/PR text). Ported from `em-dash-pre-tool.sh`.
- **caps.js** — the four output-length caps: Linear issue body (600), Linear
  comment (300), synthesis verdict body (300), reviewer inline comment (300).

Verified firing in OpenCode (em dash, rm -rf, gh pr merge all blocked with the
ported messages).

## Dropped (not ported)

- **require-background-agent** — Claude forced `run_in_background: true` on every
  Agent dispatch. OpenCode's subagent dispatch is the `task` tool and has NO
  native background flag (upstream feature request #5887/#15069); it blocks
  synchronously by design. The flag this hook required does not exist here, so
  there is nothing to enforce. Revisit if/when OpenCode adds background subagents.

- The six memory-injection hooks were dropped earlier by design (read-on-demand,
  not injection): inject-priority-memory, inject-latest-handoff, inject-memory-crown,
  inject-memory-crown-test, memory-correction-signal, memory-file-char-cap.

## TODO (underdocumented OpenCode API)

- **injection_guard** — Claude PostToolUse on WebSearch/WebFetch prepended an
  untrusted-content directive (+ nonce, + structural injection-pattern warnings).
  Needs OpenCode's `tool.execute.after` context-mutation shape confirmed (the docs
  do not specify how to add context to a tool result). Until then the standing
  untrusted-content stance lives in the `untrusted-content` skill.
- **pr-mention-state-check** — Claude Stop hook: if a turn claimed a PR's state
  without a live `gh` read, block once to force a hydrate. Maps to `session.idle`
  + `client.session.prompt(...)` re-entry (reliable in the TUI, where Volley runs).
  Needs the exact idle-handler + client API confirmed before wiring.
