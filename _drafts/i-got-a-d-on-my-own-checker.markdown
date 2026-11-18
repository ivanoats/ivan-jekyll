---
layout: single
title: "I Ran My Own Sustainability Checker on My Site and Got a D"
date: '2026-11-20 09:00:00'
excerpt: "wsg-check gave ivanstorck.com 56 out of 100. Some of the problem was my site. Most of it was the checker."
tags:
- sustainability
- web-sustainability-guidelines
- wsg-check
- performance
---

<!-- DRAFT: numbers measured on the live site 2026-11-16, after ivan-jekyll #93-#95
     merged. Row 4 used the wsg-check #269 branch; re-run with the published release
     before posting. -->

I build [wsg-check](https://wsg-check.com), a tool that grades websites against the [W3C Web Sustainability Guidelines](https://www.w3.org/TR/web-sustainability-guidelines/). I also run a consulting practice that tells people how to make their sites lighter. So it seemed fair to point the checker at my own site before anyone else did.

It scored 56 out of 100. A D.

## What the D was made of

Thirty-three checks: 13 passed, 6 failed, 10 warned, and 4 didn't apply. The failures sorted into two piles, and the second pile was the more interesting one.

**Things that were wrong with my site:**

- **Every icon in Font Awesome, from a CDN, unpinned.** The theme loads the whole icon library from jsDelivr at `@latest`, plus its webfonts, to draw fifteen icons. I replaced it with those fifteen icons inlined as CSS masks: no third-party request and no version I don't control.
- **A 255 KB hero photo for every device.** The same 1752-pixel JPEG went to phones and desktops. It's now a `<picture>` with AVIF and WebP and a proper `srcset`. On a phone, the hero is 18 KB.
- **A render-blocking script.** The theme's JavaScript sat at the end of the page but could still block the parser. It's deferred now.
- **No Content-Security-Policy, no `security.txt`, no `humans.txt`.** All three are small, and none were there.

**Things that were wrong with my checker:**

- **It said my site wasn't compressed.** It was, with Brotli. An older release lost the `Content-Encoding` header after decompressing the response. That was fixed on `main` weeks ago.
- **It said my DOCTYPE was `<!!DOCTYPE html>`.** The parser added the second `!`. Also fixed on `main`.
- **It said I had no sitemap.** `robots.txt` declares one. Fixed on `main` too.
- **It failed my HTML for a zero-second cache.** `max-age=0, must-revalidate` with an ETag is the right setting for HTML when CSS and JS have content hashes in their filenames. A repeat visit costs a 304 with no body. The check's own advice recommended exactly this, then failed it.
- **It wanted `autocomplete` and `inputmode` on radio buttons.** My only form is a light/dark theme switcher. Neither attribute does anything on a radio button.
- **It ignored `<picture>`.** It looked only at the JPEG fallback, so the AVIF version I'd just added didn't count.
- **It wanted my hero image lazy-loaded.** The hero is the first thing on the page, and I'd marked it `fetchpriority="high"`. Lazy-loading it would make the page slower.

And one that was neither the site nor the code: **three of those fixes were already on `main`, but npm still served the old version.** I'd tagged v0.6.3 and v0.7.0 and never run the publish step, which is manual. Anyone running `npx @sustainablewebsites/wsg-check` got the bugs.

## The scores, in order

| What changed | Score |
|---|---|
| Published checker (v0.6.2), site as it was | 56 (D) |
| Unreleased checker on `main`, same site | 66 (C) |
| Checker with the four new fixes, same site | 69 (C) |
| Fixed checker, fixed site | 76 (B) |

Thirteen of the twenty points came from fixing the checker, not the site. That's the part I'd want a client to know about any tool I point at their work, mine included: a score is a claim, and every claim is worth checking.

## What's still keeping it from an A

- **Hosting.** Netlify isn't in the Green Web Foundation's dataset of renewably powered hosts. That's a real finding, and it's mine to decide on.
- **Google Analytics.** The last third-party script. I need to decide whether the numbers are worth it.
- **A theme script that blocks rendering on purpose.** It applies your light or dark preference before the first paint, so the page doesn't flash the wrong colors. I'll take that trade.
- **No `carbon.txt` yet.** The format asks for a public disclosure to link to. This post may end up being that disclosure.
- **Smaller things:** unminified HTML, no breadcrumbs, and a logo without width and height.

If you run [wsg-check](https://wsg-check.com) on your own site and the score surprises you, in either direction, I'd like to hear about it. If you think the checker got something wrong, I'd like to hear that even more.
