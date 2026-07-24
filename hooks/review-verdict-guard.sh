#!/usr/bin/env bash
# Review-verdict guard, ported from review-verdict-guard.js (OpenCode plugin).
# Blocks agents from posting verdict bodies to the PR conversation tab
# (the self-approval trap) rather than as inline diff-line comments.
#
# Case 1: gh pr review --comment --body <non-empty>
# Case 2: gh api path matching pulls/.../reviews with -f body= but no
#         -f comments=
#
# Fail open: unparseable input or an unhandled tool never blocks.

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

[ "$tool_name" = "Bash" ] || allow

cmd="$(jq -r '.tool_input.command // empty' <<<"$input")"
[ -n "$cmd" ] || allow

# Case 1: gh pr review --comment --body <non-empty>
if echo "$cmd" | grep -qE '(^|[;&|[:space:]])gh[[:space:]]+pr[[:space:]]+review([[:space:]]|$)'; then
  has_comment=false
  has_body=false
  echo "$cmd" | grep -qE -- '--comment([[:space:]]|$)' && has_comment=true
  echo "$cmd" | grep -qE -- '--body([[:space:]]|=)' && has_body=true
  if $has_comment && $has_body; then
    body_val="$(echo "$cmd" | grep -oP -- '--body(=\S+|\s+\S+)' | head -1 | sed -E 's/^--body[= ]//')"
    if [ -n "$body_val" ] && [ "$body_val" != '""' ] && [ "$body_val" != "''" ]; then
      deny "gh pr review --comment --body posts a COMMENTED verdict to the conversation tab. This is banned (reviewers skill: self-approval trap). On approve, report only to the dispatcher; on block, use the gh api reviews subresource with inline line comments, not --body."
    fi
  fi
fi

# Case 2: gh api path matching pulls/.../reviews sends body via form-flag
# but no comments flag.
if echo "$cmd" | grep -qP 'gh\s+api\s+.*pulls/[^\s]*/reviews(\s|$)'; then
  has_body_flag=false
  has_comments_flag=false
  echo "$cmd" | grep -qE '(^|[[:space:]])-f[[:space:]]+body=' && has_body_flag=true
  echo "$cmd" | grep -qE '(^|[[:space:]])-f[[:space:]]+comments=' && has_comments_flag=true
  if $has_body_flag && ! $has_comments_flag; then
    deny "gh api .../reviews with -f body= but without -f comments= posts a verdict body to the conversation tab. This is banned. Use -f comments= for inline line comments, and include body only when you also provide comments."
  fi
fi

allow
