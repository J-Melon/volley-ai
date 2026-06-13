---
name: feedback_index_node_describes_its_children
description: "A structural (sub-root) node is its tree's index: it carries a one-line description: of what it is, and a body that names its current children and points down. When I restructure the branch, I update that body to match the new children, or it becomes a stale surface that lies about its tree."
metadata: 
  node_type: memory
  parent: feedback_rule_reconciliation
  type: feedback
  originSessionId: 750fc386-96f7-4511-a3d3-efe767fb41ba
---

**A structural node indexes its tree, so it gets a one-line `description:` and a body that matches its actual children.** A sub-root (a node I author to hold a branch, like `before` or `dispatch_process`) is not a rule, it is the doorway: it carries a `description:` field saying in one line what the branch is (so the generated crown and descent show a gist, not a clipped first sentence, the same reason the trunks got descriptions), and a body that names its current children and says "descend here for X." This is the golden-tree pattern (`reviewer_output` names its three threads and points to them).

Because the body lists the children, it goes stale the moment I restructure the branch and forget to update it. After recutting `dispatch_process` from actor-based sub-branches to chronological ones, its index body still described the old children until Josh caught it. So restructuring a branch includes rewriting the parent index node's body to match, the same stale-surface discipline as any reconciliation ([[feedback_rule_reconciliation]]): the index must describe the tree as it is now, not as it was. Josh, 2026-06-08: asked whether the topic nodes carried content or were empty, then "a 1 line on what it is".
