---
name: Double-check fee / financial arithmetic before quoting it confidently
description: when stating a back-of-envelope financial figure (transaction fees, revenue net, unit volume), write the components inline so a reader can verify; don't quote a single number with confidence
type: feedback
originSessionId: 9540bb2a-b9f6-48df-8a1d-63419bcf3e9d
---
When the conversation lands on a financial calculation (transaction fees, net per sale, unit-volume math, ARPU, etc.), do not state a single number with confidence. Write the components inline (`$2 − $0.30 (processor flat) − $0.06 (processor 2.9%) − $0.16 (itch 10%) ≈ $1.48`) so a reader can verify the formula. Stating "$2 nets ~$0.57" without the breakdown lets a stacked-fee error pass undetected.

**Why:** Established 2026-05-01 in the Volley pricing thread. I told Josh "$2 nets ~$0.57 after fees" and used the figure to argue $2 was meaningfully better economics than $1. Wild Knuckles (researcher) corrected me on the next research pass: I had stacked the processor's percentage fee twice. Actual net at $2 is ~$1.48, not $0.57. The error was load-bearing — Josh was leaning on it to pick the floor. The fix is to *show the math* every time so the next reader (or me) can spot the stacking.

**How to apply:**
- For any financial calc more than one operation deep, write the components on screen: principal − processor flat − processor percent − platform percent = net.
- If quoting a downstream consequence ("at $X, the ladder needs Y units"), state the per-unit assumption first so the multiplication can be checked.
- When using these numbers to argue a position ("$2 is better economics than $1"), the strength of the argument is the strength of the math; weak math = weak argument. Do not lean on a number you have not double-checked.
- This is operational discipline, not a content rule. It applies to any conversation where a number could shape a decision (pricing, funding, hours, costs, salary, fees).
- When a research agent (Wild Knuckles, etc.) returns a corrected figure, propagate the correction immediately to anywhere I quoted the wrong number — including chat, design docs, memory, and any open PR description.
