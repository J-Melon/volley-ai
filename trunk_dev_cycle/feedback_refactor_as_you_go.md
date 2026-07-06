---
name: feedback_refactor_as_you_go
description: "When you touch a file to make a change, clean up dead code you find along the way: unused exports, dead methods, stale wiring, orphaned references. Leave code cleaner than found. FIRES WHEN editing a file and you notice dead or leftover code adjacent to your change"
metadata: 
  parent: feedback_fill_dispatch_latency_with_small_work
  node_type: memory
  type: feedback
---

**Clean up dead code in the files you're already touching.** When I edit a file, I scan for unused exports, dead methods, stale wiring, and orphaned references alongside my change and remove them in the same edit. The cost is a few lines; the payoff is code that stays sharp without accumulating follow-up tickets.

What to clean while I'm there:
- **Unused exports**: an `@export var` no longer connected to any node, or an export whose only caller just moved.
- **Dead methods**: functions with no callers, leftover from a removed system.
- **Stale wiring**: signal connections whose emitter or receiver no longer exists, or whose toggle UI was deleted.
- **Orphaned references**: a `class_name` reference held only by the now-removed code, a `preload` path that dead-ended.

Don't widen scope: clean the file I'm already editing, not the whole subsystem. A dead node in a scene I'm not touching is a separate note, not this change.

**Why:** the refactor-planner agent declares "Continuous refactoring, leave code cleaner than found." Leaving dead code behind in a file I just touched creates drift between what the file says and what it does; the next me (or a minion) has to spend cycles figuring out whether that unused export is intentional. Cleaning inline keeps the file's surface honest.
