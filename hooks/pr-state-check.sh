#!/usr/bin/env bash
# PR-state hydrate check, ported from pr-state-check.js (OpenCode plugin),
# itself ported BACK from pr-mention-state-check.sh (the original Claude Stop
# hook). Blocks a turn from stopping if the final assistant message claims a
# PR/state fact (merged, approved, checks passing, etc.) without a live
# `gh pr view/list/status/checks` (or `gh api .../pulls|issues`) call having
# run earlier in the same transcript.
#
# Reads the JSONL transcript at .transcript_path, scans tool_use entries in
# the CURRENT turn (from the most recent user message to the end) for a
# qualifying gh invocation, and checks the last assistant text block for a PR
# mention + a state claim. Fail open: unparseable input/transcript never blocks.

set -uo pipefail

input="$(cat)"
transcript_path="$(jq -r '.transcript_path // empty' <<<"$input")"

allow() { echo '{}'; exit 0; }

[ -n "$transcript_path" ] && [ -f "$transcript_path" ] || allow

STATE_CLAIM='\b(merged|is open|is closed|reopened|blocked|approve|approves|approved|approval|passing|passed|failing|failed|mergeable|queued|landed|ready to merge|auto-?merge|all checks|checks? (pass|green|red|fail)|review (passed|verdict|blocked|approved)|green|red)\b'
MENTIONS_PR='(#[0-9]+|\bPRs?\b|pull request)'
GH_READ='gh pr (view|list|status|checks)|gh api[^\n]*(/pulls|/issues)'

# Isolate the current turn: lines after the last user-role message.
last_user_line="$(grep -n '"type":"user"' "$transcript_path" 2>/dev/null | tail -1 | cut -d: -f1 || echo "0")"
[ -n "$last_user_line" ] || last_user_line=0

turn_content="$(tail -n +"$((last_user_line + 1))" "$transcript_path" 2>/dev/null || echo "")"
[ -n "$turn_content" ] || allow

# Did a qualifying gh read run this turn? Scan bash tool_use command inputs.
had_read=false
while IFS= read -r bash_cmd; do
  if echo "$bash_cmd" | grep -qP "$GH_READ"; then
    had_read=true
    break
  fi
done < <(echo "$turn_content" | jq -r 'select(.type=="assistant") | .message.content[]? | select(.type=="tool_use" and .name=="Bash") | .input.command // empty' 2>/dev/null)

if $had_read; then
  allow
fi

# Get the last assistant text block from this turn.
last_text="$(echo "$turn_content" | jq -r 'select(.type=="assistant") | .message.content[]? | select(.type=="text") | .text // empty' 2>/dev/null | tail -1)"

[ -n "$last_text" ] || allow

if echo "$last_text" | grep -qP "$MENTIONS_PR" && echo "$last_text" | grep -qiP "$STATE_CLAIM"; then
  jq -n '{
    decision: "block",
    reason: "state-check: your last response referenced a PR or challenge state without a live gh read this turn. Run the gh read now (gh pr view <n> --json state,mergeable,reviewDecision, or gh pr checks <n>), correct any claim that does not match, then stop."
  }'
  exit 0
fi

allow
