#!/usr/bin/env bash
# Output-length caps, ported from caps.js (OpenCode plugin), itself ported from
# the four *-body-cap Claude hooks. Denies when THIS call sets a field longer
# than its cap; state-only saves (field absent) pass. Fail open on unparseable
# input.
#
#   linear-issue-body-cap      : mcp__linear__save_issue, description > 600
#   linear-comment-body-cap    : mcp__linear__save_comment, body > 300
#   synthesis-body-cap         : Bash, gh ... bot-review.yml, -f body= > 300
#   reviewer-inline-comment-cap: Bash, gh api pulls/.../{reviews,comments} POST,
#                                any "body":"..." > 300
#
# Claude's MCP tool names are fully qualified (mcp__linear__save_issue,
# mcp__linear__save_comment), so no loose regex matching is needed here.

set -uo pipefail

ISSUE_CAP=600
COMMENT_CAP=300
SYNTH_CAP=300
INLINE_CAP=300

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

case "$tool_name" in
  mcp__linear__save_issue)
    d="$(jq -r '.tool_input.description // empty' <<<"$input")"
    len=${#d}
    if [ -n "$d" ] && [ "$len" -gt "$ISSUE_CAP" ]; then
      deny "Issue body is ${len} chars; the cap is ${ISSUE_CAP}. Trim the body to the ask + AC and move the depth (options, rationale, design detail) into a designs/ doc linked via the issue links field."
    fi
    allow
    ;;
  mcp__linear__save_comment)
    b="$(jq -r '.tool_input.body // empty' <<<"$input")"
    len=${#b}
    if [ -n "$b" ] && [ "$len" -gt "$COMMENT_CAP" ]; then
      deny "Comment body is ${len} chars; the cap is ${COMMENT_CAP}. Collapse to the clause that matters; push depth into the issue body, a linked designs/ doc, or the git log."
    fi
    allow
    ;;
  Bash)
    cmd="$(jq -r '.tool_input.command // empty' <<<"$input")"
    [ -n "$cmd" ] || allow

    # synthesis-body-cap: gated to bot-review.yml, the -f body=... value.
    if echo "$cmd" | grep -qF 'bot-review.yml'; then
      body_val="$(echo "$cmd" | grep -oP "(?<=-f body=[\"'])[^\"']*(?=[\"'])" | head -1 || true)"
      if [ -n "$body_val" ] && [ "${#body_val}" -gt "$SYNTH_CAP" ]; then
        deny "Synthesis verdict body is ${#body_val} chars; the cap is ${SYNTH_CAP}. Collapse to the resolved-findings clause and the verdict; the inline threads carry the detail."
      fi
    fi

    # reviewer-inline-comment-cap: POST to pulls/.../{reviews,comments},
    # worst "body":"..." value.
    if echo "$cmd" | grep -qP 'pulls/[^ ]*/(reviews|comments)' && echo "$cmd" | grep -qE -- '(-X )?POST'; then
      worst=0
      while IFS= read -r bodyval; do
        len=${#bodyval}
        [ "$len" -gt "$worst" ] && worst=$len
      done < <(echo "$cmd" | grep -oP '"body"\s*:\s*"(?:[^"\\]|\\.)*"' | sed -E 's/^"body"\s*:\s*"(.*)"$/\1/')
      if [ "$worst" -gt "$INLINE_CAP" ]; then
        deny "An inline review comment is ${worst} chars; the cap is ${INLINE_CAP}. A finding is one clause: name the concern and the fix, anchored to the line. Push the reasoning into the dispatcher report, not the PR thread."
      fi
    fi
    allow
    ;;
  *)
    allow
    ;;
esac
