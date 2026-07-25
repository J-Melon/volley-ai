#!/usr/bin/env bash
# Git/shell command guards, ported from git-guards.js (OpenCode plugin).
# PreToolUse on Bash. Denies:
#   - direct push to main/master on the game repo (not volley-ai, not --force/--delete)
#   - git rebase (never rebase; --abort/--quit allowed as the escape hatch)
#   - git commit --no-verify/-n (pre-commit hooks must run)
#   - new branch carrying a Linear id (sh-N) or a malformed feature/ name
#   - gh pr close (Josh closes and merges challenges, not the swarm)
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

# never-rebase: git rebase is denied outright. --abort/--quit are the escape
# hatch out of a rebase already in progress, so those are allowed.
if echo "$cmd" | grep -qE 'git[[:space:]]+rebase([[:space:]]|$)'; then
  if ! echo "$cmd" | grep -qE -- '--abort|--quit'; then
    deny "git rebase is blocked. Never rebase; merge main in instead (git merge main). If a rebase is genuinely needed, ask Josh."
  fi
fi

# branch-name guard on the game repo: a new branch must not carry a Linear id
# (sh-N leaks a private id onto a public surface), and a feature/ branch must
# match feature/<number>-slug (the GitHub issue number, no sh-/gh- prefix).
# Matches checkout -b, switch -c, branch <name>, and worktree add -b.
# volley-ai pushes to main and has no branch convention, so exempt it.
if ! echo "$cmd" | grep -qE 'volley-ai'; then
  newbranch="$(echo "$cmd" | grep -oE 'git[[:space:]]+(checkout[[:space:]]+-b|switch[[:space:]]+-c|branch|worktree[[:space:]]+add[[:space:]]+-b)[[:space:]]+[^[:space:]]+' | grep -oE '[^[:space:]]+$' || true)"
  if [ -n "$newbranch" ]; then
    if echo "$newbranch" | grep -qiE 'sh-[0-9]'; then
      deny "Branch name carries a Linear id (sh-N). The issue number on a branch is the GitHub number, no sh-/gh- prefix: feature/<number>-slug. Rename before creating."
    fi
    if echo "$newbranch" | grep -qE '^feature/' && ! echo "$newbranch" | grep -qE '^feature/[0-9]+(-[0-9]+)*-'; then
      deny "feature/ branch must be feature/<github-issue-number>-slug (e.g. feature/1075-drop-targets). Fix the name before creating."
    fi
  fi
fi

# pr-close guard: closing a challenge is Josh's call, not the swarm's.
if echo "$cmd" | grep -qE 'gh[[:space:]]+pr[[:space:]]+close([[:space:]]|$)'; then
  deny "gh pr close is blocked. Josh closes and merges challenges. If a PR should be superseded, tell Josh and let him close it."
fi

# no-verify guard: pre-commit hooks must run. --no-verify and -n are blocked.
if echo "$cmd" | grep -qE 'git[[:space:]]+commit[[:space:]].*--no-verify' \
  || echo "$cmd" | grep -qE 'git[[:space:]]+commit[[:space:]].* -n([[:space:]]|$)'; then
  deny "git commit --no-verify is blocked. Pre-commit hooks (gdlint, gdformat, gut) must run. Fix the failures instead of bypassing them."
fi

# gh-comment guard: comments and reviews are for humans. The swarm reports to
# the dispatcher and posts nothing on the PR. Blocks the porcelain (gh pr/issue
# comment, gh pr review) and the API write paths that post comments, reviews, or
# review-thread replies (POST/PATCH to a .../comments, /reviews, or /replies URL).
if echo "$cmd" | grep -qE 'gh[[:space:]]+(pr|issue)[[:space:]]+comment([[:space:]]|$)' \
  || echo "$cmd" | grep -qE 'gh[[:space:]]+pr[[:space:]]+review([[:space:]]|$)'; then
  deny "Posting PR/issue comments is blocked. Comments and reviews are for humans; report findings to Josh in chat instead."
fi
if echo "$cmd" | grep -qE 'gh[[:space:]]+api([[:space:]]|$)' \
  && echo "$cmd" | grep -qE -- '-X[[:space:]]*(POST|PATCH)|-(-method|f|-field|F|-raw-field)([[:space:]]|=)' \
  && echo "$cmd" | grep -qE '/(comments|reviews|replies)([[:space:]/?"'\'']|$)'; then
  deny "Posting to a comments/reviews/replies endpoint via gh api is blocked. Comments and reviews are for humans; report findings to Josh in chat instead."
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
