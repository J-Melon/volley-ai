---
name: feedback_editor_restages_stale_buffers
description: "The open Godot editor re-saves its in-memory buffers over files changed underneath it. Distinguish TWO cases: code/logic re-saves can be a BACKWARDS-revert of a just-committed fix (discard those); but for resource IDs/UIDs the EDITOR is source of truth (keep those, do not git restore them back to disk). Before any commit on an editor-open branch, check git status/diff and classify each stray change before reverting."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9411911b-5a8f-49cf-b403-486f789e4da3
---

When the Godot editor is open on a branch and files are changed on disk underneath it (by a commit, an agent, or a tool), the editor can re-save its in-memory copies back over them. Classify each stray change before acting; do not reflexively `git restore` all of them.

**Two cases, opposite resolutions:**
- **Code / logic re-save = suspect a backwards-revert; HEAD wins.** Seen 2026-06-01 on PR #803: a full BACKWARDS-REVERT of the soul-multiplier fix staged on the working tree (the tier-0 skip reappeared after the fix commit). If committed blindly it would have reverted the fix. Here the committed HEAD is source of truth; discard the restage.
- **Resource IDs / UIDs (`.tres`/`.tscn` `uid=`, `load_steps`) = the EDITOR is source of truth; keep its write.** The editor owns and regenerates resource UIDs against its live state; the on-disk version is the stale side (unless the buffer itself is genuinely stale, which is rare). 2026-06-01 I WRONGLY `git restore`d an editor UID re-save of `speed_tier_table.tres` back to the old committed UID, reading it as a stray revert. Correct move: let the editor re-save (`ResourceSaver.save` in editor context, then `EditorInterface.get_resource_filesystem().scan()`), verify nothing references the old UID (loaded-by-path is safe), and KEEP the new UID.

**How to apply:**
- Before any commit on an editor-open branch, `git status --short` + `git diff` (and `git diff --cached`). For each stray change ask: does it undo logic I just wrote (revert -> discard, HEAD wins), or is it a UID/`load_steps`/resource-id reconciliation (keep -> editor wins)?
- `git show HEAD:<file>` to confirm what actually shipped when checking a logic revert.
- A reviewer/agent reading the working tree during such a window gets a STALE read and may block on code that is not what is committed (Frick blocked PR #803 on a tier-0 early-return that only existed in the transiently-staged revert, not in HEAD). When a block contradicts a green suite you just ran, suspect a stale-tree read: confirm against HEAD and re-review on HEAD, do not "fix" code that is already correct.
- Discard a confirmed code revert with `git restore --staged <files> && git restore <files>`. Do NOT do this to a UID re-save.
- **This is routine to handle, not a blocker to escalate.** The editor being open is the normal state of Josh's machine, not something he is doing wrong; discard the stray revert and move on, brief agents to do the same. Do NOT raise it to Josh as a hazard or ask him to close the editor unless it actually stops the work (a restage that keeps reappearing and blocks a commit). Josh, 2026-06-03: "i haven't touched it, just ignore unless it becomes a block." Pairs with [[feedback_only_surface_blocking_issues]].
- This is the same family as [[feedback_test_on_main_tree_not_worktree]] (the editor-on-the-tree cost) and why [[project_court_scene_is_live_gameplay_ui]] reformats kept reappearing.
