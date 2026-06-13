---
name: Never repeat a codename inside one session
parent: feedback_codenames
description: Each agent dispatch gets a fresh unique two-word codename; do not reuse a root with -1/-2 suffixes, do not reuse a codename Josh has already seen this session
type: feedback
originSessionId: 9540bb2a-b9f6-48df-8a1d-63419bcf3e9d
---
Every agent dispatch in a session gets its own unique two-word opaque codename from the DM / Minions lexicon (per `feedback_mission_codenames.md`). Never reuse a codename in the same session, and never paper over a fan-out by suffixing `-1` / `-2` onto a shared root (e.g. "Zaphod-1" and "Zaphod-2"). Each agent is its own minion with its own name.

**Why:** Josh tracks agents in his CLI by codename. Reusing a codename collapses two agents into one in his head, and `-1`/`-2` suffix shortcuts are the same failure dressed up. Established 2026-04-30 after I dispatched two doc reviewers as "Zaphod-1" and "Zaphod-2" on PR #560 and Josh corrected me. (Zaphod itself is fine as a codename — the problem was the suffix-shortcut for fan-out, not the root word.)

**How to apply:**
- Pick a fresh codename per dispatch, even when fanning out reviewers in parallel.
- Never use a `-1` / `-2` (or `Foo A` / `Foo B`) suffix to differentiate two parallel agents. Two agents = two distinct codenames.
- Track this session's used codenames in working memory and avoid them on the next dispatch.
