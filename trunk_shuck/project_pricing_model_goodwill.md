---
name: Volley pricing — free web, paid desktop binary, open source as escape hatch
description: itch web build free and identical to desktop; desktop download paywalled at a low fixed price (not PWYW); source open so anyone who'd rather build than pay can; the goodwill comes from the source escape hatch, not from PWYW
type: project
parent: trunk_shuck
originSessionId: 9540bb2a-b9f6-48df-8a1d-63419bcf3e9d
---
Volley's prototype pricing direction (as of 2026-05-01):

- **Web build (itch):** free. Identical product to the desktop, 1:1.
- **Desktop download:** paywalled at a low fixed price. Not pay-what-you-want; an actual price, just small.
- **Source:** open. Anyone who'd rather spend a couple of hours building from source than pay the small price can do that.
- **Steam (when it lands):** same small-price posture as the itch download. Steam's cut buys auto-updates, cloud saves, achievements, friends activity: more convenience layered on top of the same product. Source still open; itch web still free.

The closest per-product analogue is **Aseprite** (source on GitHub under the Aseprite license; official binaries paid; the paid binary lands on both itch and Steam at parity). Not Dwarf Fortress — DF was free with donations until the Steam release, which is a different model.

The company-scale precedent is **Valve / Steam itself**, documented at length in the published [open-development essay](https://github.com/shuck-dev/volley/blob/main/designs/research/the-case-for-open-development.md) § The Valve case. Source SDK opened after the 2003 leak (Garry's Mod, the entire mod scene, Portal-from-Narbacular-Drop). Steam Workshop revenue-shared US$57M+ with creators by 2015. Proton released open-source on GitHub under ValveSoftware. SteamOS on Arch. *Free to Play* documentary released free on YouTube and Steam. Newell on the record: "piracy is almost always a service problem and not a pricing problem." The complement is commoditised; the storefront layer makes the money. Volley's pricing model is the small-scale version of that posture.

**Why:** the paywall covers the convenience of not building from source. The goodwill comes from the source escape hatch, not from low pricing alone. The audience that wants the convenience pays a small price for it; the audience that wants to invest time instead of money is welcomed and trusted to. Both paths exist; neither is shamed. Same product across all three surfaces.

## The funding matrix

**Each band is a possible final shape of the game.** The matrix is a function: cumulative funding determines what the full game gets to be, and the price reflects what the full game actually is at that band. There is no fixed aspirational V1 sitting at Band 4 that earlier bands are climbing toward. If funding never grows past Band 2, the game ships as the Band 2 shape, the price stays at $5, and that is the full game.

Band 0 is what the developer's own time alone can produce: the playable proof-of-concept used to get eyes on Volley and validate the idea. Each subsequent band is what the game becomes if funding reaches that level.

Final price is a function of what funding has actually built. The studio publishes a [funding matrix](https://github.com/shuck-dev/volley/blob/main/designs/research/funding-matrix.md) (`designs/research/funding-matrix.md`) mapping cumulative-funding bands → game shape at that band → download price at that band.

- **Baseline funding:** **£700/month minimum** from the developer's own passive income, committed before any external money arrives. Over the 2-year cycle that is £16,800 on baseline alone (per the public funding matrix), which keeps the project firmly inside Band 0 with no external revenue. This is one of three counted funding sources (alongside download revenue and Patreon).
- **Floor (Band 0):** the playable proof-of-concept; developer's time plus the baseline.
- The published [funding matrix](https://github.com/shuck-dev/volley/blob/main/designs/research/funding-matrix.md) is the authority for the per-band price points and game shapes. Higher-band pricing (Steam parity and the ceiling band) and the cumulative-funding thresholds that trigger them are internal planning; consult the private funding planning, not this node, for those figures. Aseprite is the per-product price anchor; the open-development essay is the underlying why.

The price moves only when a band's full scope ships. Existing owners are never asked to top up; the climb applies to new buyers only. The matrix is updated in public when a band lands.

**How to apply:**
- When ticketing or briefing pricing, marketing, or itch-page work, do not propose:
  - feature differentiation between web and desktop (extra content, exclusive features, save-format split)
  - removing the source escape hatch to "improve conversion"
  - PWYW or "free with optional donation" for the desktop binary (the price is fixed and small, not optional)
  - hiding or downplaying the source availability in customer-facing surfaces
- Marketing copy can name all three surfaces honestly: "free in your browser, low price for the download, free if you build from source." The transparency is the marketing.
- Cite Aseprite as the model when pressure-testing pricing proposals (not Dwarf Fortress; that was free-with-donations, a different posture).
- The open-development essay is the studio's already-published version of the same trust posture; cite it as the underlying why.
- Don't surface this in customer-facing prose unprompted. Josh handles when and how to talk about pricing publicly.
