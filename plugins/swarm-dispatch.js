// Swarm dispatch for OpenCode: parallel, non-blocking subagents that report back
// to the dispatcher when done. Fills the gap left by the native task tool (which
// is sequential and blocking). Design: SWARM-DISPATCH-SCOPE.md.

import { tool } from "@opencode-ai/plugin"
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const z = tool.schema

// Pool is canonical data in codenames.json (authority: feedback_sub_agent_codenames),
// not hardcoded here, so it can't drift.
const CODENAMES = (() => {
  try {
    const here = dirname(fileURLToPath(import.meta.url))
    return Object.values(JSON.parse(readFileSync(join(here, "codenames.json"), "utf8")).pool).flat()
  } catch {
    return ["Dipper", "Zaphod", "Feldspar", "Bender", "Kevin", "Martha"]
  }
})()

const CONCURRENCY_DEFAULT = 5
const MINION_TIMEOUT_MS = 10 * 60 * 1000
const MAX_DEPTH = 3

export const SwarmDispatch = async ({ client, directory, worktree, $ }) => {
  const swarms = new Map()

  function getSwarm(id) {
    let s = swarms.get(id)
    if (!s) {
      s = { dispatcherID: id, minions: new Map(), usedNames: new Set() }
      swarms.set(id, s)
    }
    return s
  }

  // A finished minion wakes the dispatcher with its result, in its own voice. The
  // dispatcher has no sense of time, so completion must arrive, never be polled for.
  async function reportToDispatcher(swarm, rec) {
    let body = ""
    try {
      const res = await client.session.messages({ path: { id: rec.childID } })
      const msgs = res?.data ?? res ?? []
      for (let i = msgs.length - 1; i >= 0; i--) {
        const mm = msgs[i]
        const info = mm.info ?? mm
        if ((info.role ?? info.type) !== "assistant") continue
        body = (mm.parts ?? []).filter((p) => p.type === "text").map((p) => p.text || "").join("\n")
        break
      }
    } catch {
      body = "(could not read my output)"
    }
    const status = rec.timedOut ? "timed out before finishing" : "reporting"
    const text =
      `${rec.codename} (${rec.agent}) ${status} on ${rec.label}:\n\n` +
      (body ? body.slice(0, 1500) : "(no output)")

    // Retry: the dispatcher may be mid-turn and reject the prompt. Swallowing that
    // would silently lose the result. Delete the session only once the report lands.
    let delivered = false
    for (let attempt = 0; attempt < 6; attempt++) {
      try {
        await client.session.prompt({ path: { id: swarm.dispatcherID }, body: { parts: [{ type: "text", text }] } })
        delivered = true
        break
      } catch {
        await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)))
      }
    }

    if (delivered) {
      rec.reported = true
      client.session.delete({ path: { id: rec.childID } }).catch(() => {})
      // Keep isolate records: swarm_cleanup finds their worktree via this map.
      if (!rec.isolate) swarm.minions.delete(rec.childID)
    }
  }

  function markDone(swarm, rec) {
    if (rec.done) return
    rec.done = true
    rec.finishedAt = Date.now()
    if (rec.timer) clearTimeout(rec.timer)
    swarm.usedNames.delete(rec.codename)
    if (swarm.pending && swarm.pending.length && swarm.launch) {
      const next = swarm.pending.shift()
      swarm.launch(next, next.index).catch(() => {})
    }
    reportToDispatcher(swarm, rec)
  }

  function pickCodename(swarm) {
    const free = CODENAMES.find((n) => !swarm.usedNames.has(n))
    if (free) {
      swarm.usedNames.add(free)
      return free
    }
    // No -1/-2 suffix: that collapses two agents into one handle (banned). Names
    // free on completion, so null here means a fan-out wider than the whole pool.
    return null
  }

  async function depthOf(sessionID) {
    let depth = 0
    let cur = sessionID
    for (let i = 0; i < MAX_DEPTH + 2 && cur; i++) {
      try {
        const info = (await client.session.get({ path: { id: cur } }))?.data ?? null
        cur = info?.parentID
        if (cur) depth++
        else break
      } catch {
        break
      }
    }
    return depth
  }

  return {
    tool: {
      swarm_dispatch: tool({
        description:
          "Fan out subagent minions in PARALLEL as child sessions and return " +
          "immediately (non-blocking; you stay reachable while they run). Each " +
          "minion gets a themed codename shown in its session title. Read-only " +
          "minions (reviewers/analysts) run on the main tree; set isolate:true " +
          "for write-capable authors to get a git worktree (NOT for .tscn/scene " +
          "work, GodotIQ is pinned to the main tree). Each minion reports back to " +
          "you automatically when it finishes, in its own voice, no need to poll.",
        args: {
          minions: z
            .array(
              z.object({
                agent: z.string().describe("agent id, e.g. code-quality, gdscript-implementer"),
                task: z.string().describe("the brief for this minion"),
                label: z.string().describe("short task label for the session title, e.g. SH-254"),
                isolate: z.boolean().optional().describe("true = give this WRITER its own git worktree. Never for scene work."),
              })
            )
            .describe("the minions to dispatch in parallel"),
          concurrency: z.number().optional().describe(`max concurrent minions (default ${CONCURRENCY_DEFAULT})`),
        },
        async execute(args, ctx) {
          const dispatcherID = ctx.sessionID

          if ((await depthOf(dispatcherID)) >= MAX_DEPTH) {
            return `Refused: dispatch depth reaches the cap (${MAX_DEPTH}). A minion may not spawn a deep chain of sub-minions.`
          }

          const swarm = getSwarm(dispatcherID)
          const cap = args.concurrency ?? CONCURRENCY_DEFAULT
          const dispatched = []
          const queue = [...args.minions]

          async function launch(m, index) {
            const codename = pickCodename(swarm)
            if (!codename) {
              return {
                label: m.label,
                error:
                  "codename pool exhausted; let some minions finish (they free their names on report) before dispatching more.",
              }
            }
            const title = `${codename} (${m.agent}): ${m.label}`
            let dir = directory
            let worktreePath = null
            let branch = null

            if (m.isolate) {
              const wt = await makeWorktree($, worktree, codename, m.label, m.task)
              if (wt.error) return { codename, label: m.label, error: wt.error }
              dir = wt.path
              worktreePath = wt.path
              branch = wt.branch
            }

            let childID
            try {
              const res = await client.session.create({ body: { parentID: dispatcherID, title }, query: { directory: dir } })
              childID = (res?.data ?? res)?.id
            } catch (e) {
              return { codename, label: m.label, error: `session.create failed: ${e}` }
            }
            if (!childID) return { codename, label: m.label, error: "no child session id returned" }

            // Fire and don't await; the result comes back via reportToDispatcher.
            client.session
              .prompt({ path: { id: childID }, query: { directory: dir }, body: { agent: m.agent, parts: [{ type: "text", text: m.task }] } })
              .catch(() => {})

            const rec = { codename, label: m.label, agent: m.agent, childID, dir, worktreePath, branch, isolate: !!m.isolate, startedAt: Date.now(), done: false }
            swarm.minions.set(childID, rec)

            // A hung child never goes idle, so it would hold its slot forever; abort on timeout.
            rec.timer = setTimeout(() => {
              if (rec.done) return
              client.session.abort({ path: { id: childID } }).catch(() => {})
              rec.timedOut = true
              markDone(swarm, rec)
            }, MINION_TIMEOUT_MS)

            return rec
          }

          const initial = queue.splice(0, cap)
          const results = await Promise.all(initial.map((m, i) => launch(m, i)))
          for (const r of results) {
            dispatched.push(
              r.error
                ? `  ${r.codename ?? "(no name)"} (${r.label}): FAILED to launch, ${r.error}`
                : `  ${r.codename} (${r.agent}) -> ${r.label}` + (r.isolate ? ` [worktree ${r.branch}]` : "")
            )
          }
          // Overflow waits for slots; the idle handler launches it via swarm.launch.
          swarm.pending = queue.map((m, i) => ({ ...m, index: cap + i }))
          swarm.launch = launch

          const queued = swarm.pending.length
          return (
            `Dispatched ${initial.length} minion(s) in parallel (cap ${cap}):\n` +
            dispatched.join("\n") +
            (queued ? `\n  + ${queued} queued, launching as slots free.` : "") +
            `\n\nKeep working; each minion reports back to you when it finishes.`
          )
        },
      }),

      swarm_cleanup: tool({
        description:
          "Remove the git worktrees created for isolate:true minions, after their " +
          "branches are landed or abandoned. Never removes a worktree with " +
          "uncommitted or unmerged work.",
        args: {},
        async execute(_args, ctx) {
          const swarm = swarms.get(ctx.sessionID)
          if (!swarm) return "No swarm state for this session."
          const removed = []
          for (const m of swarm.minions.values()) {
            if (!m.worktreePath) continue
            const r = await removeWorktree($, worktree, m.worktreePath)
            removed.push(`  ${m.codename}: ${r}`)
            if (r.startsWith("removed")) swarm.minions.delete(m.childID)
          }
          return removed.length ? "Worktree cleanup:\n" + removed.join("\n") : "No worktrees to clean."
        },
      }),
    },

    event: async ({ event }) => {
      if (event.type !== "session.idle") return
      const idleID = event.properties.sessionID
      for (const swarm of swarms.values()) {
        const rec = swarm.minions.get(idleID)
        if (rec) markDone(swarm, rec)
      }
    },
  }
}

