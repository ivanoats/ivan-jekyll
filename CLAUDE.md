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

There are no tests. `package.json` only pulls in `purgecss` (used by the `jekyll-purgecss` plugin, which is invoked automatically as part of the build via `purgecss.config.js`).

## Toolchain

- **Ruby**: `.tool-versions` specifies `3.4.2`, Netlify also pins `RUBY_VERSION = "3.4.2"` in `netlify.toml`. The Gemfile does *not* pin a Ruby version so newer Rubies work locally; gem resolution requires Ruby ≥ 3.2. Use `mise` (or asdf/rbenv) to match Netlify.
- **Node**: `.tool-versions` specifies `24.13.1`. Only needed for `purgecss`.
- **Jekyll**: 4.4.x. Theme: `minimal-mistakes-jekyll` 4.28.x.

## Architecture notes

A few non-obvious things that aren't visible from directory structure alone:

- **Markdown processor is kramdown, not commonmark.** `_config.yml` sets `markdown: kramdown` with GFM input. Do **not** re-add `jekyll-commonmark` — it pins an old `commonmarker` (Ruby < 4) and was removed because it was dead weight.
- **Most of the theme lives in the gem.** `_includes/`, `_layouts/`, `_sass/` are minimal in this repo because `minimal-mistakes-jekyll` ships them. The repo has three deliberate overrides:
  - `_includes/head/custom.html` — GA4 gtag, favicon/manifest links, light+dark `theme-color` meta tags.
  - `_includes/social-share.html` — shadows the theme's include to remove the hardcoded "Share on X" button. Keeps Facebook, LinkedIn, Bluesky. **When upgrading the theme, diff against the upstream include to pick up any new non-X share targets.**
  - `assets/css/main.scss` — custom "stork skin": overrides minimal-mistakes SCSS variables (palette pulled from the stork logo, serif display font stack) before importing the theme, plus a `@media (prefers-color-scheme: dark)` block for automatic dark mode. When tuning colors or adding dark-mode rules, this is the one file.

  When changing layout/styling, first check whether you need to override a theme file or create a new one — find the upstream file in `$(bundle show minimal-mistakes-jekyll)`.
- **Deployment is Netlify-only.** The `s3_website` gem and its config were removed. `netlify.toml` sets `command = "npm install && bundle exec jekyll build && node scripts/fingerprint-css.js"`, `publish = "_site"`, pins Ruby/Node versions, and applies security headers (HSTS with `includeSubDomains` but intentionally *not* `preload`; see commit `d23c414` for reasoning). Fingerprinted CSS (`/assets/css/main.<hash>.css`) gets a 1-year `immutable` cache; other assets get a 1-day cache.
- **Posts predate the site's move to Jekyll** — filenames span 2005–present. The `permalink: /:categories/:title/` in `_config.yml` means categories in post front matter become URL path segments, so renaming categories breaks links.
- **PurgeCSS runs at build time** via the `jekyll-purgecss` plugin, scanning `_site/**/*.html` against `_site/assets/css/main.css` and writing the purged CSS back to `_site/assets/css/` (configured via `css_dir: "assets/css"` in `_config.yml`). Only runs when `JEKYLL_ENV=production`. If CSS classes go missing after a build, check `purgecss.config.js` safelist.
- **CSS fingerprinting** runs as a post-build Node.js step (`scripts/fingerprint-css.js`) that computes an MD5 hash of the purged `main.css`, renames it to `main.<hash>.css`, updates all HTML references in `_site/`, and deletes the unhashed original. This runs after PurgeCSS (both are production-only). The script is invoked automatically by `rake build_prod` and the Netlify build command.

## Conventions

- `.rubocop.yml` is absent; rubocop runs with defaults. The only Ruby in-tree is the `Rakefile` — keep it warning-free when touching it.
- New blog posts go in `_posts/YYYY-MM-DD-slug.markdown` with front matter following existing examples.
