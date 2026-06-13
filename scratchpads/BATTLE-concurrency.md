# BATTLE-concurrency raw notes — swarm-dispatch.js

Reviewer lens: concurrency and correctness.

---

## 1. MINION_TIMEOUT_MS — dead constant (CONFIRMED BUG)

Line 35 defines `MINION_TIMEOUT_MS = 10 * 60 * 1000`.
Grep the file: the constant is never read after that line. No `setTimeout`,
no `session.abort`, no reference. The SCOPE doc (line 119) says:
"Per-minion timeout: if a child exceeds T seconds, session.abort it and mark failed."
That is unimplemented. The constant is dead. A hung minion runs forever.

---

## 2. swarm_collect poll window < MINION_TIMEOUT_MS (CONFIRMED MISMATCH)

Lines 220-223: poll 240 iterations x 2 s = 480 s = 8 min.
MINION_TIMEOUT_MS = 10 min (600 s).
But MINION_TIMEOUT_MS is never enforced (bug 1), so a hung minion just
runs forever — and swarm_collect(wait:true) gives up after 8 min and
returns with those minions still marked `running`. Caller gets a partial
result with no error signal. Not a crash, but silently wrong.

---

## 3. inFlight is tracked but never decremented or checked (dead variable)

Lines 119, 182: `inFlight` is incremented for every launched minion
(including failed ones — the error branch still does `inFlight++` at line 182-184).
It is never decremented anywhere — not in the idle handler, not in launch.
It is never used as a gate (the concurrency cap is enforced by splicing
`queue` at line 179, not by reading `inFlight`).
Result: `inFlight` is purely dead bookkeeping that counts wrong
(it counts failed launches as in-flight). Not a safety bug on its own,
but if any future code tries to use it as a real counter, it will be wrong.

---

## 4. Race in idle handler: queued minion can launch with a stale index

Lines 193, 291:
`swarm.pending` entries are stored with `index: cap + i` (0-based within overflow).
`launch(next, next.index)` passes that index to `pickCodename(swarm, role, index)`.
`pickCodename` uses `index` only as a fallback suffix when the pool is exhausted
(line 58: `return \`${role}-${index + 1}\``).
When pool IS exhausted and multiple minions overflow, the fallback names are
`role-6`, `role-7`, etc. — unique because indices are assigned at dispatch time,
not at launch time. So no collision here. The index is stale (it no longer
reflects actual concurrent count), but since it's only used for the fallback
label, this is cosmetic.

---

## 5. TOCTOU on swarm.pending between simultaneous idle events

JS runs on a single-threaded event loop, so two `session.idle` events
cannot interleave mid-execution of the handler. `swarm.pending.shift()` at
line 291 is safe — no concurrent mutation is possible in Node/Bun.
No race here.

---

## 6. Two minions finishing near-simultaneously — double-launch?

Same argument as #5. Each idle event fires the handler to completion before
the next one runs. Each handler does one `shift()`. Two simultaneous idle
events => two sequential handler calls => two distinct `next` values popped.
No double-launch, no skipped launch.

---

## 7. Codename leak: hung minion holds name forever

Because MINION_TIMEOUT_MS is not enforced (bug 1), a hung child never fires
`session.idle`, so `swarm.usedNames.delete(rec.codename)` at line 289 is
never called. The codename is held forever (for this plugin instance's
lifetime). With 32 names in the pool, a dispatch of 32+ minions some of
which hang can exhaust the pool and force fallback names on all subsequent
dispatches. Leak, not a crash.

---

## 8. swarm.pending / swarm.launch set even for empty overflow?

Line 193: `swarm.pending = queue.map(...)`. If all minions fit under cap,
`queue` is empty after `splice(0, cap)` at line 179, so `swarm.pending = []`
— an empty array, not undefined. Line 290 checks `swarm.pending.length` before
shifting, so no undefined-access. Safe.

Line 194: `swarm.launch = launch` — the closure is always assigned.
No undefined-access path. Safe.

---

## 9. depthOf: off-by-one check

Lines 62-77: depth starts at 0. Loop walks parent chain. `depth` is
incremented when `cur` (the current node's parentID) is non-null. So for a
root session (no parent), depth = 0. For a child session, depth = 1.
Line 112: `if (depth >= MAX_DEPTH)` with MAX_DEPTH = 3 refuses at depth 3.
So depths 0, 1, 2 are allowed. A root (0) can dispatch; its child (1) can
dispatch; its grandchild (2) can dispatch; great-grandchild (3) is refused.
That matches "refuse past depth 3." Correct.

---

## 10. pickCodename collision: freed then reused?

`usedNames.delete` on idle, then a new minion launched from pending picks the
freed name. That is the INTENDED behavior — codename reuse is fine once the
prior holder is done. No collision possible because deletion happens before
launch of the next minion (same synchronous handler body, lines 289-293).

---

## Summary of findings

| # | Severity | Description |
|---|----------|-------------|
| 1 | HIGH | MINION_TIMEOUT_MS defined but never enforced — hung minions run forever |
| 2 | MEDIUM | swarm_collect(wait:true) times out at 8 min; returns silently partial if any minion exceeds that |
| 3 | LOW | inFlight incremented but never decremented or read — dead and wrong |
| 4 | COSMETIC | stale index in pending overflow fallback label only |
| 5-6 | OK | No race in idle handler (single-threaded) |
| 7 | LOW | Codename leak for hung minions (pool exhaustion risk only) |
| 8 | OK | swarm.pending/swarm.launch always set |
| 9 | OK | depthOf off-by-one checked: correct |
| 10 | OK | Codename reuse safe |
