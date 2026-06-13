// Skill-nudge plugin. Follows pr-state-check pattern.
// Tracks skill() calls across turns; only nudges when stale.

const TRIGGERS = [
  { keywords: /\b(dispatch|swarm_dispatch|minion)\b/i, skill: "dispatch" },
  { keywords: /\b(battle|review|reviewers?)\b/i, skill: "battle" },
  { keywords: /\b(save_issue|linear.*issue|ticket)\b/i, skill: "tickets" },
  { keywords: /\b(reconcile|rule.*violated|grep.*surfaces?)\b/i, skill: "reconcile" },
  { keywords: /\b(handoff|letter|session.*close)\b/i, skill: "handoff" },
]
const STALE_AFTER = 25

/** @type {import("@opencode-ai/plugin").Plugin} */
export const SkillNudge = async ({ client }) => {
  const lastLoaded = new Map()
  const reprompted = new Set()
  const turns = new Map()

  return {
    "tool.execute.before": async (input, output) => {
      const args = output?.args ?? {}
      if (input.tool !== "skill") {
        reprompted.delete(input.sessionID)
        return
      }
      const name = args.name
      if (typeof name === "string") {
        lastLoaded.set(name, turns.get(input.sessionID) || 0)
      }
    },

    event: async ({ event }) => {
      if (event.type !== "session.idle") return
      const sid = event.properties.sessionID
      if (reprompted.has(sid)) return
      const tc = (turns.get(sid) || 0) + 1
      turns.set(sid, tc)

      let text = ""
      try {
        const res = await client.session.messages({ path: { id: sid } })
        const msgs = res?.data ?? res ?? []
        for (let i = msgs.length-1; i >= 0; i--) {
          const m = msgs[i]
          const info = m.info ?? m
          if ((info.role ?? info.type) !== "user") continue
          text = (m.parts ?? []).filter((p) => p.type === "text").map((p) => p.text || "").join("\n")
          break
        }
      } catch { return }

      const needed = new Set()
      for (const t of TRIGGERS) if (t.keywords.test(text)) needed.add(t.skill)
      const missing = [...needed].filter((s) => {
        const lt = lastLoaded.get(s)
        return lt == null || tc-lt > STALE_AFTER
      })
      if (missing.length === 0) return

      reprompted.add(sid)
      try {
        await client.session.prompt({
          path: { id: sid },
          body: { parts: [{ type: "text", text: "skill-nudge: load the " + missing.join(", ") + " skill" + (missing.length > 1 ? "s" : "") + " before proceeding." }] },
        })
      } catch {}
    },
  }
}
