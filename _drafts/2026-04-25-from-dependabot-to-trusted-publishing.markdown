---
layout: single
title: The dependabot cleanup that shipped the package
date: '2026-04-25 12:00:00'
tags:
- npm
- trusted-publishing
- dependabot
- release-please
- web-sustainability
---

<!-- borrow: Pollan — curious amateur, named what I didn't know going in -->
<!-- carries: make-labor-visible | slow-knowledge | little-guy-advocacy -->

What I thought was a one-hour cleanup took four days. The original ask was small: fifteen dependabot pull requests had piled up on `wsg-check`, and I wanted to know whether to merge them in one batch or several. Phased approach, I figured. Maybe an evening's work.

Four days later, I had published the package to npm for the first time, on the third attempt, with three failure modes and the corresponding fixes documented in a runbook. None of the failures were anywhere on my map when I started. Each one was the npm registry teaching me what some layer of the release pipeline was actually for.

This is a post about that, and about why I think the dependency-cleanup question was secretly the right place to start, even though I didn't know that yet.

## The cleanup, briefly

The dependabot pile is the part I'd planned for. Fifteen PRs against `wsg-check`, a Web Sustainability Guidelines checker I've been building, split between production deps, dev deps, and GitHub Actions. The right call turned out to be three phases, not one mega-PR or fifteen merges:

