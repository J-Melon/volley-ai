# Claude Code hooks

Enforcement hooks ported from the OpenCode `volley-ai/plugins/*.js` set BACK to
Claude Code hooks (shell scripts + jq, matching the shape of the original
Claude hooks these plugins were themselves ported FROM: em-dash-pre-tool.sh,
block-pr-merge, git-rebase-ask, rm-permission-reason, linear-issue-body-cap,
linear-comment-body-cap, synthesis-body-cap, reviewer-inline-comment-cap,
injection_guard.sh, pr-mention-state-check.sh).

This port is informed by the OpenCode JS, which is battle-tested and includes
fixes/refinements beyond the original shell hooks, not re-derived from
scratch.

Each script reads the Claude Code hook JSON on stdin (`.tool_name`,
`.tool_input`, `.tool_response`, `.transcript_path`, etc.) and writes a
decision JSON to stdout. Fail open throughout: unparseable input, or a tool
the guard does not recognise, always allows.

## Files

- **git-guards.sh** (`PreToolUse` / `Bash`) — direct push to main/master on the
  game repo (not `volley-ai`, not `--force`/`--delete`); `rm` chained with
  other commands via a separator/subshell/newline; standalone `rm -rf`
  (recursive AND force, any spelling). Denies via
  `hookSpecificOutput.permissionDecision: "deny"`.
- **em-dash.sh** (`PreToolUse` / `Bash`, `Edit`, `Write`,
  `mcp__linear__save_*`) — bans U+2014 and the spaced-hyphen prose connector
  ( word - word ) on every prose-writing surface. Bash is scanned only when the
  command writes prose to a permanent surface (commit, `gh pr create/edit`,
  redirect/heredoc into a text file) — a bash command legitimately contains a
  dash as a search pattern otherwise. Edit scans only `new_string`, never
  `old_string` (matching a dash to remove it is the cure, not the violation).
- **caps.sh** (`PreToolUse` / `mcp__linear__save_issue`,
  `mcp__linear__save_comment`, `Bash`) — the four output-length caps: Linear
  issue body (600), Linear comment body (300), synthesis verdict body via
  `gh ... bot-review.yml -f body=` (300), reviewer inline comment via
  `gh api pulls/.../{reviews,comments}` POST body (300). Claude's MCP tool
  names are already fully qualified, so this uses exact tool-name matches
  rather than the loose `/linear/i` regex the OpenCode plugin needed.
- **godotiq-guards.sh** (`PreToolUse` / `mcp__godotiq__*`) — blocks any
  GodotIQ tool call whose `path`/`file`/`scene`/`expected_scene` argument
  touches a hidden (dot-prefixed) directory segment.
- **injection-guard.sh** (`PostToolUse` / `WebSearch`, `WebFetch`) — injects a
  standing untrusted-content directive (+ per-invocation nonce, + structural
  injection-pattern warnings from the SH-199 pattern set) as
  `hookSpecificOutput.additionalContext`. Unlike the OpenCode
  `tool.execute.after`, Claude Code PostToolUse hooks cannot rewrite the tool
  result text in place; `additionalContext` is fed back to the model alongside
  the result and achieves the same "treat this as untrusted, here's why"
  effect. Always succeeds — a broken guard must not break the tool call.
- **pr-state-check.sh** (`Stop`) — ported as an actual Stop hook (per the
  original file's own comment, "ported from pr-mention-state-check.sh (Claude
  Stop hook)"), not OpenCode's `session.idle` re-prompt workaround. Reads the
  JSONL transcript at `.transcript_path`, isolates the current turn (from the
  last user-role line to the end), and blocks (`decision: "block"`) if the
  last assistant text block claims a PR/state fact (merged, approved, checks
  passing, etc.) without a qualifying `gh pr view/list/status/checks` or
  `gh api .../pulls|issues` call having run as a tool call earlier in that
  turn.
- **review-verdict-guard.sh** (`PreToolUse` / `Bash`) — blocks
  `gh pr review --comment --body <nonempty>` (a commented verdict on the
  conversation tab, the self-approval trap) and `gh api .../reviews` with
  `-f body=` but no `-f comments=` (the REST-equivalent trap).

## Verified

Each script was pipe-tested standalone with synthetic stdin JSON matching the
Claude Code hook input schema (deny/block and allow cases for every branch);
see the session that authored this port for the exact invocations. All fired
correctly.

Note: testing in this environment's interactive shell surfaced a `grep` shell
function shim (from a Claude Code snapshot) that aliases `grep` to `ugrep` and
subtly changes `-q` behaviour against pattern literals like `$'\n'`. That
shim is a testing-environment artifact only — it does not exist in the plain
`bash` process the hook runner spawns — but `git-guards.sh`'s chained-`rm`
check was rewritten to use a bash `[[ == *pattern* ]]` newline test instead of
`grep -q $'\n'` anyway, since it is strictly more portable.

## Dropped (not ported, matching the OpenCode plugins/README.md)

- **agent-list.js / swarm-dispatch.js** — Claude Code's native `Agent` tool
  already does background parallel dispatch; the OpenCode swarm-dispatch
  mechanism these replaced is unneeded here.
- **require-background-agent** — was already dropped in the OpenCode port
  (OpenCode's `task` tool has no background flag). Not revisited since Claude
  Code's `Agent` tool has native background dispatch directly.
- The six memory-injection hooks (inject-priority-memory,
  inject-latest-handoff, inject-memory-crown, inject-memory-crown-test,
  memory-correction-signal, memory-file-char-cap) — dropped by design
  upstream (read-on-demand via the memory trunks, not injection).

## Flagged for human review

- **pr-state-check.sh**: the exact shape of `transcript_path` JSONL (field
  names for role, content blocks, tool_use entries) was inferred from common
  Claude Code transcript conventions and verified against hand-built synthetic
  transcripts in testing, not against a captured real transcript file. If the
  real schema differs (e.g. a different nesting for `tool_use` blocks, or
  `type` values other than `"user"`/`"assistant"`), the turn-boundary and
  gh-read detection logic may need adjusting. Confirm against a live
  `transcript_path` from an actual session before relying on this in
  production.
- **injection-guard.sh**: the exact `tool_response` shape for `WebSearch`/
  `WebFetch` (string vs. `{output}` vs. `{content}` vs. `{result}`) was not
  confirmed against a live tool_response payload; the script tries several
  plausible shapes defensively. If none match, the directive still fires
  (nonce + standing warning) but the structural pattern scan silently finds
  nothing to scan and only the standing directive is injected. Confirm the
  real shape and simplify the extraction once known.
- **Stop hook transcript performance**: `pr-state-check.sh` re-reads and
  greps the full transcript file on every Stop. For very long sessions this
  could get slow; consider tailing only the last N lines if this becomes an
  issue in practice.
