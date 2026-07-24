#!/usr/bin/env bash
# Em-dash / spaced-hyphen prose guard, ported from em-dash.js (OpenCode plugin),
# itself ported from em-dash-pre-tool.sh. Bans U+2014 and the spaced-hyphen
# prose connector ( word - word ) on every prose-writing surface.
# Per feedback_no_em_dashes.
#
# Scanning rules, mirroring the JS:
#   - Bash: a command can legitimately CONTAIN an em dash as a search pattern,
#     so scan ONLY commands that write prose to a permanent surface (commit
#     message, PR create/edit, redirect/heredoc into a text file). Only the
#     em-dash check applies to bash (bash flags legitimately contain hyphens).
#   - Edit: scan only the written side (new_string), never old_string.
#   - Write: scan content.
#   - Linear MCP tools (mcp__linear__save_*): scan body/description/title in full.
#
# Fail open: unparseable input or an unhandled tool/field always allows.

set -uo pipefail

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

EM=$'\xe2\x80\x94' # U+2014


is_code_file() {
  case "$1" in
    *.gd|*.tscn|*.tres|*.cfg|*.json|*.yml|*.yaml|*.sh|*.gdshader|*.uid) return 0 ;;
    *) return 1 ;;
  esac
}
check_scan() {
  local scan="$1"
  local skip_hyphen_check="${2:-}"
  [ -n "$scan" ] || return 0
  if printf '%s' "$scan" | grep -qF "$EM"; then
    deny "U+2014 (em dash) detected in tool input. The em dash is banned on every surface per feedback_no_em_dashes. Replace with a comma, semicolon, period, or parentheses, then retry."
  fi
  if [ -n "$skip_hyphen_check" ]; then
    return 0
  fi
  # Spaced-hyphen prose connector: [^ ] - (?!>)[^ ]  i.e. "word - word" but not "word ->word"
  if printf '%s' "$scan" | grep -qE '[^ ] - [^>][^ ]|[^ ] - $'; then
    deny "Spaced-hyphen prose connector ( word - word ) detected. A hyphen as prose punctuation is banned per feedback_no_em_dashes. Replace with a comma, semicolon, period, or parentheses, then retry."
  fi
}

case "$tool_name" in
  Bash)
    cmd="$(jq -r '.tool_input.command // empty' <<<"$input")"
    [ -n "$cmd" ] || allow
    # Commands that write prose to a permanent surface.
    if echo "$cmd" | grep -qE '(^|[;&|[:space:]])(git commit|gcmsg|gc(f|x|d|h|r|t|i|st|pf|bd|v)!?)([[:space:]]|$)|gh pr (create|edit)|>>?[[:space:]]*[^[:space:]]*\.(md|txt|gd|tres|tscn|cfg|json|yml|yaml|sh)|<<'; then
      check_scan "$cmd"
    fi
    ;;
  Edit)
    file_path="$(jq -r '.tool_input.file_path // empty' <<<"$input")"
    scan="$(jq -r '.tool_input.new_string // empty' <<<"$input")"
    skip=""
    is_code_file "$file_path" && skip=1
    check_scan "$scan" "$skip"
    ;;
  Write)
    file_path="$(jq -r '.tool_input.file_path // empty' <<<"$input")"
    scan="$(jq -r '.tool_input.content // empty' <<<"$input")"
    skip=""
    is_code_file "$file_path" && skip=1
    check_scan "$scan" "$skip"
    ;;
  mcp__linear__save_*)
    scan="$(jq -r '[.tool_input.body, .tool_input.description, .tool_input.title, .tool_input.content] | map(select(. != null)) | join("\n")' <<<"$input")"
    check_scan "$scan"
    ;;
  *)
    allow
    ;;
esac

allow
