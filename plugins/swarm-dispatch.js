// Swarm dispatch for OpenCode: parallel, non-blocking subagents with the
// dispatcher (Gru) staying reachable, and results collected back. Drives the
// volley-ai agents. The capability OpenCode lacks natively (its task tool is
// sequential + blocking, issues #14195/#15069); this fills it via the session API.
//
// Tools registered:
//   swarm_dispatch  - fan out N codenamed minions as concurrent child sessions,
//                     return immediately (dispatcher keeps working)
//   swarm_collect   - gather the minions' status + final output
//   swarm_cleanup   - remove spent worktrees (isolate:true minions)
//
// Design + probe results: see SWARM-DISPATCH-SCOPE.md.

import { tool } from "@opencode-ai/plugin"

const z = tool.schema

// Themed codename pool (dispatch convention). One per in-flight minion.
const CODENAMES = [
  // Gravity Falls
  "Dipper", "Mabel", "Soos", "Wendy", "Ford", "Stan", "Bill",
  // Hitchhiker's
  "Arthur", "Ford2", "Zaphod", "Trillian", "Marvin", "Slartibartfast",
  // Oddworld
  "Abe", "Munch", "Stranger",
  // Omori
  "Sunny", "Aubrey", "Kel", "Hero", "Basil",
  // Outer Wilds (Hearthians + Nomai)
  "Feldspar", "Gabbro", "Riebeck", "Chert", "Esker", "Solanum", "Poke",
  // Martha
  "Martha",
]

const CONCURRENCY_DEFAULT = 5
const MINION_TIMEOUT_MS = 10 * 60 * 1000 // 10 min; abort a hung minion
const MAX_DEPTH = 3 // refuse minion-spawns-minion past this