// Scene work is never isolated: GodotIQ is pinned to the main tree, so a worktree
// write to a scene lands in main anyway. The risk is in the task, not just the label.
function isSceneWork(label, task) {
  return /\.tscn|\.tres|scene|node_ops|build_scene/i.test(`${label}\n${task}`)
}

function safeToken(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
}

async function makeWorktree($, mainTree, codename, label, task) {
  if (isSceneWork(label, task)) {
    return { error: "isolate:true refused for scene work; GodotIQ is bound to the main tree. Run scene minions serial on main." }
  }
  const slug = safeToken(label)
  const name = safeToken(codename) || "minion"
  const path = `${mainTree}/../volley-${name}`
  const branch = `feature/${slug || name}`
  try {
    await $`git -C ${mainTree} worktree add ${path} -b ${branch}`.quiet()
    return { path, branch }
  } catch (e) {
    return { error: `git worktree add failed: ${e}` }
  }
}

async function removeWorktree($, mainTree, path) {
  try {
    // Never destroy unlanded work: refuse on uncommitted changes or unmerged commits.
    const status = await $`git -C ${path} status --porcelain`.quiet().text()
    if (status.trim()) return `SKIPPED ${path}: uncommitted changes present`
    const unmerged = await $`git -C ${path} log --oneline main..HEAD`.quiet().text().catch(() => "")
    if (unmerged.trim()) return `SKIPPED ${path}: branch has unmerged commits (land or abandon it first)`
    await $`git -C ${mainTree} worktree remove ${path}`.quiet()
    return `removed ${path}`
  } catch (e) {
    return `failed: ${e}`
  }
}
