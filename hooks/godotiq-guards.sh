#!/usr/bin/env bash
# GodotIQ dot-directory guard, ported from godotiq-guards.js (OpenCode plugin).
# PreToolUse matching tool name prefix mcp__godotiq__. Blocks any call whose
# path/file/scene/expected_scene argument touches a hidden (dot-prefixed)
# directory segment. Fail open: unparseable input or a non-godotiq tool allows.

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

case "$tool_name" in
  mcp__godotiq__*) ;;
  *) allow ;;
esac

path="$(jq -r '.tool_input.path // .tool_input.file // .tool_input.scene // .tool_input.expected_scene // empty' <<<"$input")"
[ -n "$path" ] || allow

stripped="${path#res://}"
IFS='/' read -ra segments <<<"$stripped"
touches_dot_dir=false
for seg in "${segments[@]}"; do
  if [ -n "$seg" ] && [[ "$seg" == .* ]]; then
    touches_dot_dir=true
    break
  fi
done

if $touches_dot_dir; then
  deny "GodotIQ tool \"$tool_name\" blocked: path \"$path\" accesses a hidden/dot directory. GodotIQ is for game files (scenes, scripts, assets), not config directories."
fi

allow
