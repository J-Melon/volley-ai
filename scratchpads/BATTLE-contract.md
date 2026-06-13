# BATTLE-contract: swarm-dispatch.js raw notes

Reviewer lens: contract fidelity (plugin vs scope vs SDK types).

## SDK types consulted

- `/home/josh/.config/opencode/node_modules/@opencode-ai/sdk/dist/gen/types.gen.d.ts`
  - SessionCreateData (line 1811): body.{parentID?, title?}, query.{directory?}
  - SessionPromptData (line 2244): body.{agent?, parts, noReply?, ...}, path.{id}, query.{directory?} -- NO bare query-level directory conflict
  - SessionMessagesData (line 2209): returns Array<{info: Message, parts: Array<Part>}>
  - SessionGetData (line 1888): path.{id}, query.{directory?}, returns Session (has parentID?)
  - SessionAbortData (line 2059): path.{id}, query.{directory?}
  - EventSessionIdle (line 413): type "session.idle", properties.{sessionID: string} -- ONLY sessionID, nothing else
- `/home/josh/.config/opencode/node_modules/@opencode-ai/plugin/dist/tool.d.ts`
  - ToolContext: sessionID, messageID, agent, directory, worktree, abort, metadata, ask
  - tool() input: {description, args (ZodRawShape), execute(args, context: ToolContext)}
- `/home/josh/.config/opencode/node_modules/@opencode-ai/plugin/dist/index.d.ts`
  - Hooks.event: (input: {event: Event}) => Promise<void>
  - Plugin signature: (input: PluginInput, options?) => Promise<Hooks>
  - PluginInput fields: client, project, directory, worktree, experimental_workspace, serverUrl, $

---

## Finding 1: Plugin export shape does not match Plugin type (BLOCK)

types (index.d.ts line 51): `type Plugin = (input: PluginInput, options?) => Promise<Hooks>`

The plugin exports a named const `SwarmDispatch` (line 38), not a default export matching
`Plugin`. The module must also export `server: Plugin` per PluginModule (line 53-56):
`type PluginModule = { id?: string; server: Plugin; tui?: never; }`. The file has no
`export default` and no `server` export. OpenCode will fail to load this as a plugin.

That said, OpenCode's actual loading mechanism may differ from the declared PluginModule type.
This is a structural smell, not a provable hard failure without checking the loader.
Flag: medium-confidence, worth verifying.

## Finding 2: session.prompt called with `query.directory` -- VALID per SDK

SessionPromptData (line 2265-2267): `query?: { directory?: string }`. The call at line 154-158
passes `query: { directory: dir }`. This is correct.

## Finding 3: session.create called with `query.directory` -- VALID per SDK

SessionCreateData (line 1817-1819): `query?: { directory?: string }`. Call at line 142-145.
Correct.

## Finding 4: session.prompt body.agent -- VALID per SDK

SessionPromptData (line 2251): `agent?: string`. Used at line 157. Correct.

## Finding 5: `res?.data ?? res` pattern -- QUESTIONABLE

SDK types: SessionCreateResponses[200] = Session (not {data: Session}).
The client returned by `createOpencodeClient` wraps responses. Need to check client.d.ts
to know if it wraps in a `data` envelope. Without that check the `?? res` fallback
makes this safe in practice. Low risk due to the fallback, but it's defensive
rather than known-correct.

## Finding 6: session.messages response shape vs swarm_collect access -- VALID

SessionMessagesData response (line 2238-2241): `Array<{info: Message, parts: Array<Part>}>`.

swarm_collect code (lines 234-241):
```
const mm = msgs[i]
const info = mm.info ?? mm
if ((info.role ?? info.type) !== "assistant") continue
text = (mm.parts ?? [])...
```
`mm.info` matches the `{info, parts}` shape. `info.role` is correct -- Message union
has `role: "user"` (UserMessage) and `role: "assistant"` (AssistantMessage). The
`?? info.type` fallback is unnecessary noise but harmless. `mm.parts` correct.
This is fine.

## Finding 7: EventSessionIdle shape -- VALID

EventSessionIdle (types.gen.d.ts line 413-417): `{ type: "session.idle", properties: { sessionID: string } }`.

