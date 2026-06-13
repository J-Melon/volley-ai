---
name: feedback_render_the_right_tree
metadata: 
  node_type: memory
  parent: feedback_rule_reconciliation
  type: feedback
  originSessionId: fbbcf40e-661f-4d23-879b-7bff45043a80
---

**A render verifies the forest when it runs against the real memory dir, so the boot command stays cwd-independent.** `lint-graph-edges.sh` defaults MEMORY_DIR to the real forest, so the boot command passes a path argument of none and lets that default carry; the render then shows the true corpus from any working directory. The script confirms it has the right dir by checking for the trunk spine, and exits loud ("wrong dir?") when the spine is absent, so the render I read is always the real one. Sibling to [[feedback_show_the_tree_not_prose]]: that one says read the WHOLE render; this one says render the RIGHT tree. Josh, 2026-06-12: I ran `--tree .` from the repo root, took the resulting flat dump for the forest, and added the spine-check so the right tree renders every time ([[2026-06-10-the-wrong-tree]]).
