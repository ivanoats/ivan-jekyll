# ivanstorck.com — project plan

> Last updated: 2026-04-19. Keep this in sync with the Notion project page when available.

## Completed

| # | Task | PR(s) | Date |
|---|---|---|---|
| 1 | Fix `bundle install` — drop dead gems (jekyll-commonmark, s3_website), regen lockfile | #63 | 2026-04-11 |
| 2 | Prune legacy chrome — stale theme overrides, IE10 favicons, growl plugin, scottyjs | #64 | 2026-04-11 |
| 3 | Netlify security headers, GA cleanup, grouped Dependabot | #65 | 2026-04-11 |
| 4 | Close 12 obsolete dependency PRs (superseded by #63) | #47–62 closed | 2026-04-11 |
| 5 | Close Snyk PR #52 (rexml vuln already patched) | #52 closed | 2026-04-13 |
| 6 | Custom stork skin — black/white/red palette, serif display, dark mode | #67 | 2026-04-13 |
| 7 | Remove all X/Twitter promotion — sidebar, meta tags, share buttons | #67 | 2026-04-13 |
| 8 | Update Instagram to @storckphotos | #67 | 2026-04-13 |
| 9 | Reposition home page — new index.md with "sustainable systems" framing | #68 | 2026-04-14 |
| 10 | New /work-with-me page — three engagement shapes, fit criteria | #68 | 2026-04-14 |
| 11 | Swap logo to stork-on-camera (IMG_0110.PNG) | #68 | 2026-04-14 |
| 12 | Fix PurgeCSS safelist — sr-only, header-link, clipboard classes | #68 | 2026-04-14 |
| 13 | Fix heading permalink anchor visibility (theme cascade bug) | #68 | 2026-04-14 |
| 14 | Ivan's copy edits — 30 years, Senior Solutions Architect, updated descriptions | #71 | 2026-04-18 |
| 15 | Fingerprinted CSS filenames for cache-busting | #70 | 2026-04-19 |
| 16 | Transparent logo background (strip cream) | #72 | 2026-04-19 |
| 17 | Dark/light toggle button with localStorage persistence | #72 | 2026-04-19 |
| 18 | CLAUDE.md + README.md refreshed for current state | direct to master | 2026-04-13 |

## In progress

*Nothing currently in progress.*

## Up next — site pages (before first blog post)

These pages need to ship before the wsg-check launch cornerstone drops, so readers land on a coherent site.

| Priority | Task | Effort | Notes |
|---|---|---|---|
| **P1** | Rewrite `about.md` | 30 min | Last page still in old third-person "web developer portfolio" voice. Reorder: independent operator → 25 years → teaching → maritime/geospatial → currently at lululemon. First-person. |
| **P2** | New `/now` page | 10 min | nownownow.com convention. One paragraph about current focus, updated monthly. |
| **P3** | New `/projects` page | 20 min | One-liner + status for: wsg-check, sustainablewebsites2, Rendition, speed-and-position, StorckPhotos. Add to nav. |

## Up next — content launch

| Priority | Task | Effort | Depends on | Notes |
|---|---|---|---|---|
| **P1** | Read W3C Web Sustainability Guidelines end-to-end | 2–3 hrs (Ivan, offline) | — | Produces: launch post structure, first GitHub issue on the spec, seeds for 5+ Friday shorts. |
| **P2** | Write Month 1 cornerstone: wsg-check launch post | Weekend | WSG read-through + site pages done | "A first attempt at scoring a website against the W3C WSG — and an honest list of what I don't know yet." |
| **P3** | First Friday short (Log format) | 1 hr | Cornerstone published | Rendition or wsg-check progress. Starts the cadence. |

## Up next — community & social

| Priority | Task | Effort | Notes |
|---|---|---|---|
| **P1** | Opt into Bridgy Fed | 1 min | Follow `@ap.brid.gy` on Bluesky. Fediverse users can then follow `@ivanstorck.com@bsky.brid.gy`. |
| **P2** | File first GitHub issue on w3c/sustainableweb-wsg | 30 min | One ambiguity discovered during wsg-check development. Introduce self in community Slack. |
| **P3** | Attend one W3C WSG community meeting | 1 hr | Listen, don't pitch. Introduce if invited. |

## Backlog — technical polish

| Task | Effort | Notes |
|---|---|---|
| Hero image `<picture>` with srcset + WebP/AVIF | 1 hr | Homepage loads 1752w JPG as plain `<img>`. Have 440w/876w/1752w variants already. |
| Image optimization pass (cwebp/oxipng) | 30 min | One-time sweep of `assets/images/`. |
| GitHub Actions CI for PR builds | 1 hr | `bundle exec jekyll build` + html-proofer link check. Catches broken links before prod. |
| jekyll-sass-converter 2.x → 3.x migration | 2 hrs | Switches from deprecated libsass (sassc) to dart-sass (sass-embedded). Real behavior change in CSS compilation — needs visual testing. No security urgency. |
| WebFinger on own domain for Bridgy Fed | 2 hrs | Upgrades fediverse handle from `@ivanstorck.com@bsky.brid.gy` to `@ivan@ivanstorck.com`. Only worth doing after Bridgy Fed proves useful. |

## Backlog — content (months 2–6 cornerstones)

Per the blogging strategy (`.claude/blogging-strategy.md`):

| Month | Pillar | Working title |
|---|---|---|
| 2 | Architecture for founders | Rendition intro — sustainable infrastructure at the edge |
| 3 | Architecture for founders | StorckPhotos as white-label platform: ten decisions in progress |
| 4 | Maritime & physical computing | speed-and-position: PostGIS sailing telemetry |
| 5 | Craft at scale | Design systems at a billion-dollar e-commerce site: five things I wish we'd known earlier (genericized) |
| 6 | Sustainable practice | The five-year runway (the vulnerable meta-post) |

## Open decisions

- **StorckPhotos as platform**: experiment or commitment? Determines whether Month 3 cornerstone becomes a series.
- **Newsletter**: not before Q2 of the cadence. Revisit after cornerstone #3.
- **Pricing band on /work-with-me**: currently "rates on inquiry." Decide after 3–5 real conversations.
- **W3C Invited Expert status**: revisit after 3–4 published posts in the sustainable-web space.

## Key files and references

| What | Where |
|---|---|
| Blogging strategy (full doc) | `.claude/blogging-strategy.md` (local, gitignored) |
| Voice guide | `.claude/blogging-strategy.md` §5 + memory `feedback_writing_voice.md` |
| Stork-on-camera logo source | `assets/images/IMG_0110.PNG` (2100×2100, transparent bg after #72) |
| Custom skin (all visual overrides) | `assets/css/main.scss` |
| Theme overrides inventory | `_includes/head/custom.html`, `_includes/social-share.html`, `assets/css/main.scss` |
| PurgeCSS safelist | `purgecss.config.js` |
| Dark mode toggle JS | `_includes/head/custom.html` (inline script) |
| Fingerprinted CSS pipeline | `scripts/fingerprint-css.js` (post-build, runs on Netlify only) |
| Netlify config | `netlify.toml` |
| Dependabot grouping | `.github/dependabot.yml` |
