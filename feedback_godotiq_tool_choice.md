---
name: Pick the narrowest godotiq tool for the job
description: Assess the question first, then reach for the most specific tool that answers exactly it
type: feedback
originSessionId: deb199f4-304c-4a2c-8531-39e6504933fc
---
Before calling any godotiq tool, ask: **"what is the narrowest tool that answers exactly this question?"** Then call that one. Do not reach for a broad tool and probe.

**Why:** In this session I burned multiple turns asking "where are the spawned shop items in the running game?" by probing node paths blindly with `state_inspect`, when `ui_map` would have dumped the entire live Control tree in one call. I also called `scene_tree` with `scope=game` and got the parsed .tscn back instead of the runtime tree, then kept treating the result as authoritative. Both mistakes came from not pausing to ask "what tool is built for exactly this question?" before reaching for whatever was nearest.

**How to apply:**

1. **Name the question first.** "What's on screen right now?" is different from "what does the .tscn declare?" is different from "did this node move?". The question dictates the tool, not the other way around.
2. **Prefer specific over general.** `file_context` over reading a raw .gd file. `signal_map` over grepping for `signal `. `state_inspect` over screenshot for data values. `ui_map` over `scene_tree` for live Controls. `verify_motion` over two timed `state_inspect` calls. The specific tool is faster, has filtered output, and is harder to misread.
3. **If the first tool gave the wrong shape of answer, stop and reassess.** Don't double down by probing harder with the wrong tool. Step back, name the question more precisely, and pick a different tool.

**Concrete pairings worth remembering:**

| Question | Narrow tool | Wrong reach |
|---|---|---|
| What Controls are on screen right now? | `ui_map` | `scene_tree`, `state_inspect` per-path |
| What's the value of node X.property? | `state_inspect` | `screenshot` |
| Did this node move? | `verify_motion` | two `state_inspect` calls with sleep |
| What does this .gd file expose? | `file_context` | `Read` on the raw file |
| Where is signal X connected? | `signal_map` | `grep` for the signal name |
| What breaks if I rename Y? | `impact_check` | guessing |
| What does the saved .tscn declare? | `scene_tree` | reading the .tscn text |

The CLAUDE.md "Tool Reference" section is the authoritative list of every tool: re-read it when picking, don't guess from memory.
