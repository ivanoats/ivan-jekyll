# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Ivan Storck's personal homepage and blog — a Jekyll static site built on the `minimal-mistakes-jekyll` theme, deployed via Netlify. Content is a mix of a short bio (`about.md`, `index.md`) and ~65 blog posts in `_posts/`.

## Commands

```bash
bundle install              # install Ruby deps
bundle exec jekyll serve    # local dev server with auto-regen (or: bundle exec rake serve)
bundle exec jekyll build    # one-shot build → _site/ (or: bundle exec rake build_prod for JEKYLL_ENV=production)
bundle exec jekyll clean    # clear _site + caches (or: bundle exec rake clean)
bundle exec rubocop         # lint the Ruby plugin code
```

There are no tests. `package.json` pulls in the Verdant design system package (see below) and `purgecss` (used by the `jekyll-purgecss` plugin, which is invoked automatically as part of the build via `purgecss.config.js`).

## Toolchain

- **Ruby**: `.tool-versions` specifies `3.4.2`, Netlify also pins `RUBY_VERSION = "3.4.2"` in `netlify.toml`. The Gemfile does *not* pin a Ruby version so newer Rubies work locally; gem resolution requires Ruby ≥ 3.2. Use `mise` (or asdf/rbenv) to match Netlify.
- **Node**: `.tool-versions` specifies `24.13.1`. Needed for `purgecss` and for regenerating Verdant tokens (`npm run verdant`).
- **Jekyll**: 4.4.x. Theme: `minimal-mistakes-jekyll` 4.28.x.

## Architecture notes

A few non-obvious things that aren't visible from directory structure alone:

- **Markdown processor is kramdown, not commonmark.** `_config.yml` sets `markdown: kramdown` with GFM input. Do **not** re-add `jekyll-commonmark` — it pins an old `commonmarker` (Ruby < 4) and was removed because it was dead weight.
- **Most of the theme lives in the gem.** `_includes/`, `_layouts/`, `_sass/` are minimal in this repo because `minimal-mistakes-jekyll` ships them. The repo has these deliberate overrides:
  - `_includes/head/custom.html` — Verdant theme runtime (`assets/js/verdant-theme-toggle.js`, loaded synchronously, plus a one-off migration of the old `theme` localStorage key), GA4 gtag, favicon/manifest links, light+dark `theme-color` meta tags.
  - `_includes/footer/custom.html` — the System/Light/Dark theme radio group (`name="theme-preference"`) that the Verdant runtime keeps in sync.
  - `_includes/social-share.html` — shadows the theme's include to remove the hardcoded "Share on X" button. Keeps Facebook, LinkedIn, Bluesky. **When upgrading the theme, diff against the upstream include to pick up any new non-X share targets.**
  - `assets/css/main.scss` — the "Verdant skin": sets minimal-mistakes SCSS variables from Verdant's light tokens before importing the theme, then re-points the visible theme at Verdant's `--colors-*` custom properties so one rule set covers light, dark (`prefers-color-scheme` or `html[data-theme-override]`) and `prefers-contrast: more`. When tuning styling, this is the one file; use `c(token-name)` for colours, never hex values.

  When changing layout/styling, first check whether you need to override a theme file or create a new one — find the upstream file in `$(bundle show minimal-mistakes-jekyll)`.
- **Design tokens come from the Verdant design system.** `@sustainablewebsites/verdant-design` (npm, pinned exactly; source in `ivanoats/verdant-wsg-demo`) is a PandaCSS preset, but this site doesn't run Panda: `scripts/verdant-tokens.mjs` (`npm run verdant`) reads the package's token/theme modules and writes `_sass/verdant/_tokens.scss` plus `assets/js/verdant-theme-toggle.js`. Both outputs are committed so `jekyll serve` works without Node, and the Netlify build regenerates them. To change colours or tokens, change them in Verdant and bump the package; don't hand-edit the generated files. `.npmrc` sets `legacy-peer-deps` so npm doesn't install Panda (the package's peer dependency) just to read tokens.
- **Deployment is Netlify-only.** The `s3_website` gem and its config were removed. `netlify.toml` sets `command = "npm install && npm run verdant && bundle exec jekyll build && node scripts/fingerprint-css.js"`, `publish = "_site"`, pins Ruby/Node versions, and applies security headers (HSTS with `includeSubDomains` but intentionally *not* `preload`; see commit `d23c414` for reasoning). Fingerprinted CSS (`/assets/css/main.<hash>.css`) gets a 1-year `immutable` cache; other assets get a 1-day cache.
- **Posts predate the site's move to Jekyll** — filenames span 2005–present. The `permalink: /:categories/:title/` in `_config.yml` means categories in post front matter become URL path segments, so renaming categories breaks links.
- **PurgeCSS runs at build time** via the `jekyll-purgecss` plugin, scanning `_site/**/*.html` against `_site/assets/css/main.css` and writing the purged CSS back to `_site/assets/css/` (configured via `css_dir: "assets/css"` in `_config.yml`). Only runs when `JEKYLL_ENV=production`. If CSS classes go missing after a build, check `purgecss.config.js` safelist. Attributes set only at runtime (the Verdant theme's `data-theme-override`/`data-theme-resolved`) must be listed in its `dynamicAttributes`, or PurgeCSS drops every selector that uses them.
- **CSS fingerprinting** runs as a post-build Node.js step (`scripts/fingerprint-css.js`) that computes a SHA-256 hash of the purged `main.css`, uses a 12-character hexadecimal prefix in the `main.<hash>.css` filename, updates all HTML references in `_site/`, and deletes the unhashed original. This runs after PurgeCSS (both are production-only). The script is invoked automatically by `rake build_prod` and the Netlify build command.

## Conventions

- `.rubocop.yml` is absent; rubocop runs with defaults. The only Ruby in-tree is the `Rakefile` — keep it warning-free when touching it.
- New blog posts go in `_posts/YYYY-MM-DD-slug.markdown` with front matter following existing examples.
