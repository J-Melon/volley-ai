# BATTLE2 contract-fidelity review scratchpad
Reviewer: claude-sonnet-4-6 | 2026-06-13

## Files read
- /home/josh/gamedev/volley-ai/plugins/swarm-dispatch.js (359 lines)
- /home/josh/gamedev/volley-ai/plugins/SWARM-DISPATCH-SCOPE.md (157 lines)
- types.gen.d.ts lines 1231-1240, 2244-2290 (SessionPromptData, TextPartInput)
- types.gen.d.ts lines 397-416 (session.idle event shape)

---

## Hunt 1: Dead code from removing swarm_collect

swarm_collect: GONE from tool map. Good.

swarm_cleanup: still present (lines 274-291). Coherent: walks swarm.minions,
calls removeWorktree per record that has a worktreePath. No reference to collect.
No orphaned collect helpers.

Unused vars/helpers: none found. markDone, pickCodename, depthOf, getSwarm,
makeWorktree, removeWorktree all have callers. CODENAMES/CONCURRENCY_DEFAULT/
MINION_TIMEOUT_MS/MAX_DEPTH all used.

Stale references to collect:

1. LINE 216 comment: `// failure surfaces via collect, not here`
   The collect tool no longer exists. This is dead commentary, misleading.
   "via collect" should read "via the push report" or similar.

2. SCOPE.md line 49: still documents `swarm_collect({ wait=false })` as tool #2.
   Lines 49-57 describe the old pull-collect flow (snapshot status, wake parent
   via noReply/system part). This is the stale scope the brief flagged - confirmed.
   The SCOPE also says "Return IMMEDIATELY with the list of {childSessionID,
   label}" (line 45) as the swarm_dispatch return, but the actual return now says
   "Keep working; each minion reports back to you when it finishes." That is a
   design drift, not a bug, but SCOPE is stale.

3. swarm_dispatch description string (line 146): says "no need to poll" which
   matches the new design. No mention of collect. OK.

4. Return text (line 269): "Keep working; each minion reports back to you when
   it finishes." No instruction to run swarm_collect. OK.

VERDICT: One live dead comment at line 216. SCOPE.md is stale re: collect (lines
49-57, 125-126). Cosmetic, not a runtime defect.

---

## Hunt 2: client.session.prompt options shape for report injection

Code (lines 80-85):
  client.session.prompt({
    path: { id: swarm.dispatcherID },
    body: { parts: [{ type: "text", text }] },
  })

SDK SessionPromptData (types.gen.d.ts:2244-2268):
  body?: {
    messageID?: string;
    model?: { ... };
    agent?: string;       <- optional
    noReply?: boolean;    <- optional
    system?: string;
    tools?: { ... };
    parts: Array<TextPartInput | ...>;  <- required
  }
  path: { id: string }   <- required
  query?: { directory?: string }

TextPartInput (types.gen.d.ts:1231-1235):
  { id?: string; type: "text"; text: string; synthetic?: boolean; ... }

Shape match: path.id = string (OK), body.parts[0] = {type:"text", text} (OK).
agent omitted: the field is optional. Omitting it means the server will use the
session's configured agent (the dispatcher's agent), not inject as a raw user
turn. THIS IS THE MATERIAL QUESTION.

The intent: inject the minion report as a "user turn that WAKES the dispatcher."
The SDK has noReply?: boolean. Omitting noReply means noReply=false (i.e., the
model WILL reply). So a real model turn fires. That does wake the dispatcher.

But: omitting agent means the injection runs under the dispatcher's own agent
profile. The dispatcher will see the minion's report text as a user message and
then formulate a response - that IS the intent (integrate the result, continue
working). So this is probably fine by design.

Risk: if the dispatcher is mid-turn (actively running) when the push arrives,
does session.prompt queue, block, error, or silently drop? The SCOPE (line
148-150) flags this as unverified: "Wake-the-parent: does session.prompt into
the parent mid-turn behave, or must we wait for parent idle?" The code does NOT
guard against mid-turn injection. If the server rejects or queues mid-turn
prompts silently, the report is lost with only a .catch(()=>{}) swallow. This
is a known open risk (flagged in SCOPE) that is still unverified.

