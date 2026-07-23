#!/usr/bin/env bash
# Git/shell command guards, ported from git-guards.js (OpenCode plugin).
# PreToolUse on Bash. Denies:
#   - direct push to main/master on the game repo (not volley-ai, not --force/--delete)
#   - rm chained with other commands (separator/subshell/newline present)
#   - standalone rm -rf (recursive AND force, any spelling)
# Fail open: unparseable input or non-Bash tool always allows.

set -euo pipefail

input="$(cat)"
tool_name="$(jq -r '.tool_name // empty' <<<"$input")"

allow() { echo '{}'; exit 0; }
deny() {
  local reason="$1"
  jq -n --arg reason "$reason" '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: $reason
    }
  }'
  exit 0
}

[ "$tool_name" = "Bash" ] || allow

cmd="$(jq -r '.tool_input.command // empty' <<<"$input")"
[ -n "$cmd" ] || allow

# block-direct-push-to-main on the game repo only, not volley-ai.
if echo "$cmd" | grep -qE 'git[[:space:]]+push[[:space:]]+(-u[[:space:]]+)?[^[:space:]]*[[:space:]]+(main|master)([[:space:]]|$)'; then
  if ! echo "$cmd" | grep -qE 'volley-ai' && ! echo "$cmd" | grep -qE -- '--force|--delete'; then
    deny "Direct push to main/master on the game repo is blocked. Push to a feature branch and land via PR."
  fi
fi

# rm-permission-reason: rm invoked as a command token (start, whitespace,
# separator, slash, backslash, or subshell char before it).
if echo "$cmd" | grep -qE '(^|[[:space:]&|;`($\\/])rm[[:space:]]'; then
  # Chained/piped: a separator, subshell, or newline alongside the rm.
  if [[ "$cmd" == *$'\n'* ]] || echo "$cmd" | grep -qE '(&&|\|\||;|\||`|\$\()'; then
    deny "rm is chained with other commands (a separator, subshell, or newline is present). A chained rm hides what it deletes in a line that is hard to review. Run the rm on its own, in a separate step."
  fi

  # Standalone rm -rf: recursive AND force, any spelling.
  recursive=false
  force=false
  echo "$cmd" | grep -qE -- '(-[a-zA-Z]*[rR]|--recursive)' && recursive=true
  echo "$cmd" | grep -qE -- '(-[a-zA-Z]*f|--force)' && force=true
  if $recursive && $force; then
    deny "Recursive force-delete (rm -rf) is not run unattended. Remove a directory's contents in a reviewed step, or ask Josh."
  fi
  # Standalone plain rm: allowed (still surfaces in the "ask" permission list).
fi

allow
