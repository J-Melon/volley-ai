---
name: feedback_post_reviews_via_swarm_script
description: "To post inline findings on a PR (a battle/review verdict I am landing as the dispatcher), use scripts/swarm/post-review.sh with a verdict JSON file, NOT hand-rolled gh api calls. FIRES WHEN about to post line-anchored review comments. The pr skill names the tool; read it first. Hand-rolling gh api .../comments hits the wrong endpoint and wrong flags."
metadata:
  node_type: memory
  type: feedback
  originSessionId: b77584dc-0219-43fe-9ed5-81e3c4d76283
---

Posting inline findings on a PR has a provided tool: `scripts/swarm/post-review.sh <pr> <verdict-json-file>`. The JSON is `{verdict: "block", commenter: "...", items: [{path, line, body}]}`. The script submits ONE COMMENT Review with empty body wrapping all the line comments, which is exactly the [[pr-output]] discipline (no verdict block in the conversation tab). The `pr-output` and `reviewers` skills name this tool. Read the skill before posting, do not improvise the API.

**The failure this prevents** (2026-06-06, landing a devils-advocate battle on #866): I hand-rolled `gh api repos/.../pulls/<n>/comments`. Wrong on the API axes: that is the single-comment endpoint not the Reviews API, and `gh api` takes `--input -`/`-F`, not `--body-file`. The fix that worked first try: `Write` the verdict JSON to a file, then one clean `./scripts/swarm/post-review.sh 866 file.json`.

**WHY a Bash call got denied (found in config 2026-06-06, after TWO wrong guesses).** The denied commands both ended with `rm -rf "$TMP"`. `Bash(rm:*)` is on the `ask` list in `~/.claude/settings.json`, so ANY command containing `rm` triggers an approval prompt, and Josh declined it. That is the whole cause. The `gh api --method POST` calls in the same commands were fine on their own (the threaded replies POSTed and succeeded). I guessed the cause TWICE and was wrong both times, first "compound shell is unreviewable", then "gh api mutation gate", before reading `~/.claude/settings.json` where the answer (`Bash(rm:*)` under `ask`) was sitting plainly. The lesson is not about Bash shape at all: **when a tool call is denied, read the permission config (`allow`/`ask`/`deny` in settings.json) FIRST; do not theorize a cause.** A confident causal story is coherence, not knowledge ([[feedback_self_judgment_is_coherence_not_accuracy]]), and even my "test" was unclean (the passing clone also had an `rm`). Practically: avoid a trailing `rm` cleanup in an otherwise-fine command (it drags the whole command onto the ask path); let `/tmp` files be, or delete them in a separate trivial step.

**The standing lesson** (unaffected by the above): when a skill exists for an output step ([[pr]] for reviews and bodies, [[commits]] for commits), read it and use the tool it names before touching raw `gh`/`git`. Writing data to a file then running one short command is still the better habit, for legibility and approvability, just not because compound shells are auto-denied.

The dispatcher posts inline findings (not the bot): the agent returns findings to me, I post them via the script. Confirmed 2026-06-06.
