# SH-522 Duel LFS -- Spike Findings

## Goal

Run GitHub LFS as a second backend alongside the current R2 Worker proxy, so PR
reviewers can fetch assets through GitHub's native LFS URLs.

## Current Setup

- Primary LFS endpoint: `https://volley-lfs-proxy.volcanoem.workers.dev` (Cloudflare R2 Worker)
- Three-credential auth: DOWNLOAD, UPLOAD, PROMOTE
- Two-tier storage: `preview/` and `release/`
- `.lfsconfig` hardcodes the proxy URL with the download key
- 96 MB of LFS-tracked assets on disk (45 objects: sprites, source art, audio)

## Key Findings

### 1. GitHub LFS is feasible as a second backend

The CI workflow on PR can push LFS objects to GitHub's LFS endpoint
(`https://github.com/shuck-dev/volley.git/info/lfs`) after uploading to the
proxy. `lfs.pushurl` alone is insufficient: GitHub LFS objects must be
associated with the git remote via `git lfs push` to create the pointer-object
mapping in GitHub's database.

### 2. Free tier is abundant for preview use

| Plan | Bandwidth | Storage |
|------|-----------|---------|
| GitHub Free for orgs | 10 GiB/month | 10 GiB |

- Budget can be set to $0 to hard-cap at free limit (blocks overages)
- Upload uses zero bandwidth (only download is metered)
- Storage is charged hourly based on what is stored
- Overages at ~$0.0875/GiB bandwidth, ~$0.07/GiB-month storage

### 3. Best compression: PNG to WebP

Convert PNG sprites to WebP at quality 85% for the GitHub LFS preview channel.
WebP is supported by all browsers and GitHub's image rendering. Quality 85% is
visually near-identical to source PNGs for sprite review.

| Metric | Current (PNG) | Compressed (WebP Q85) |
|--------|---------------|----------------------|
| Total size | ~96 MB | ~15 MB |
| Per-sprite | 200-400 KB | 30-60 KB |

At ~15 MB, the full asset set fits 600x within the 10 GiB free storage tier.

Tool: `cwebp` (from libwebp, available via `apt install webp` in CI runners).

Source art (PSD, KRA, ASE) and audio (WAV, OGG, MP3) are excluded from GitHub
LFS: PR reviewers only need sprite previews.

### 4. CI integration path

1. PR CI fetches LFS assets from the proxy (existing step in `publish.yml`)
2. Convert all tracked PNGs to WebP at Q85 via `cwebp`
3. Push WebP files to GitHub LFS: `git lfs push origin --all`
4. Budget set to $0 in GitHub LFS settings (safety cap)

### 5. Open questions

- How does `git lfs pull` know which backend to use? The `.lfsconfig` currently
  points to the proxy. PR reviewers need a way to switch to GitHub's LFS for
  preview. Options: a `just` command, a second `.lfsconfig`, or CI-populated
  `lfs.url` override.
- Does GitHub LFS deduplicate objects across repos? (relevant for fork bandwidth)
- Should compressed WebP previews be committed to the repo, or generated purely
  in CI and only pushed to LFS?

## Implementation Tickets

Filed as follow-up:

| Ticket | What |
|--------|------|
| TBD | CI step: `git lfs push` to GitHub on PR |
| TBD | CI step: PNG to WebP compression for preview channel |
| TBD | GitHub LFS budget config ($0 cap) |
| TBD | PR reviewer docs: how to pull from GitHub LFS |
