// Swarm dispatch for OpenCode: parallel, non-blocking subagents that report back
// to the dispatcher when done. Fills the gap left by the native task tool (which
// is sequential and blocking). Design: SWARM-DISPATCH-SCOPE.md.

import { tool } from "@opencode-ai/plugin"
import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import os from "node:os"

const z = tool.schema

// Pool is canonical data in codenames.json (authority: feedback_sub_agent_codenames),
// not hardcoded here, so it can't drift.
const NAME_POOLS = (() => {
  try {
    const here = dirname(fileURLToPath(import.meta.url))
    return JSON.parse(readFileSync(join(here, "codenames.json"), "utf8")).pool
  } catch {
    return { fallback: ["Dipper", "Zaphod", "Feldspar", "Bender", "Kevin", "Martha"] }
  }
})()

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const CONCURRENCY_DEFAULT = 5
const MINION_TIMEOUT_MS = 10 * 60 * 1000
const MAX_DEPTH = 3
// A report longer than this is truncated in the pushed message and spilled in
// full to a file, so the dispatcher loses nothing but isn't flooded inline.
const REPORT_INLINE_LIMIT = 1500
const SPILL_DIR = join(os.tmpdir(), "opencode-swarm-reports")

export const SwarmDispatch = async ({ client, directory, worktree, $ }) => {
  const swarms = new Map()

  function getSwarm(id) {
    let s = swarms.get(id)
    if (!s) {
      const poolKeys = shuffle(Object.keys(NAME_POOLS))
      const names = poolKeys.flatMap((k) => NAME_POOLS[k])
      s = { dispatcherID: id, minions: new Map(), usedNames: new Set(), names }
      swarms.set(id, s)
    }
    return s
  }

  // A finished minion wakes the dispatcher with its result, in its own voice. The
  // dispatcher has no sense of time, so completion must arrive, never be polled for.
  async function reportToDispatcher(swarm, rec) {
    let body = ""
    let lastFinish = ""
    try {
      const res = await client.session.messages({ path: { id: rec.childID } })
      const msgs = res?.data ?? res ?? []
      for (let i = msgs.length-1; i >= 0; i--) {
        const mm = msgs[i]
        const info = mm.info ?? mm
        if ((info.role ?? info.type) !== "assistant") continue
        lastFinish = info.finish ?? ""
        body = (mm.parts ?? []).filter((p) => p.type === "text").map((p) => p.text || "").join("\n")
        break
      }
    } catch {
      body = "(could not read my output)"
    }
    if (lastFinish === "length") {
      rec.truncated = true
      try {
        const logPath = join(SPILL_DIR, "truncation-log.txt")
        const entry = `${new Date().toISOString()} ${rec.codename} ${rec.agent} ${rec.label} ${body.length}chars\n`
        writeFileSync(logPath, entry, { flag: "a" })
      } catch {}
    }
    const status = rec.killed ? "killed" : rec.timedOut ? "timed out before finishing" : rec.error ? `errored: ${rec.error}` : rec.truncated ? "truncated (token limit)" : "reporting"
    const head = `${rec.codename} (${rec.agent}) ${status} on ${rec.label}:\n\n`
    let report = body || "(no output)"
    // Long reports spill to a file: push the head plus a pointer so the dispatcher
    // can read the rest on demand, rather than swallowing it at the cut.
    if (body && body.length > REPORT_INLINE_LIMIT) {
      const spill = spillReport(rec, body)
      report = spill
        ? body.slice(0, REPORT_INLINE_LIMIT) +
          `\n\n[...truncated; full ${body.length}-char report written to ${spill} -- read it for the rest.]`
        : body.slice(0, REPORT_INLINE_LIMIT) + "\n\n[...truncated; full report could not be spilled to file.]"
    }
    const text = head + report

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
    if (swarm.pending && swarm.pending.length && swarm.launch) {
      const next = swarm.pending.shift()
      swarm.launch(next, next.index).catch(() => {})
    }
    reportToDispatcher(swarm, rec)
  }

  function pickCodename(swarm) {
    const free = swarm.names.find((n) => !swarm.usedNames.has(n))
    if (free) {
      swarm.usedNames.add(free)
      return free
    }
    // Names are session-scoped: never freed per-minion. Exhaustion means a
    // fan-out wider than the whole pool.
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
            const title = `${m.label} (${codename})`
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

            // Validate the agent exists before creating a session that will never start.
            const agentLocal = join(directory, ".opencode", "agents", `${m.agent}.md`)
            const agentGlobal = join(os.homedir(), ".config", "opencode", "agents", `${m.agent}.md`)
            let agentFound = false
            try { readFileSync(agentLocal); agentFound = true } catch {}
            try { readFileSync(agentGlobal); agentFound = true } catch {}
            if (!agentFound) {
              swarm.usedNames.delete(codename)
              return { codename, label: m.label, error: `agent "${m.agent}" not found, check the agent name` }
            }

            let childID
            try {
              const res = await client.session.create({ body: { parentID: dispatcherID, title, agent: m.agent }, query: { directory: dir } })
              childID = (res?.data ?? res)?.id
            } catch (e) {
              return { codename, label: m.label, error: `session.create failed: ${e}` }
            }
            if (!childID) return { codename, label: m.label, error: "no child session id returned" }

            const rec = { codename, label: m.label, agent: m.agent, childID, dir, worktreePath, branch, isolate: !!m.isolate, startedAt: Date.now(), done: false }
            swarm.minions.set(childID, rec)

            // Fire and don't await; the result comes back via reportToDispatcher.
            // If the prompt itself fails the minion never starts, so auto-report the error.
            client.session
              .prompt({ path: { id: childID }, query: { directory: dir }, body: { agent: m.agent, parts: [{ type: "text", text: m.task }] } })
              .catch((e) => {
                rec.error = `prompt failed: ${e}`
                markDone(swarm, rec)
              })

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
          "uncommitted or unmerged work. Falls back to DB scan when the in-memory " +
          "state is stale (e.g. after a session restart).",
        args: {},
        async execute(_args, ctx) {
          const cleaned = []
          const dispID = ctx.sessionID

          // In-memory pass: clean tracked worktrees.
          const swarm = swarms.get(dispID)
          if (swarm) {
            for (const m of swarm.minions.values()) {
              if (!m.worktreePath) continue
              const r = await removeWorktree($, worktree, m.worktreePath)
              cleaned.push(`  ${m.codename}: ${r}`)
              if (r.startsWith("removed")) swarm.minions.delete(m.childID)
            }
          }

          // DB fallback: scan for orphaned child sessions and their worktrees.
          try {
            const res = await client.session.list()
            const sessions = res?.data ?? res ?? []
            let dbCleaned = 0
            for (const s of sessions) {
              if (s.parentID !== dispID) continue
              try { await client.session.delete({ path: { id: s.id } }) } catch {}
              dbCleaned++
            }
            if (dbCleaned) cleaned.push(`  db: deleted ${dbCleaned} orphaned child session(s)`)

            // Scan for worktrees on disk that belong to now-dead children.
            const known = new Set()
            if (swarm) for (const m of swarm.minions.values()) {
              if (m.worktreePath) known.add(m.worktreePath)
            }
            for (const s of sessions) {
              if (s.parentID !== dispID) continue
              const name = s.title?.replace(/\s*\([^)]+\)\s*$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-")
              const wtPath = `${directory}/../volley-${name}`
              if (known.has(wtPath)) continue
              try {
                const r = await removeWorktree($, worktree, wtPath)
                if (r.startsWith("removed")) cleaned.push(`  worktree: ${r}`)
              } catch {}
            }
          } catch {}

          return cleaned.length ? "Cleanup:\n" + cleaned.join("\n") : "Nothing to clean."
        },
      }),

      swarm_status: tool({
        description:
          "Show the status of all dispatched minions. " +
          "Returns a table with codename, agent, label, state, elapsed time, and any error.",
        args: {},
        async execute(_args, ctx) {
          const swarm = swarms.get(ctx.sessionID)
          if (!swarm || swarm.minions.size === 0) return "No minion state for this session."
          const rows = []
          for (const rec of swarm.minions.values()) {
            let state = "running"
            if (rec.done && rec.timedOut) state = "timeout"
            else if (rec.done && rec.error) state = "errored"
            else if (rec.done && rec.reported) state = "reported"
            else if (rec.done) state = "done"
            const ms = (Date.now()-rec.startedAt) / 1000
            const elapsed = rec.startedAt ? `${Math.round(ms)}s` : "-"
            const err = rec.error ?? ""
            rows.push(`  ${rec.codename}  ${rec.agent}  ${rec.label}  ${state}  ${elapsed}${err ? "  " + err : ""}`)
          }
          return "Swarm minions:\n" + rows.join("\n")
        },
      }),

      swarm_tail: tool({
        description: "Read the last 5 messages from a minion session by codename.",
        args: {
          codename: z.string().describe("the codename of the minion to tail"),
        },
        async execute(args, ctx) {
          const swarm = swarms.get(ctx.sessionID)
          if (!swarm) return "No swarm state for this session."
          let found = null
          for (const m of swarm.minions.values()) {
            if (m.codename === args.codename) {
              found = m
              break
            }
          }
          if (!found) return "no minion with that codename"
          try {
            const res = await client.session.messages({ path: { id: found.childID } })
            const msgs = res?.data ?? res ?? []
            const tail = msgs.slice(-5)
            return tail
              .map((mm) => {
                const info = mm.info ?? mm
                const role = info.role ?? info.type ?? "unknown"
                const texts = (mm.parts ?? [])
                  .filter((p) => p.type === "text")
                  .map((p) => p.text || "")
                return `${role}: ${texts.join("\n").slice(0, 500)}`
              })
              .join("\n---\n")
          } catch (e) {
            return `failed to read messages: ${e}`
          }
        },
      }),

      swarm_kill: tool({
        description: "Kill a running minion by codename. Aborts its session, removes its worktree if isolated, and cleans up. Falls back to DB and filesystem cleanup when the minion is not in the current swarm state (e.g. after a restart).",
        args: {
          codename: z.string().describe("the codename of the minion to kill"),
        },
        async execute(args, ctx) {
          const swarm = swarms.get(ctx.sessionID)
          let found = null
          if (swarm) {
            for (const m of swarm.minions.values()) {
              if (m.codename === args.codename) {
                found = m
                break
              }
            }
          }
          if (found) {
            found.killed = true
            try { await client.session.abort({ path: { id: found.childID } }) } catch {}
            try { await client.session.delete({ path: { id: found.childID } }) } catch {}
            if (found.worktreePath) {
              try { await removeWorktree($, worktree, found.worktreePath) } catch {}
            }
            found.done = true
            if (found.timer) clearTimeout(found.timer)
            swarm.minions.delete(found.childID)
            return `killed ${args.codename} (${found.label})`
          }
          // Fallback: scan DB and filesystem for orphaned sessions and worktrees
          // matching this codename.
          try {
            const res = await client.session.list()
            const sessions = res?.data ?? res ?? []
            let cleaned = 0
            for (const s of sessions) {
              if (!s.title?.includes(`${args.codename} (`)) continue
              try { await client.session.delete({ path: { id: s.id } }) } catch {}
              cleaned++
            }
            if (cleaned) return `killed ${args.codename}: cleaned ${cleaned} orphaned session(s)`
          } catch {}
          // Last resort: check for stale worktree on disk
          const paths = [`${directory}/../volley-${args.codename.toLowerCase()}`]
          for (const p of paths) {
            try {
              await removeWorktree($, worktree, p)
              return `killed ${args.codename}: removed orphaned worktree at ${p}`
            } catch {}
          }
          return `no minion, orphaned session, or worktree found for ${args.codename}`
        },
      }),
    },

    event: async ({ event }) => {
      const sid = event.properties?.sessionID ?? event.properties?.id
      if (!sid) return

      // General fallback: any event from a tracked minion triggers a done check.
      // Idle, prompt-response, error, and catch-all events all flow through here.
      for (const swarm of swarms.values()) {
        const rec = swarm.minions.get(sid)
        if (!rec || rec.done) continue

        // Explicit completion signals
        if (event.type === "session.idle") { markDone(swarm, rec); continue }

        // Check if the last message has a terminal finish reason
        try {
          const res = await client.session.messages({ path: { id: rec.childID } })
          const msgs = res?.data ?? res ?? []
          const last = msgs.at(-1)
          if (last && (["stop","length","content_filter","error"].includes((last.info ?? last).finish))) {
            markDone(swarm, rec)
          }
        } catch {}
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

// Spill an over-long minion report to disk. childID makes the name unique without
// a clock (Date.now is unavailable here). Returns the path, or null on failure so
// the caller can degrade to a plain truncation notice.
function spillReport(rec, body) {
  try {
    mkdirSync(SPILL_DIR, { recursive: true })
    const name = `${safeToken(rec.codename) || "minion"}-${safeToken(rec.label) || "report"}-${rec.childID}.txt`
    const path = join(SPILL_DIR, name)
    writeFileSync(path, `${rec.codename} (${rec.agent}) on ${rec.label}\n\n${body}`, "utf8")
    return path
  } catch {
    return null
  }
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