Plugin event hook (line 280-296): `event.type !== "session.idle"` and `event.properties.sessionID`.
Both accesses match exactly. Correct.

## Finding 8: event hook signature -- VALID

Hooks.event (index.d.ts line 175-177): `(input: { event: Event }) => Promise<void>`.
Code: `event: async ({ event }) => { ... }` -- destructures correctly. Valid.

## Finding 9: tool() signature -- VALID

tool.d.ts (line 47-55): `tool<Args extends ZodRawShape>(input: {description, args, execute(args, context: ToolContext)})`.
Code uses `tool({ description, args: { ... }, async execute(args, ctx) {...} })`. Valid.

## Finding 10: ctx.sessionID is the DISPATCHER's session -- VALID BY DESIGN

ToolContext.sessionID is the session in which the tool is called. Since swarm_dispatch and
swarm_collect are called from the dispatcher's session, ctx.sessionID is indeed the
dispatcher's ID. The scope assumption is correct and verifiable from the type: the tool runs
in whatever session invoked it.

## Finding 11: MINION_TIMEOUT_MS -- DEAD CODE (scope gap)

Declared at line 35: `const MINION_TIMEOUT_MS = 10 * 60 * 1000`. Never referenced anywhere else
in the file. Scope doc (line 119): "Per-minion timeout: if a child exceeds T seconds, session.abort
it and mark failed." Feature is claimed in scope, constant is declared, implementation is absent.
The timeout/abort logic does not exist. This is a scope-vs-impl gap.

## Finding 12: inFlight variable -- DEAD CODE

Declared line 119: `let inFlight = 0`. Incremented line 182: `inFlight++`. Never decremented,
never read, never used for the concurrency cap. The actual cap enforcement is via
`queue.splice(0, cap)` (line 179) at launch time and queue-drain in the idle handler.
inFlight is dead. Harmless but misleading (it is not the concurrency guard it appears to be).

## Finding 13: "Wake the parent via session.idle re-inject" -- ABSENT (scope gap)

Scope doc (lines 53-57): "Optionally re-inject a one-line 'minion <label> finished' notice
into the parent via session.prompt with a noReply/system part, so Gru is woken to collect
(the ParentWakeNotifier idea, but minimal). Batch sibling completions to avoid spamming the parent."

The scope marks this "optionally" and separately notes under "Still to verify" (line 148-150)
that the behavior of mid-turn injection is unverified. The idle handler (lines 280-296) marks
`rec.done = true` and launches next queued minion but does NOT call session.prompt on the
parent. The feature is optional-with-caveat in the scope, so this is not a hard block, but
the scope claims it as part of the design and it is entirely absent. Call it an acknowledged gap.

## Finding 14: Plugin function signature vs PluginModule.server

The scope says "registered via the plugin tool hook." The export is:
`export const SwarmDispatch = async ({ client, directory, worktree, $ }) => { ... }`

PluginInput (index.d.ts line 36-46) has: client, project, directory, worktree,
experimental_workspace, serverUrl, $. The destructure omits `project`, `experimental_workspace`,
`serverUrl` -- that is fine (unused). But the return is `{ tool: {...}, event: ... }`.

Hooks (index.d.ts line 173+) has `tool?: { [key: string]: ToolDefinition }` and
`event?: (input: {event: Event}) => Promise<void>`. The returned object structure matches.

The issue remains how OpenCode loads it. If it expects `module.server` (PluginModule), a
named export `SwarmDispatch` won't be found automatically. Risk is real but loader-dependent.

---

## Summary table

| # | Finding | Severity |
|---|---------|----------|
| 1 | Export shape: named const, no `server` export per PluginModule | Medium (loader-dependent) |
| 5 | `res?.data ?? res` pattern unverified against client wrapper | Low (fallback covers it) |
| 11 | MINION_TIMEOUT_MS declared, scope claims timeout, not implemented | Scope gap (no abort logic) |
| 12 | `inFlight` variable declared/incremented but never used for cap | Dead code |
| 13 | Parent wake/re-inject absent; scope marks optional with open question | Acknowledged gap |
