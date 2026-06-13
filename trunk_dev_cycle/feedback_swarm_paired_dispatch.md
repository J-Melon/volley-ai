---
name: Swarm pairs specialists whose work must land together
parent: feedback_what_to_delegate
description: when a repo policy (pre-commit hook, required review, docs-with-code gate) forces two agents' outputs into the same commit or challenge, dispatch them as a pair instead of independently; lose the parallelism for that pair, keep it for everyone else
type: feedback
originSessionId: 608651d3-3b61-4b71-9a83-894f4e86b346
---
Some specialists have to ship together. Failing-first tests cannot land as a standalone commit because the pre-commit hook runs GUT and blocks red tests; test-author and implementer therefore have to produce one commit between them. The general pattern is: when a repo policy couples two outputs, the swarm couples the specialists.

**Paired dispatch shapes:**

1. **Single dual-role agent.** One prompt briefed with both responsibilities: "write the failing tests, then the implementation, commit once when green." Simplest, loses the parallelism between the two roles. Use when the two roles share most of their context anyway (test-author and implementer both read the same code + plan).

2. **Shared worktree handoff.** Dispatch two agents with a pair id; first agent writes its half to the worktree and posts `status: ready_to_pair` to an inbox; the organiser reads that signal and dispatches the second agent into the same worktree. They commit as one unit at the end. Preserves role specialisation at the cost of an extra dispatch hop.

Known pair triggers in this repo:
- **Failing-first tests and implementation.** GUT runs in lefthook pre-commit; red tests block commits. Test-author pairs with implementer.
- Any future "docs-with-code" gate would pair docs-tender with the implementer.
- Integration-scenario-author may pair with implementer on the same worktree when the integration test is as load-bearing as unit tests for the same commit.

When **not** to pair:
- Research outputs inform implementation but do not ship alongside it. Researcher, design-doc-reader, refactor-planner write to the scratchpad and the implementer reads them. No pairing.
- Devils-advocate reviews the plan, not the commit. No pairing.
- Reviewer agents run on the challenge diff after the commit; their verdict is separate. No pairing.

**Why:** Flagged 2026-04-21 after SH-96 test dispatch hit the pre-commit policy and tests couldn't ship as a standalone commit. The swarm's "each agent commits its own work" rule stands, but "own work" may be one half of a paired deliverable rather than a standalone artefact.

**How to apply:**
- When dispatching a pair, brief both prompts with the pair id and the shared worktree path.
- One of the two handles the final commit; the other signals `status: ready_to_pair` in inbox and stops.
- Update `ai/swarm/README.md` when the scheme changes so the public surface matches.

**Default pair on every code dispatch.** Reaffirmed 2026-04-27 after PR #506 / SH-288: I dispatched impl solo (with tests folded into the impl brief) for every wave, and Maggie blocked three times on coverage gaps. Net rounds went up, not down. Lefthook running ggut on commit IS the gate the pairing rule names; that gate fires on every code commit, not edge cases. So: pair every code dispatch by default. Solo only when explicitly justified ("test-only refactor," "doc-only fix"). Flag the deviation when going solo.

**Three pair shapes by issue type.** Refined same day after the "blind handoff is the default" framing turned out to be too broad. Cognitive separation matters but the right shape depends on what the AC actually says.

- **User stories** (player-observable AC): blind test-author handoff. Test-author dispatched first, briefed only on the AC and observable behaviour, writes failing tests, posts ready signal, exits without committing. Impl dispatched second into same worktree, makes tests pass, commits.
- **System stories** (refactor / infrastructure, AC references impl shape): solo impl + adversarial test-coverage reviewer. The blind premise breaks when the AC IS the impl (e.g. "no synthetic-key path in BallReconciler"); reviewer's stub-replacement tautology check provides the separation instead.
- **Bugs** (steps-to-reproduce define the failing case): test-from-repro + impl in one agent. Failing test reproduces the observed bug, impl fixes. Bias risk is low because Josh observed the case, not the agent.
- **Solo** (no pair): doc-only fix, test-only refactor, scene-only restructure. Flag the deviation.

Common discipline across all three: reviewer runs the tautology check (stub production code to return the test's expected value verbatim; if tests still pass, they were fudged).