VERDICT: Shape is contract-correct. The open mid-turn risk is real and
acknowledged but unguarded in code.

---

## Hunt 3: Empty/terse minion output - graceful degradation?

reportToDispatcher (lines 57-90):
- Reads last assistant message parts, filters type=text, joins text.
- If body is falsy after that: injects "(no output)".
- If messages() throws: injects "(could not read my output)".

For a side-effecting minion (opened PR, posted Linear comment) whose last
assistant turn is terse (e.g., "Done. PR #42 opened."), the injected report
contains only that terse text. The dispatcher gets: "Mabel (gdscript-implementer)
reporting on SH-254:\n\nDone. PR #42 opened."

Design concern per brief: the real artifact (PR URL, Linear URL) is in that
assistant turn text if the minion said so. If the minion's terse final message
DOES include the artifact reference, the report is adequate. If the minion
silently finished (empty assistant turn), the dispatcher gets "(no output)" and
has no pointer to the artifact - it must go hydrate from gh/Linear.

This is a design tradeoff, not a code defect. The code degrades as gracefully
as it can (the "(no output)" sentinel is explicit). Whether push-of-self-report
is the right channel for side-effecting minions is a design question the
reviewer flags but the code does not resolve. Volley's distrust of self-reports
(feedback_verify_reviewer_claims) is relevant: a minion that says "PR opened"
is still a self-report; the dispatcher should verify via gh CLI before trusting.
The code does not prevent that verification, it just doesn't enforce it.

VERDICT: Code is correct for the defined behavior. Design flag stands.

---

## Hunt 4: Does anything assume task tool exists?

Searched: no reference to "task" tool in the plugin JS. The tool map exports
only swarm_dispatch and swarm_cleanup. The comment at line 4 references native
task tool in a historical/why-not context, not a dependency. No code path calls
or checks for the task tool.

VERDICT: No assumption of task tool. Clean.

---

## Hunt 5: Worktree vs session delete for isolate minions

reportToDispatcher (line 88): `client.session.delete({ path: { id: rec.childID } })`
Comment on line 87: "Deleting the session never touches a worktree."

The code deletes the SESSION, not the worktree. The worktree record (rec.worktreePath,
rec.branch) is still in swarm.minions... wait, line 89: `swarm.minions.delete(rec.childID)`.

PROBLEM: swarm_cleanup (lines 280-290) iterates swarm.minions to find worktrees.
But reportToDispatcher deletes the record from swarm.minions BEFORE swarm_cleanup
can see it (line 89). So after a minion reports and self-deletes its record, its
worktree is orphaned from the cleanup tool's perspective - swarm_cleanup will
never see it.

Sequence:
1. Minion finishes -> markDone -> reportToDispatcher
2. reportToDispatcher: session.delete + swarm.minions.delete(rec.childID)  [line 88-89]
3. Later: dispatcher calls swarm_cleanup
4. swarm_cleanup: iterates swarm.minions - the record is GONE
5. Worktree at rec.worktreePath is never cleaned up by swarm_cleanup

The worktree itself is intact (session delete != worktree remove, correct). But
swarm_cleanup has lost the reference to it. The cleanup tool will report "No
worktrees to clean" even though worktrees exist on disk. The user must manually
run `git worktree remove` or `git worktree list` to find and remove them.

This is a real defect. The fix: either don't delete the record from swarm.minions
until cleanup runs (keep it in a "done" state), or maintain a separate completed-
worktrees list.

VERDICT: BLOCK-level defect. swarm.minions.delete at line 89 races
swarm_cleanup, orphaning worktree references for all isolate:true minions.

---

## Summary table

| Hunt | Finding | Severity |
|------|---------|----------|
| Dead code / collect refs | Line 216 stale comment; SCOPE lines 49-57 stale | Cosmetic |
| session.prompt shape | Contract-correct; mid-turn injection unguarded | Known risk |
| Empty minion output | Degrades gracefully; design tradeoff flagged | Design note |
| task tool assumption | None found | Clean |
| Worktree after session.delete | swarm.minions.delete(line 89) orphans worktree refs | BLOCK |
