# SH-522 Duel LFS -- Spike Findings

## Goal

Push LFS objects to GitHub's native LFS storage on PR so GitHub's web diff
renders sprite images inline, alongside the R2 Worker proxy that remains
the primary backend for development.

## Verdict

**`git lfs push --object-id origin <oids>` on PR CI.** One step. No
compression, no bot, no pointer file changes, no new infrastructure.

## Current Setup

- Primary LFS endpoint: `https://volley-lfs-proxy.volcanoem.workers.dev`
- Three-credential auth: DOWNLOAD, UPLOAD, PROMOTE
- Two-tier storage: `preview/` and `release/`
- `.lfsconfig` hardcodes the proxy URL (client-side only; GitHub web rendering ignores it)
- 96 MB of LFS-tracked assets on disk (45 objects)

## Key Findings

### 1. GitHub DOES render LFS images in PR diffs

Verified against PR #994 (pre-proxy merge). GitHub's Content API returns full
image size for LFS-tracked files, confirming object resolution. GitHub's web UI
renders LFS images in blob view and PR rich diff when the objects are in
GitHub's LFS storage. The limitation is not a platform block: current objects
live in R2, not GitHub LFS.

The `.lfsconfig` proxy URL is client-side for `git lfs pull/push`. GitHub's web
rendering ignores it and uses GitHub's own LFS storage.

### 2. `git lfs push --object-id` works without pointer file commits

The `--object-id` flag pushes LFS objects by OID without requiring committed
pointer files. The objects just need to be in the local LFS cache (populated by
`git lfs pull` from the proxy during CI). The PR diff already contains the
pointer files from the actual git change; GitHub resolves them against its own
LFS storage.

CI command:
```
git lfs pull
git -c lfs.url=https://github.com/shuck-dev/volley.git/info/lfs \
    lfs push --object-id origin $(git lfs ls-files -l | awk '{print $1}')
```

The `-c lfs.url=...` override is needed because `.lfsconfig` points to the proxy
but the push target is GitHub.

### 3. No compression needed at current or projected scale

LFS is content-addressed. Same OID pushed from any PR hits the same object.
Storage grows with new assets, not with PR count. 96 MB current assets equals
96 MB stored once, rendered in every PR.

| Scale | Storage |
|-------|---------|
| Current (96 MB) | 96 MB |
| 1 GB game | 1 GB |
| 10 GB game | 10 GB |

GitHub Free for orgs includes 10 GiB storage. Even at 10 GB game scale, we fit.
Budget set to $0 caps overages.

### 4. Free tier is abundant

| Plan | Bandwidth | Storage |
|------|-----------|---------|
| GitHub Free for orgs | 10 GiB/month | 10 GiB |

- Upload uses zero bandwidth (only download is metered)
- Storage is charged hourly based on what is stored
- Budget can be set to $0 to hard-cap at free limit

### 5. WebP compression is a future option

If the game ever approaches the free tier storage limit, WebP lossy via
`cwebp -q 80 -m 6 -mt` compresses PNG sprites by ~85% with visually lossless
quality for sprite review. AVIF is unsupported on GitHub. Two-pass preprocessing
(oxipng, pngquant) adds no benefit when targeting lossy WebP. This is not needed
now but is researched and ready.

## Approach Ruled Out

| Approach | Why |
|----------|-----|
| PR comment bot | Unnecessary complexity; native rendering works |
| WebP compression | Not needed at current scale; optional future optimization |
| AVIF format | GitHub does not render AVIF |
| External image hosting (Imgur, R2 public URL) | Unnecessary; GitHub serves its own LFS |
| `lfs.pushurl` config | Insufficient; objects need git remote association |

## CI Integration Path

```yaml
- name: Push LFS objects to GitHub for PR preview
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: |
    git lfs pull
    git -c lfs.url=https://github.com/shuck-dev/volley.git/info/lfs \
        lfs push --object-id origin $(git lfs ls-files -l | awk '{print $1}')
```

Needs: a GITHUB_TOKEN or PAT with repo scope (for LFS push). The built-in
`secrets.GITHUB_TOKEN` in Actions may need LFS write permissions enabled in
repo/org settings.

GitHub LFS budget should be set to $0 in repo settings as a safety cap.

## Implementation Tickets

| What | Notes |
|------|-------|
| CI step: `git lfs push --object-id` to GitHub on PR | New workflow or augment publish.yml |
| GitHub LFS budget config ($0 cap) | One-time repo settings change |
| Auth: verify GITHUB_TOKEN has LFS write scope | May need fine-grained PAT |
