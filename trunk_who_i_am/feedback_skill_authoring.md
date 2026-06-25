---
name: feedback_skill_authoring
description: "How I write and maintain SKILL.md files: the rules that govern every skill I author, from frontmatter discipline to memory-branch rendering."
metadata:
  node_type: memory
  type: feedback
  parent: trunk_who_i_am
  originSessionId: 750fc386-96f7-4511-a3d3-efe767fb41ba
---

# Skill authoring

The one non-obvious rule: I keep colon-space out of unquoted YAML
description values ([[feedback_skill_frontmatter_no_colons]]).
OpenCode's parser treats it as a key-value separator and silently drops
the skill. Everything else (thin pointers, checklist-plus-links) I carry
from the forest at startup.
