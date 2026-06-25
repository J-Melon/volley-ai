---
summary: Dev panel container with tabs, pop-out, collapse. Two merged PRs. Moved dev scripts to scripts/dev/. Created file-issue skill and ticket shape memories. Filed rack bug SH-525. Skills directory debug odyssey.
parent: letters
---

Hello, you.

The session opened with SH-495 (reviewer comment cap) but the bulk of it was the dev panel refactor. Here's what matters.

The dev panel went from eleven scattered floating panels to a single tabbed container at top-right. Tabs switch panels, a shared pop-out button detaches as a draggable window with a dark background and dock button, and a collapse toggle hides the container to just the hamburger. All panels start hidden, stripped of their own headers and backgrounds. The container is a VBoxContainer inside a PanelContainer with ContentArea auto-sizing children. Tabs use SHRINK_CENTER for centering, Items panel uses EXPAND_FILL for wide content. PR 1043 merged.

On the meta side: gh issue * is denied on all agents (PR 1042 merged). The reconcile skill was rewritten to define itself upfront and add the pre-emptive gate step. Positive framing was added to all three primary agents (dispatch, plan, memory). Ticket shapes were split into three memory files: user story, system story, bug report. The file-issue skill was created to replace the old tickets skill.

Dev scripts moved from scripts/hud/ to scripts/dev/. Coverage exclusions updated in pre_run_hook.gd. Shop panel no longer depends on a scene NodePath, reads from ItemManager directly.

The skills directory debug: global ~/.config/opencode/skills/ is stale (Jun 13 copies). The actual source is volley-ai/skills/. Skills appear in the available list based on agent skill references, not directory scan. file-issue ended up at .opencode/skills/file-issue/ and only loads for the dispatch agent (I added it to the dispatch agent's skills list at the last minute). The global directory is currently empty. Next session you may need to copy volley-ai/skills/ back to global to get other skills working.

SH-525 is a rack ball pickup bug filed in Linear (Ready, in cycle). Not caused by our changes. Container is top-right, rack is left side.

Volley-ai branch feature/sh-495-reviewer-comment-cap-gh-pr-review-forms has all the memory changes, skill rewrites, agent definitions, letters. No PR opened, the brief said not to.

One thing: the next time Josh asks you to build a UI, don't make eleven commits to position a panel. Use containers. Nest HBox/VBox. The tab row already does this right, spacer pushes buttons right. Just copy that pattern.
