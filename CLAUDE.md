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
- **Most of the theme lives in the gem.** `_includes/`, `_layouts/`, `_sass/` are minimal in this repo because `minimal-mistakes-jekyll` ships them. The repo only contains overrides: `_includes/head.html`, `_includes/head/`, `_includes/page__hero.html`. When changing layout/styling, first check whether you're overriding a theme file or need to create a new override — find the upstream file in `$(bundle show minimal-mistakes-jekyll)`.
- **`_plugins/growl_generator.rb`** is a local Jekyll plugin that fires macOS Growl notifications on build start/finish. Growl is effectively abandoned on modern macOS; treat this as legacy and don't rely on it. It monkey-patches `Jekyll::Site#process`.
- **Deployment is Netlify-only.** The `s3_website` gem and its config were removed — if you see references in old docs (e.g. `UPGRADE_NOTES.md`), they're stale.
- **Posts predate the site's move to Jekyll** — filenames span 2005–present. The `permalink: /:categories/:title/` in `_config.yml` means categories in post front matter become URL path segments, so renaming categories breaks links.
- **PurgeCSS runs at build time** via the `jekyll-purgecss` plugin, scanning `_site/**/*.html` against `_site/assets/css/site.css`. If CSS classes go missing after a build, check `purgecss.config.js` safelist.

## Conventions

- `.rubocop.yml` is absent; rubocop runs with defaults. The only Ruby in-tree is `Rakefile` + `_plugins/growl_generator.rb`, both kept warning-free — preserve that when touching them.
- New blog posts go in `_posts/YYYY-MM-DD-slug.markdown` with front matter following existing examples.
