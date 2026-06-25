---
name: dandori
description: The planning beat before fanning out work. Break the work into units, recon their real surfaces, cap the scope, decide the PR split, then seed the plan into the session todo. Read before dispatching a piece of work.
---

# Dandori, plan before the fan-out

Dandori is the short planning beat that runs before work is dispatched. It is not
a ceremony and not a lifecycle stage; it is the thinking that makes the fan-out
sharp: what the units are, what each touches, where the scope ends, how it lands,
and writing that down as the plan I navigate by.

The substance, not a checklist to march:

- **Break into units.** What are the genuinely separate pieces of work, and which
  agent does each (an implementer, a test author, a reviewer)? Pick the agent by
  the work, not by habit.

- **Recon the real surfaces.** Before committing to a split, send a read-only
  `Explore` to find each unit's actual fix surface (file + function) and map where
  units overlap. Ground the slices in current state, not in what a ticket body
  implies. Two units that share a file are caught here, cheaply, not after they
  collide.

- **Cap the scope.** For anything that could sprawl (an audit, a gate, a doc
  rewrite, a contract change), name where it ends. Broader work is a follow-up,
  not this piece growing.

- **Decide the split.** The fewest PRs such that each is independently shippable
  on trunk (compiles, suite green, no half-wired feature). Default is one branch,
  one PR; split into parallel independent PRs only when a shared contract makes
  units genuinely independent, and cap that. The rule is golden:
  [[feedback_feature_pr_decomposition]].

- **Seed the plan.** On go, write the units into the session todo, one entry each,
  state pending. That todo is the live plan I navigate by, reconcile on every
  return from a fan-out, rewrite freely when discovery reshapes the work
  ([[feedback_todo_is_the_live_plan]]). Dandori is where the plan-state is seeded;
  nothing else seeds it.

Then dispatch ([[dispatch]]). Recon and the split keep the briefs sharp; the cap
keeps the work honest; the seeded todo keeps me oriented once the work is running.

## Large docs

Large docs and multi-file restructures need the same planning beat before any
prose lands. Trigger by feel, not line count: if the table of contents is
non-trivial, or work spans more than one file, or prose runs more than a few
sections.

**Four beats:**

1. **Plan structure with Josh.** Section list, what each holds, what it defers
   to, cross-refs, voice rules. For restructures: end-state map (one line per
   file) plus the order of moves.

2. **Multi-minion author.** Dispatch per section or file slice, each with the
   full structure map, voice rules, scope, and cross-refs.

3. **Multi-minion review.** Five lenses in parallel: voice, vocabulary,
   repetition, trim-verify, cross-ref hygiene. Each reviewer follows
   [[reviewers]].

4. **Synthesis.** Integrate feedback, push corrections, final read against the
   structure plan.

**Discipline:** no file gets touched twice for the same restructure.
Trim-and-verify before push. The plan is the contract; drift is an explicit
revision, not a quiet rewrite. A one-paragraph fix to a large doc skips the
full beat.