export const SwarmDispatch = async ({ client, directory, worktree, $ }) => {
  // dispatcherID -> { minions: Map<childID, record>, usedNames: Set }
  const swarms = new Map()

  function getSwarm(id) {
    let s = swarms.get(id)
    if (!s) {
      s = { minions: new Map(), usedNames: new Set() }
      swarms.set(id, s)
    }
    return s
  }

  // Idempotent completion: clear the timeout, free the codename, drain one queued
  // minion into the freed slot. Called from both the idle event and the timeout.
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
  }

  function pickCodename(swarm, role, index) {
    const free = CODENAMES.find((n) => !swarm.usedNames.has(n))
    if (free) {
      swarm.usedNames.add(free)
      return free
    }
    // pool exhausted within one fan-out: fall back, do not invent on-theme names
    return `${role}-${index + 1}`
  }

  // Depth guard: walk the parent chain; refuse if too deep.
  async function depthOf(sessionID) {
    let depth = 0
    let cur = sessionID
    for (let i = 0; i < MAX_DEPTH + 2 && cur; i++) {
      try {
        const res = await client.session.get({ path: { id: cur } })
        const info = res?.data ?? res
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
          "work, GodotIQ is pinned to the main tree). Then use swarm_collect.",
        args: {
          minions: z
            .array(
              z.object({
                agent: z.string().describe("agent id, e.g. code-quality, gdscript-implementer"),
                task: z.string().describe("the brief for this minion"),
                label: z.string().describe("short task label for the session title, e.g. SH-254"),
                isolate: z
                  .boolean()
                  .optional()
                  .describe("true = give this WRITER its own git worktree. Never for scene work."),
              })
            )
            .describe("the minions to dispatch in parallel"),
          concurrency: z
            .number()
            .optional()
            .describe(`max concurrent minions (default ${CONCURRENCY_DEFAULT})`),
        },
        async execute(args, ctx) {
          const dispatcherID = ctx.sessionID

          const depth = await depthOf(dispatcherID)
          if (depth >= MAX_DEPTH) {
            return `Refused: dispatch depth ${depth} reaches the cap (${MAX_DEPTH}). A minion may not spawn a deep chain of sub-minions.`
          }

          const swarm = getSwarm(dispatcherID)
          const cap = args.concurrency ?? CONCURRENCY_DEFAULT
          const dispatched = []
          const queue = [...args.minions]

          async function launch(m, index) {
            const codename = pickCodename(swarm, m.agent, index)
            const title = `${codename} (${m.agent}): ${m.label}`
            let dir = directory
            let worktreePath = null
            let branch = null

            if (m.isolate) {
              // Worktree isolation (writers only). The scene-work guard inspects
              // BOTH task and label (scene risk is in the task, not the label).
              const wt = await makeWorktree($, worktree, codename, m.label, m.task)
              if (wt.error) return { codename, label: m.label, error: wt.error }
              dir = wt.path
              worktreePath = wt.path
              branch = wt.branch
            }

            // Create the child session under this dispatcher.
            let childID
            try {
              const res = await client.session.create({
                body: { parentID: dispatcherID, title },
                query: { directory: dir },
              })
              childID = (res?.data ?? res)?.id
            } catch (e) {
              return { codename, label: m.label, error: `session.create failed: ${e}` }
            }
            if (!childID) return { codename, label: m.label, error: "no child session id returned" }

            // Fire the prompt; do NOT await the model's completion.
            client.session
              .prompt({
                path: { id: childID },
                query: { directory: dir },
                body: { agent: m.agent, parts: [{ type: "text", text: m.task }] },
              })
              .catch(() => {}) // failure surfaces via collect, not here

            const rec = {
              codename,
              label: m.label,
              agent: m.agent,
              childID,
              dir,
              worktreePath,
              branch,
              isolate: !!m.isolate,
              startedAt: Date.now(),
              done: false,
            }
            swarm.minions.set(childID, rec)

            // Enforce the per-minion timeout: a hung child never goes idle, so it
            // would leak its codename + slot forever. Abort it and mark done so
            // the queue drains and collect reports it.
            rec.timer = setTimeout(() => {
              if (rec.done) return
              client.session.abort({ path: { id: childID } }).catch(() => {})
              rec.timedOut = true
              markDone(swarm, rec)
            }, MINION_TIMEOUT_MS)

            return rec
          }

          // Respect the concurrency cap: launch up to `cap`, queue the rest. The
          // session.idle handler frees slots as minions finish (see event hook).
          const initial = queue.splice(0, cap)
          const results = await Promise.all(initial.map((m, i) => launch(m, i)))
          for (const r of results) {
            if (r.error) {
              dispatched.push(`  ${r.codename} (${r.label}): FAILED to launch, ${r.error}`)
            } else {
              dispatched.push(
                `  ${r.codename} (${r.agent}) -> ${r.label}` +
                  (r.isolate ? ` [worktree ${r.branch}]` : "")
              )
            }
          }
          // Park the overflow on the swarm so the idle handler can launch them.
          swarm.pending = queue.map((m, i) => ({ ...m, index: cap + i }))
          swarm.launch = launch // closure the idle handler reuses

          const queued = swarm.pending.length
          return (
            `Dispatched ${initial.length} minion(s) in parallel (cap ${cap}):\n` +
            dispatched.join("\n") +
            (queued ? `\n  + ${queued} queued, launching as slots free.` : "") +
            `\n\nYou are free to keep working. Call swarm_collect to gather results.`
          )
        },
      }),

      swarm_collect: tool({
        description:
          "Snapshot the status and output of minions dispatched via swarm_dispatch: " +
          "each is 'done' (with its output) or 'running'. Does not block. Collecting " +
          "a done minion CONSUMES it (its session is deleted so it stops cluttering " +
          "the session list), so capture what you need from the output. Call again " +
          "later for minions still running; you are woken as they finish.",
        args: {},
        async execute(_args, ctx) {
          const swarm = swarms.get(ctx.sessionID)
          if (!swarm || swarm.minions.size === 0) return "No minions dispatched in this session."

          const out = []
          for (const m of swarm.minions.values()) {
            const status = m.done ? (m.timedOut ? "timed-out" : "done") : "running"
            let text = ""
            if (m.done) {
              try {
                const res = await client.session.messages({ path: { id: m.childID } })
                const msgs = res?.data ?? res ?? []
                for (let i = msgs.length - 1; i >= 0; i--) {
                  const mm = msgs[i]
                  const info = mm.info ?? mm
                  if ((info.role ?? info.type) !== "assistant") continue
                  text = (mm.parts ?? [])
                    .filter((p) => p.type === "text")
                    .map((p) => p.text || "")
                    .join("\n")
                  break
                }
              } catch {
                text = "(could not read messages)"
              }
            }
            out.push(
              `### ${m.codename} (${m.agent}) , ${m.label} [${status}]` +
                (m.branch ? ` branch ${m.branch}` : "") +
                (text ? `\n${text.slice(0, 1500)}` : "")
            )

            // Once a minion's output is captured, delete its child session so it
            // stops cluttering session listings (the remote app shows children;
            // there is no server-side hide flag). Running minions are left alone;
            // call swarm_collect again for them. Deleting the session does NOT
            // touch a worktree (that is swarm_cleanup's job, after landing).
            if (m.done) {
              client.session.delete({ path: { id: m.childID } }).catch(() => {})
              swarm.minions.delete(m.childID)
            }
          }
          return out.length ? out.join("\n\n") : "All dispatched minions already collected."
        },
      }),

      swarm_cleanup: tool({
        description:
          "Remove the git worktrees created for isolate:true minions, after their " +
          "branches are landed or abandoned. Never removes a worktree with " +
          "uncommitted changes.",
        args: {},
        async execute(_args, ctx) {
          const swarm = swarms.get(ctx.sessionID)
          if (!swarm) return "No swarm state for this session."
          const removed = []
          for (const m of swarm.minions.values()) {
            if (!m.worktreePath) continue
            const r = await removeWorktree($, worktree, m.worktreePath)
            removed.push(`  ${m.codename}: ${r}`)
          }
          return removed.length ? "Worktree cleanup:\n" + removed.join("\n") : "No worktrees to clean."
        },
      }),
    },

    // Mark minions done when their child session goes idle, and launch any queued
    // overflow into the freed slot.
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

// --- worktree helpers (writers only; see SWARM-DISPATCH-SCOPE.md) ------------

// Scene-work minions must NOT be isolated (GodotIQ is pinned to the main tree; a
// worktree write to a scene lands in main anyway). The risk lives in the TASK,
// not just the label, so scan both.
function isSceneWork(label, task) {
  return /\.tscn|\.tres|scene|node_ops|build_scene/i.test(`${label}\n${task}`)
}

// Clamp any string to a safe path/branch token: lowercase alnum + hyphen only.
// Guards the pool-exhausted codename fallback (`${role}-${n}`) against path
// traversal or odd characters reaching the git command.
function safeToken(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
}

async function makeWorktree($, mainTree, codename, label, task) {
  if (isSceneWork(label, task)) {
    return {
      error:
        "isolate:true refused for scene work, GodotIQ is bound to the main tree, " +
        "so a worktree write would land in main regardless. Run scene minions " +
        "serial on the main tree instead.",
    }
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
    // Never remove work that hasn't landed. Two gates:
    // 1. uncommitted changes in the worktree, and
    // 2. commits on the branch not yet reachable from main (committed-but-unmerged).
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