- Phase 1: ten patch and minor bumps batched into [#125](https://github.com/ivanoats/wsg-check/pull/125). Merging dependabot branches sequentially with `git merge --no-ff` and letting the lockfile auto-resolve. Ten minutes once I knew the rhythm.
- Phase 2: three higher-risk bumps (Next.js 16.1 → 16.2, axios 1.13 → 1.15, `@tgwf/co2` 0.17 → 0.18) shipped individually so any breakage stayed bisectable.
- Phase 3: two GitHub Actions majors (`codecov-action` v5→v6, `upload-artifact` v6→v7), CI-only, low blast radius.

I also added a `groups:` block to `.github/dependabot.yml` ([#128](https://github.com/ivanoats/wsg-check/pull/128)) so future weeks open one PR per ecosystem instead of fifteen. That part went exactly to plan. It's the only part that did.

## The thing I didn't know I was looking at

After the cleanup landed, I noticed a stale commit in the log: `feat: publish wsg-check CLI to npm (#123)`. The commit added `tsup`, a `bin` entry, a `publish.yml` workflow on `release: published`, and a license file. Everything you'd need to publish.

`npm view wsg-check` returned 404. The package had never actually shipped.

I had been assuming the package was a thing in the world. It was a thing in the repo. The repo had the apparatus for it to be a thing in the world. But nothing had ever pushed the button.

So I tried to push the button.

## Failure one — wrong kind of token

The first attempt was simple. I added an `NPM_TOKEN` secret, cut a release on `v0.1.0`, watched the workflow run, watched it fail.

```
npm error code EOTP
npm error This operation requires a one-time password from your authenticator.
```

The token was a "Publish" token. Those still require interactive 2FA on every use. For CI you want an "Automation" token, which bypasses 2FA specifically for non-interactive contexts. I didn't know npm distinguished. The warning npm shows when you generate an Automation token (*"there are security risks with this option, please use Trusted Publishing instead"*) was pointing at a real alternative I should have reached for first. I missed it.

We did the swap. The next attempt failed differently.

## Failure two — name too similar

```
403 Forbidden — Package name too similar to existing package es-check;
try renaming your package to '@ivanoats/wsg-check' and publishing with
'npm publish --access=public' instead
```

I had no idea npm ran a name-similarity filter. The neighboring package, `es-check`, an ECMAScript syntax checker, had been on the registry for years. I had not searched for it before claiming the name. The npm error was unusually helpful: it told me exactly how to fix it (scope the package) and even gave the example command.

We scoped to `@sustainablewebsites/wsg-check`, an org I'd registered years ago for a different sustainability project. The CLI binary name stayed `wsg-check` (that's the `bin` field, separate from the package name), so the install line is `npm i -g @sustainablewebsites/wsg-check` but the command people actually run is unchanged.

The third attempt published.

## Failure three — the most instructive one

The third attempt ran under Trusted Publishing, npm's OIDC-based replacement for tokens entirely. With Trusted Publishing, the npm registry is configured to trust GitHub Actions OIDC tokens that match a specific repo plus workflow filename. There's no token to leak, no secret to rotate.

The failure looked like this:

```
npm notice publish Signed provenance statement with source and build information from GitHub Actions
npm notice publish Provenance statement published to transparency log:
  https://search.sigstore.dev/?logIndex=1355869797
npm error code E404
npm error 404 Not Found - PUT https://registry.npmjs.org/@sustainablewebsites%2fwsg-check
```

The provenance signed. The publish 404'd. Those are different code paths in the npm CLI, and the split is what turned out to be diagnostic. OIDC token generation worked (it had to, for sigstore), but the npm registry didn't accept the token for the actual publish.

The reason: npm's OIDC-to-publish-token exchange ships in npm 11.5.1+. Our `publish.yml` was on Node 22, which bundles npm 10.x. Provenance signing uses different machinery than registry auth. The fix was a one-line bump to `node-version: '24'`.

I had been running OIDC publishes against an npm version that didn't know how to redeem an OIDC token. The 404 wasn't the registry rejecting an unauthorized request. It was the registry seeing an unauthenticated request and hiding the existence of the scope, the way scoped packages do for cold callers. *On scoped packages, "404 Not Found" is npm's polite phrasing for "I don't know who you are."*

## What I'm still not sure about

A few things, honestly.

`workflow_dispatch:` may not be the right long-term answer. I added it to `publish.yml` because GitHub's anti-loop policy means `GITHUB_TOKEN`-created releases (the kind release-please cuts) don't trigger downstream workflows. The clean fix is a Personal Access Token; the simple fix is one manual click per release. I picked simple. Whether that holds up depends on whether release frequency goes up enough to make the click feel like friction.

Then there's the name-similarity filter. npm's policy is opaque to me, and I can imagine appealing for an unscoped name, but I have no sense of how long that takes or how often it works. So I scoped, and I don't know whether that was the only path through.

And there are probably other ambient assumptions in this release machinery I haven't found yet. I caught these three because they failed loudly. Soft failures, like a published package with broken provenance, would have been harder to notice.

## What the cleanup question was actually asking

The original question (*can we consolidate the dependabot PRs?*) sounded like a hygiene task. It surfaced an unfinished launch. The deeper pattern: dependency-cleanup questions are often the cheapest entry point to noticing what else has drifted. Fifteen open PRs is a signal. So is "we built the publishing infrastructure but never shipped." So is a `CHANGELOG.md` that hasn't been updated in months, which is what set up the release-please conversation that came after the publish saga.

None of the work that ended up mattering most this week (Trusted Publishing, release-please, the `RELEASING.md` runbook) was on the original ticket. All of it was load-bearing.

This pipeline was assembled on the shoulders of named projects: [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers) (the npm CLI team), [sigstore](https://www.sigstore.dev/) (the OpenSSF project that signs the provenance), GitHub Actions OIDC (the GitHub identity team), [release-please](https://github.com/googleapis/release-please) (originally Google APIs, now community-maintained), and dependabot (now part of GitHub). None of it is infrastructure I built. All of it is infrastructure I'm leaning on.

## What you can do next

If you're about to publish your first npm package, three things from this session that would have saved me a day:

1. Use Trusted Publishing from the start. Configure it on your npm account before you cut the first release, even if the package name doesn't exist yet — npm allows pre-registration. Skip the Automation-token detour entirely.
2. Search npm for similar names first. Run `npm search <yourname>` and check what comes back. If anything's within edit-distance two of yours, scope it to your org or user from the start.
3. Pin `setup-node` to Node 24 specifically for the publish workflow. The OIDC exchange isn't in earlier bundled npm versions, and the failure mode is a misleading 404.

The full runbook lives at [`RELEASING.md`](https://github.com/ivanoats/wsg-check/blob/main/RELEASING.md) in the repo. It's written for the next person who has to debug this. Most likely future me.
