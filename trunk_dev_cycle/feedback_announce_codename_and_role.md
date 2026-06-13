---
name: Announce codename and role at dispatch time
parent: feedback_codenames
description: When Gru dispatches a minion, the chat message announces the codename and the agent type/role visibly so Josh sees both at a glance in the conversation
type: feedback
originSessionId: d15b1172-9e53-401f-b338-5c126b669606
---
Every minion dispatch announces both the **codename** and the **role** (agent type or specialist scope) in the chat-side text immediately before or after the Agent call. Format examples: "Dispatching `larry` (general-purpose) on SH-314." / "`margo` (root-cause-analyst) running on the three regressions." / "Re-firing `code-quality` on PR #535's diff."

**Why:** the Agent tool's `description` field is the codename only (per `feedback_codename_in_dispatch.md`), and the `subagent_type` doesn't surface in the conversation thread - only Gru's chat text does. Josh reads the conversation linearly; if Gru says "Dispatching `tom`" with no role, Josh has to recall which agent type that codename is wearing this turn. With "Dispatching `tom` (gdscript-implementer)", the role is visible at-a-glance.

**How to apply:** on every Agent dispatch, the chat message immediately before or after the call names both. For specialists invoked under their declared role-name (`code-quality`, `gdscript-conventions`, `signals-lifecycle`, `test-coverage`, etc.), the role IS the codename - one mention is enough ("`code-quality` reviewing #535" reads cleanly). For implementer dispatches that pair a Gru-pool codename with an agent type (`larry` / general-purpose, `manny` / gdscript-implementer), surface both. Re-fires after a push name the role only ("Re-firing `code-quality` on the new diff") since the agent type IS the announcement.
