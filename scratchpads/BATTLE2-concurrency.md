# BATTLE2 Concurrency Review - Raw Notes

## File read: swarm-dispatch.js, full

---

## Hunt 1: Double-report race (idle + timeout both fire)

markDone (line 94):
  - if (rec.done) return   <- guard at top
  - rec.done = true        <- immediately set
  - clearTimeout(rec.timer)

Timeout handler (lines 235-240):
  - if (rec.done) return   <- own guard (redundant but harmless)
  - rec.timedOut = true
  - markDone(swarm, rec)

Idle handler (lines 296-303):
  - if (rec) markDone(swarm, rec)

JS is single-threaded. The idle handler is an async function but markDone is synchronous up through rec.done = true (line 96). The first caller sets rec.done = true synchronously before any await. The second caller (from either idle or timeout) hits `if (rec.done) return` and exits before reportToDispatcher is called.

RESULT: No double-report. rec.done guard is solid because markDone is sync to the guard + flag.

---

## Hunt 2: session.delete called twice on same childID

reportToDispatcher (line 88): client.session.delete({ path: { id: rec.childID } }).catch(() => {})
reportToDispatcher (line 89): swarm.minions.delete(rec.childID)

reportToDispatcher is only called once per rec because markDone's rec.done guard prevents double-call.
RESULT: delete is called at most once. No double-delete hazard.

---

## Hunt 3: Iteration-during-mutation in event handler

Event handler (lines 296-303):
  for (const swarm of swarms.values()) {
    const rec = swarm.minions.get(idleID)
    if (rec) markDone(swarm, rec)
  }

markDone calls reportToDispatcher (line 105) without await (fire-and-forget). reportToDispatcher is async and does swarm.minions.delete (line 89) but that's inside an async function that has already returned to markDone by the time swarm.minions.delete runs (because the first await in reportToDispatcher is client.session.messages on line 60).

The for...of loop over swarms.values() is not iterating swarm.minions - it iterates the outer swarms Map. swarm.minions.delete happens in the microtask queue (inside the async reportToDispatcher), so the for...of loop over swarms.values() completes first. No mutation-during-iteration of the loop structure.

Even if we consider swarm.minions: the loop uses .get(idleID) which is a lookup, not iteration. No hazard.

RESULT: No iteration-mutation hazard.

---

## Hunt 4: Ordering - is the final message committed when session.idle fires?

markDone is called from the idle event (line 301). reportToDispatcher reads messages (line 60) via client.session.messages. The question: does session.idle guarantee the final assistant message is already committed to storage?

This depends on OpenCode's session.idle semantics - cannot be determined from this file alone. If "idle" means "the model turn completed and all messages are persisted", fine. If it means "the model stopped generating tokens" but the write is async, reportToDispatcher could read stale messages.

FINDING: Cannot confirm from code alone. This is a semantic contract with OpenCode's event system. If session.idle fires before the final message write is committed, body will be empty or stale and the dispatcher gets "(no output)" or a truncated last message. This is a real risk worth noting, but it's an OpenCode-internals question, not a bug in this file's logic.

---

## Hunt 5: session.prompt into dispatcher mid-turn

reportToDispatcher (lines 80-85):
  client.session.prompt({ path: { id: swarm.dispatcherID }, ... }).catch(() => {})

If the dispatcher is mid-turn (processing something else), what happens? Cannot determine from this file: the behavior depends entirely on OpenCode's session.prompt queuing semantics when the target session is busy. Options: queued cleanly (safe), rejected (non-fatal here, .catch(() => {})), or interleaved (potentially bad).

FINDING: The .catch(() => {}) means failure is silently swallowed. If OpenCode rejects prompt-while-busy, the minion's report is lost with no retry and no error surfaced anywhere. This is a silent data loss path.

---

## Hunt 6: timedOut flag ordering

Timeout handler (lines 235-240):
  235: rec.timedOut = true      <- SET FIRST
  236: markDone(swarm, rec)     <- THEN markDone runs

markDone (line 98): if (rec.timer) clearTimeout(rec.timer) <- clears timer ref, not timedOut

reportToDispatcher (line 75): const status = rec.timedOut ? "timed out..." : "reporting"

timedOut is set at line 235 BEFORE markDone is called at line 236. markDone does NOT clear timedOut. reportToDispatcher reads timedOut correctly.

RESULT: No ordering bug here. timedOut is guaranteed set before reportToDispatcher reads it.

---

## Summary

- Double-report: clean (rec.done is synchronous guard)
- Double-delete: clean (follows from above)
- Iteration-mutation: clean (mutation is async/deferred, loop structure unaffected)
- timedOut ordering: clean
- session.idle timing: UNRESOLVABLE FROM CODE - external contract
- session.prompt into busy dispatcher: SILENT LOSS PATH - .catch(() => {}) swallows rejection, no retry, report gone
