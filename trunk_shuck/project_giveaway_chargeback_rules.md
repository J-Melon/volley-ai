---
name: Volley giveaway and key-issuance operational rules (chargeback protection)
description: Issue keys through Steam's curated key system only; apply per-band ceilings on giveaway volume; run quarterly G2A audits; cap bundle inclusions at one per year
type: project
parent: trunk_shuck
originSessionId: 9540bb2a-b9f6-48df-8a1d-63419bcf3e9d
---
**Operational rules for giveaway keys and direct key sales,** to defend against the tinyBuild scenario (stolen-card bundle purchases on the studio's own store, immediate G2A relisting, payment-processor shutdown from chargebacks):

- **Issue keys via Steam's curated key system only** (Keymailer, Lurkit, manual curator approvals, Humble / Yogscast bundle inclusions when accepted). The studio never operates a "buy a key directly from us" surface; that surface is the card-fraud attack vector.
- **Use per-band giveaway ceilings** (full table at `designs/research/giveaway-strategy.md`): about 2,975 keys at Band 1, 4,465 at Band 2, 4,025 at Band 3 floor. These are floor-based *upper bounds*; at the £500K cap (top of Band 3) the effective ceiling climbs to about 26,830. The recommended operating budget is **a quarter to a third of the ceiling**.
- **Year-one operating posture (Band 0 to 1):** ~200 press / curator keys, 500 streamer keys via Keymailer / Lurkit, ~200 community gifts, plus one Jingle Jam inclusion if accepted (bundle keys are redemption-restricted and don't reach G2A directly). Total ~900 non-bundle keys.
- **Audit quarterly.** Watermark a sample of issued keys, check G2A six months later. Anything above 5 percent of channel volume showing up on G2A is a fire alarm.
- **Free Weekend is a Band 3+ tool.** Below that the audience is too small to absorb the post-promo dip.
- **Cap pledges at a fixed amount per band** for community fundraising matching (also in `project_marketing_public_good.md`). Avoid open-ended matching commitments.
- **Cap bundle inclusions at one per year** to avoid price-anchor damage. A player who got Volley for fifty cents in a bundle does not become a $9.99 buyer of the next product.

**Why:** Established 2026-05-01 from Mr. Perkins's research workup. The chargeback-via-G2A risk is the operational ceiling, not cannibalisation. tinyBuild claimed $450K in grey-market exposure across ~25K keys; Wube Software (Factorio) recovered $39,600 from G2A after tracking 198 confirmed-illegitimate keys. Mitigation is operational (closed key issuance), not numerical.

**How to apply:**
- When ticketing or briefing any work that involves key distribution (press packs, streamer outreach, community giveaways, charity bundle applications, festival deals), check the per-band ceiling and the channel-specific cap before committing to a number.
- Use one of the approved channels: direct from Steam, direct from itch, or via a curated reseller (Humble Store on the studio's behalf). Do not offer a "buy a key directly from us" surface.
- When designing community giveaway mechanics, prefer pledge-cap models over volume-uncapped models.
- Update the workup to confirm the cannibalisation prior holds before lifting per-band ceilings.
