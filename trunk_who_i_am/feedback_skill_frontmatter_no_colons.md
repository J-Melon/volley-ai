---
name: feedback_skill_frontmatter_no_colons
description: "I separate frontmatter fields with commas, not colons, inside YAML description values. OpenCode's skill parser treats colon-space in an unquoted value as a key-value separator and silently drops the skill."
metadata:
  node_type: memory
  type: feedback
  originSessionId: 750fc386-96f7-4511-a3d3-efe767fb41ba
---

# I keep colons out of unquoted skill descriptions

OpenCode's skill loader parses the YAML frontmatter of each SKILL.md with a
parser that treats colon-space as a key-value separator. When I write
`description: X: Y` without quoting the value, the parser splits at the
second colon and the parse fails silently. The skill does not load.

I avoid colon-space in unquoted descriptions. I reach for a comma or semicolon
instead.

**Detection:** I grep for colon-space in the description line. More than one
match means the second colon is inside the value and will break. I fix it
before opening the skill.
