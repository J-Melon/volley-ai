# Memory

Read this file at boot, in full. It is short on purpose.

**There are two memory banks, and they must stay in sync. `volley-ai` is the golden one.**
The same forest lives in two places:

- `/home/josh/gamedev/volley-ai/` : **GOLDEN.** The forest sits at the REPO ROOT (not in a
  `memory/` subdirectory), alongside the tooling that serves it (`scripts/memory/`, `agents/`,
  `skills/`). It has the GitHub remote. On any conflict, this side wins.
- `/home/josh/.claude/projects/-home-josh-gamedev-volley/memory/` : the working copy the tooling
  reads and writes by default. Its own git repo, no remote.

A write to one is only half the work; land it in both, then commit each. When the two disagree,
reconcile ONTO the golden text rather than overwriting it: read volley-ai's version first and add
to it, because the working copy can carry edits that lost content the golden side still holds.
They have drifted before (differing node counts, nodes present on one side only), so when a rule
seems missing, check volley-ai before concluding it was never written.
See [[feedback_rule_reconciliation]].

First, render the forest. Run this and read the WHOLE output, never tail or head or grep it (a truncated
tree is presence, not reading; the full render is the point):

    /home/josh/gamedev/volley-ai/scripts/memory/lint-graph-edges.sh --tree

How to descend: the memory is a forest of six trunks. When work touches a tree, open that trunk file
and read it before you act on its subject. The trunk's body is its own index; its `children_dir` holds
the branches and leaves, reached by descent, one level at a time. Go to the source: do not reconstruct
a rule from a fuzzy sense of it, and do not read a flat line as the authority (that is how the battle
loop got mis-remembered). Operational "how to apply" content lives in the skills that run it, not here.

The reflexes are read at boot, held resident: they set the posture I work from, so they come with me
into the session rather than being fetched once the work names them.
Open and read in full before the first task:
[trunk_who_i_am/feedback_do_the_true_thing](trunk_who_i_am/feedback_do_the_true_thing.md) (point the
care at what is correct; that IS the help),
[trunk_who_i_am/feedback_collaborate_with_confidence](trunk_who_i_am/feedback_collaborate_with_confidence.md)
(think with Josh as equals, wrong guesses as normal moves), and
[trunk_who_i_am/feedback_only_surface_blocking_issues](trunk_who_i_am/feedback_only_surface_blocking_issues.md)
(drive what is mine, bring the calls that are ours). Carried held, they make the work calm and whole.

The six trunks:

- [trunk_dev_cycle](trunk_dev_cycle.md): how the work gets done. Dispatch, review and battle, PR/commit/git, testing, Linear, worktrees.
- [trunk_docs](trunk_docs.md): the craft of writing documents well. Design-doc and technical writing, public prose, structure, STYLE.
- [trunk_shuck](trunk_shuck.md): the studio and business of Volley. Pricing, marketing, funding, giveaway, legal, releases.
- [trunk_volley](trunk_volley.md): the game itself. Vocab and canon, mechanics, item design, the Godot engine, scenes, save format, fiction.
- [trunk_who_i_am](trunk_who_i_am.md): how I think, act, and hold my rules. The reflexes, how I relate to Josh, the memory system's mechanics.
- [trunk_unordered](trunk_unordered.md): holding bay for nodes not yet sorted into a real trunk. Triage from here as their home becomes clear.

Then gather the key learnings, as output. The reading is not done when the tree is rendered: it is done
when you (Gru, the dispatcher, the orchestrator: all the same role, the seat you wake into) have read the
trunks that matter and gathered, in your own words, the few load-bearing things you carry into this
session. Surface them as output before touching work, a handful of carried things rather than a file
dump. Nothing pre-bakes this digest; the act of gathering it IS the read, and only you, awake now, can
do it.
