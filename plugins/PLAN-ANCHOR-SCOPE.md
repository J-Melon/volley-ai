# Scope: plan-anchor (where-am-I, re-surfaced on return from depth)

Status: SCOPE for review, not built.

## The problem

The dispatcher's (Gru's) real value is JUDGMENT ON DISCOVERY, which can fire at
any point in the work. So the lifecycle (dandori -> dispatch -> build -> battle ->
rebattle -> verdict -> land) must be a MAP the dispatcher navigates, never a TRACK
it is run on. Heavy orchestration that drives the stages automates away the seat
whose whole point is to break the arc when reality demands it (see
feedback_dont_automate_the_agents_judgment).

But there is a real failure: when the dispatcher follows a discovery deep (a
fan-out, a sub-investigation), it loses the thread of the overall work and forgets
where it was.

## What this is (and is NOT)

- IS: a persistent plan-state the dispatcher keeps in the SESSION TODO , the
  canonical "where the work is." dandori writes it; every stage updates it;
  discovery REWRITES it. The dispatcher owns its contents absolutely and may
  change it any moment.
- IS: a re-anchor that re-surfaces that state at ONE precise moment , when the
  dispatcher returns from depth , so going deep cannot make it forget.
- IS NOT: sequencing, gating, or nagging. It never says "do this stage next" or
  "you skipped battle." It never fires on a timer or on idle (that is the Todo
  Enforcer trap , re-surfacing unprompted becomes noise the dispatcher tunes out,
  which defeats "cannot ignore").

## API CONSTRAINT (decided the design): no plugin can write the todo

The OpenCode SDK exposes `session.todo` as READ-ONLY (GET /session/{id}/todo).
There is NO client/plugin method to WRITE the todo , only the agent's own
`todowrite` tool can. So a plugin CANNOT reconcile or maintain the plan-state.

Decision: the plan-anchor is PURE SKILL, no plugin mechanism. This is cleaner and
more aligned with the principle , the structure literally cannot mutate the
dispatcher's plan, so the dispatcher owns it absolutely. "Cannot ignore" is
satisfied by a strong NAMED HABIT in the skills, not external enforcement or any
reprompt (Josh: "i dont need to see the reprompt"). The swarm-dispatch plugin does
NOTHING extra at the batch boundary.

## The un-annoying mechanism: event-placed, not frequency-based (SUPERSEDED)
NOTE: the plugin-driven re-anchor below is NOT built (no todo-write API). Kept for
the reasoning. The realised mechanism is the skill habit in the next section.

"Cannot ignore" is satisfied by PLACEMENT, not frequency. The anchor is silent
while the dispatcher is shallow (it wrote the todo, it can see it). It re-surfaces
ONCE at the boundary where working memory is actually displaced:

TRIGGER: a dispatched MINION BATCH RESOLVES. When swarm_collect / the session.idle
handler sees all (or the last) minions of a fan-out reach done, re-inject the
current plan-state into the dispatcher: "you fanned out <N> (<labels>); here is
where the overall work stands: <todo>." Once, at that boundary. Never otherwise.

Accepted limitation: a NON-swarm deep dive (long solo investigation, no minions)
does not trigger a re-anchor. Trade accepted to keep the trigger precise and quiet;
the dispatcher can always read the todo itself.

## Build shape

- Reuse the swarm-dispatch plugin's batch-tracking. When the LAST in-flight minion
  of a dispatcher's swarm reaches done (markDone empties the active set), fire the
  re-anchor: read the session todo (client.session: /session/{id}/todo) and
  re-inject a brief via session.prompt into the dispatcher (noReply system part, or
  a tui.toast) summarising the resolved batch + the current plan-state.
- The dispatcher reads it and decides what to do , including rewriting the todo if
  the batch's results changed the shape of the work. No action is forced.
- Batch boundary detection: track an "active batch" per dispatcher; re-anchor when
  it drains, not per-minion (one minion finishing of five is not a return-from-depth).

## First-class in the SKILLS, not just the plugin

The plugin makes the anchor unignorable AT THE BOUNDARY; the skills must make the
plan-state THE THING THE DISPATCHER WORKS IN, or the plugin re-surfaces something
the skills never maintained (stale/empty). So the plan-state is first-class across
the lifecycle skills:

- dandori SEEDS it: the implementation-plan walk's output IS the initial session
  todo , the crew, the units, the scope caps, written as the plan-state. dandori
  is "write the plan into the anchor," not a doc that lives elsewhere.
- dispatch READS + UPDATES it: dispatching a minion marks its unit in-progress in
  the plan-state; the codename/agent/label live there.
- build/battle/rebattle UPDATE it: a unit moves through states (dispatched ->
  built -> battling -> verdict) in the anchor. Battle findings that reshape the
  work are written back as plan-state edits, the same act as discovery re-planning.
- The standing rule (a memory node + named in each lifecycle skill): "the session
  todo is the live plan; reconcile it against reality before and after any deep
  move; ON BATCH RESOLVE, before acting on results, reconcile the todo first;
  rewrite it freely when discovery changes the shape." This is the WHOLE of
  "cannot ignore" now , a trained, named habit, since no plugin can write the todo.
  The dispatcher is taught the anchor is load-bearing, not decorative.

Net: structure lives in TWO complementary places , skills (the dispatcher's
trained habit + the map of stages) and plugin (the quiet re-anchor at the return-
from-depth boundary). Neither sequences or gates; together they make the plan-state
impossible to lose without making it annoying.

## Open questions before build

1. Re-inject channel: session.prompt(noReply) into the dispatcher mid/after-turn,
   vs tui.toast.show, vs writing a system part. Which surfaces WITHOUT derailing
   the dispatcher's current turn? (The pr-state-check probe is relevant prior art.)
2. Does mid-turn injection behave, or must it wait for dispatcher idle? (Same open
   question flagged in swarm-dispatch.)
3. "all or the last" minions: define batch-drained precisely (the swarm already
   tracks pending + in-flight; re-anchor when both are empty for that dispatcher).
4. Should the dandori skill be the thing that SEEDS the todo in the agreed shape,
   so the anchor always has a real plan-state to show? (Likely yes , ties dandori
   to the anchor.)
