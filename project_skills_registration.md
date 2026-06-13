---
name: project-skills-registration
description: ai/skills/** docs are being registered as real Claude Code skills under .claude/skills/<name>/SKILL.md; how access is scoped per agent
metadata: 
  node_type: memory
  type: project
  originSessionId: d1325475-fd0f-4d73-9889-41c0b0763a41
---

The `ai/skills/**` docs already carry valid skill frontmatter (`name` + `description`) but were never registered because they sat outside `.claude/skills/`. As of 2026-05-30 they move to `.claude/skills/<name>/SKILL.md` (flat namespace, 16 skills, names already unique) so the harness auto-discovers them.

**Access model decided:** preload + soft self-select. Each agent preloads its role's skills via the `skills:` frontmatter field (deterministic, replaces the old "Read ai/skills/x.md" lines). There is NO per-agent skill allowlist in Claude Code: `Skill` is one undifferentiated tool, so any agent that can invoke skills can reach the whole registry. Off-role skills are kept from firing by description scoping, not by hard walls. Hard-block (omit `Skill` from `tools:`) only where a wrong fire would be harmful.

**Key mechanics (from official docs, code.claude.com/docs/en/skills.md plus sub-agents.md):**
- Subagents auto-discover project skills and can invoke them WITHOUT `Skill` in `tools:`.
- `skills:` frontmatter on an agent PRELOADS skill bodies at startup (additive, not restrictive).
- `.claude/skills` was gitignored, so this required adding `!.claude/skills/` to `.gitignore`.
- `sync-wiki.yml` only mirrors `designs/**`, so skills were NEVER on the wiki; moving them breaks no wiki pages. Only repo cross-links need fixing.

Related: [[feedback_claude_agents_edit_gated]] (agent files are an authority gate: draft the diff, Josh applies; do not route around with sed), [[feedback_agents_default_background]].
