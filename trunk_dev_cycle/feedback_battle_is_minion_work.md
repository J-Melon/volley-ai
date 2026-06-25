---
metadata:
  node_type: memory
name: Battle is minion work; dispatch the matching specialist
description: "A battle is a verification pass after a challenge ships, and it is what the swarm exists for: dispatch the matching minion (devils-advocate for design, runtime-verifier for gameplay, code-quality for code, root-cause-analyst for tracing). The parent thread dispatches and judges; reaching for grep/Read myself is the tell to stop and dispatch."
parent: feedback_battle_nature
type: feedback
originSessionId: 94cc4c04-cdf0-42ec-8706-e2ea78278a1f
---
metadata:
A Battle is the verification pass for a PR: spec sanity, AC↔evidence, runtime behaviour, code quality. Volley's swarm has minions for each shape: `devils-advocate` for design stress-tests, `runtime-verifier` for runtime/in-editor checks, `code-quality` for code reviews, `root-cause-analyst` for tracing actual execution paths.

The default is to dispatch the right minion in the background, not to start grep'ing through the codebase from the parent thread.

**Why:** Josh caught me starting to grep `scripts/items/ball.gd` from the parent thread to verify the SH-309 spec held against the codebase, after asking "remember the whole minion swarm thing we have going?". The Battle work is what the swarm exists for; doing it from the parent burns context I should be using to dispatch and judge, and skips the minion's specialised tooling (godotiq runtime, devils-advocate framing, etc.).

**How to apply:**

- When a PR opens and a Battle is needed: pick the matching minion. Spec/design PR → `devils-advocate`. Runtime/gameplay PR → `runtime-verifier`. Code-quality concern → `code-quality`. Bug or unexplained behaviour → `root-cause-analyst`.
- Dispatch in background (per `feedback_agents_default_background`) with a tight, codename-prefixed brief that names the artefact (PR number, branch, file paths) and the questions to interrogate.
- Tell the minion to post its findings to the PR directly (one Review per agent, per `feedback_one_review_per_agent`), or return text if it cannot.
- The parent thread waits, then reads the verdict and acts. The parent does not duplicate the minion's reads.

If I find myself running `grep` or `Read` to verify a spec, that is the moment to stop and dispatch.
