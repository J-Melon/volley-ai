---
name: feedback_show_the_tree_not_prose
metadata: 
  node_type: memory
  parent: feedback_rule_reconciliation
  type: feedback
  originSessionId: 750fc386-96f7-4511-a3d3-efe767fb41ba
---

**When shaping or proposing structure, render the tree; do not describe it in prose.** The tree is the artifact Josh reviews, so I give him the `lint-graph-edges.sh --tree` output (the relevant branch) and let him read the shape directly. A bulleted prose proposal ("a root with sub-clusters A, B, C, each holding...") makes him parse my argument back into a shape in his head, which is work I am offloading onto him. Build the structure, render it, show it; iterate on the rendered tree, not on a description of one.

This is the same lesson as "tree it first" (build the shape before debating it) and as the crown being roots-only: the structure is meant to be SEEN, and a render shows it where prose hides it. After any edge change, the render also IS the verification ([[feedback_descend_the_forest]]) that the node landed where I meant. Josh, 2026-06-08: "when your doing this give me the new tree so i don't have to parse this", after I kept proposing recuts of the dispatch branch in prose bullets instead of showing the resulting tree.

**Never tail, head, or grep the tree; read the WHOLE render.** The full output is the point. A truncated tree is the prose-summary failure wearing a render's clothes: presence, not reading, the same skim that let the battle loop get mis-remembered off flat lines. MEMORY.md opens by running `lint-graph-edges.sh --tree` for exactly this reason, so the boot read is a full render, not a glance. Josh, 2026-06-11: "NEVER tail the tree, the point is the full output", after I head/grepped it repeatedly chasing the battle node.
