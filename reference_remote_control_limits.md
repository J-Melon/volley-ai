---
name: Claude Code Remote Control limitations
description: known constraints of Remote Control mode (mobile access to Claude Code sessions); what works, what doesn't, workarounds
type: reference
originSessionId: 8ccd039c-e27c-4f2f-888a-5678ecd02dfd
---
Josh drives Claude Code sessions from his Linux workstation (primary) and from mobile via Remote Control (secondary). Known behaviours as of April 2026:

**Works on Remote Control:**
- Reading streamed responses, tool activity summaries.
- Sending prompts, queueing a follow-up while a response is generating (confirmed via web viewer on mobile).
- All normal agentic work continues.

**Push notifications:**
- Supported end-to-end (Claude Code 2.1.110+), enabled via `/config` → "Push when Claude decides" + Android app launched at least once to register token.
- **Pushes are suppressed whenever the terminal has focus**; both desktop banner and mobile push. This is deliberate and not configurable (as of April 2026). `PushNotification` tool returns "Not sent; terminal has focus. Terminal + mobile suppressed." in that case.
- To test pushes: alt-tab away from the terminal or lock the screen before the task completes.
- Explicit prompt asks ("notify me when X") still fire via `PushNotification` tool, but remain subject to the focus gate.

**Does not work on Remote Control:**
- `/feedback` slash command. Prints "not available over Remote Control". Must be run from the local terminal.
- `/config` slash command. Same; confirmed needs local terminal.
- Extended-thinking / "thoughts" blocks. Not rendered in mobile app or web viewer; only the final response text and tool activity show.
- Interactive slash commands generally; assume any slash command that needs local-terminal UI will not forward.

**Android Claude app (mobile app specifically):**
- Send button bug: renders as stop/interrupt icon on fresh connect to an idle Remote Control session, blocks first message. Tracked as github.com/anthropics/claude-code/issues/32457 (open since 9 March 2026, locked). Persists through app restart and new session; workaround requires desktop round-trip.
- **Preferred mobile workaround: open the session URL (`https://claude.ai/code/session_...`) in the mobile browser instead of the app.** Web viewer handles input and prompt queueing correctly. Trades away push notifications, keeps everything else working.

**How to apply:**
- If Josh mentions he's on mobile, assume web viewer unless he says otherwise.
- If he needs to run `/feedback` or another slash command that fails on Remote Control, tell him to capture the text and run it from desktop later.
- If he reports a bug-shaped symptom on mobile, check whether it's an app-specific issue before troubleshooting anything deeper.
