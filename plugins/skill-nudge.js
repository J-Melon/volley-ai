// Skill-nudge plugin. When the dispatcher sends a message that triggers a
// known skill without having loaded it this turn, inject a reminder.
// Pattern: keyword-match on user messages, check for missing skill load.

const TRIGGERS = [
  { keywords: /\b(dispatch|swarm_dispatch|minion)\b/i, skill: "dispatch" },
  { keywords: /\b(battle|review|reviewers?)\b/i, skill: "battle" },
  { keywords: /\b(save_issue|linear.*issue|ticket)\b/i, skill: "tickets" },
  { keywords: /\b(reconcile|rule.*violated|grep.*surfaces?)\b/i, skill: "reconcile" },
  { keywords: /\b(handoff|letter|session.*close)\b/i, skill: "handoff" },
]

const SKILL_LOADED = /skill\(\s*\{\s*name:\s*"(\w+)"\s*\}\s*\)/g

/** @type {import("@opencode-ai/plugin").Plugin} */
export const SkillNudge = async () => {
  return {
    "chat.message": async (input, output) => {
      const text = (output?.parts ?? [])
        .filter((p) => p.type === "text")
        .map((p) => p.text || "")
        .join("\n")
      if (!text.trim()) return

      // Build known skill map from trigger list
      const needed = new Set()
      for (const t of TRIGGERS) {
        if (t.keywords.test(text)) needed.add(t.skill)
      }
      if (needed.size === 0) return

      // Check which skills were already loaded in the message
      const loaded = new Set()
      let m
      while ((m = SKILL_LOADED.exec(text)) !== null) {
        loaded.add(m[1])
      }
      SKILL_LOADED.lastIndex = 0

      // Find missing skills
      const missing = [...needed].filter((s) => !loaded.has(s))
      if (missing.length === 0) return

      output.parts ??= []
      output.parts.unshift({
        type: "text",
        text: `[skill-nudge: load the ${missing.join(", ")} skill${missing.length > 1 ? "s" : ""} first]`,
      })
    },
  }
}
