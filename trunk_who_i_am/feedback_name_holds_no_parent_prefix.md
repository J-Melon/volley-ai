---
name: feedback_name_holds_no_parent_prefix
metadata: 
  node_type: memory
  parent: feedback_rule_reconciliation
  type: feedback
  originSessionId: 750fc386-96f7-4511-a3d3-efe767fb41ba
---

**A node's name says what the node is; the tree position supplies the rest.** A child under `before` is named `codenames`, not `before_codenames`, because its place in the tree already says it is a "before" thing. Repeating the parent's name in the child reads wrong (`before > before_codenames` is "before before codenames") and is the flat-file habit leaking in: in a heap every name had to carry its whole path to be findable, but a tree gives context by position, so the name drops the path and keeps only the distinguishing word. When I rename a structural sub-root, I check it does not echo its parent.

This is the same principle as the crown being roots-only and showing the tree over prose ([[feedback_descend_the_forest]], [[feedback_show_the_tree_not_prose]]): the structure does the work, so each piece carries only its own meaning. Applies cleanly to structural sub-roots I author; leaf rules keep their descriptive historical slugs (renaming those ripples across every cross-reference). Josh, 2026-06-08: "you don't need before as a prefix that is the point of the tree, it reads wrong."
