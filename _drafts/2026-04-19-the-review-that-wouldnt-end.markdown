---
layout: single
title: The review that wouldn't end
date: '2026-04-19 15:00:00'
tags:
- ai-code-review
- stripe
- security
- testing
---

<!-- borrow: Gladwell cold open — the specific broken moment as entry point -->
<!-- carries: make-labor-visible | little-guy-advocacy (solo dev trusting AI reviewers) -->

Five CI checks failed at once. The error, buried under Netlify deploy logs and GitHub Actions output: `Namespace 'Stripe' has no exported member 'LatestApiVersion'`. A type that doesn't exist in the Stripe SDK, introduced by a Copilot suggestion I'd approved with one click on GitHub's web UI.

That approval kicked off what became a week of merging, reviewing, fixing, and re-reviewing a print shop PR for my photography portfolio site. Three AI reviewers left comments. Two were wrong about the same thing. One was wrong about something different. And scattered among the false positives were real security holes that I would have shipped to production.

## The setup

I'm rebuilding StorckPhotos.com from WordPress to Next.js. The site sells prints of Pacific Northwest photography: aerial shots, coastal panoramas, that kind of thing. PR #20 added the whole commerce layer. A cart with localStorage persistence, Stripe checkout, and a Printful fulfillment adapter behind a hexagonal architecture so I can swap providers later.

The PR sat open for two weeks while I worked on SEO and dependency updates. By the time I got back to it, main had diverged enough to need a real merge. And the AI reviewers, GitHub Copilot and Google's Gemini, had each left a round of comments.

## Sorting signal from noise

Between Copilot and Gemini, I had seventeen inline comments across five files. Here's what I found when I actually read them.

Seven were about things already fixed. The original author had addressed server-side pricing, absolute image URLs, the Stripe metadata 500-char limit, idempotent webhooks, and the `getPrintPrice` error path. The reviewers were commenting on the first commit and hadn't noticed the subsequent fixes. This is the most common AI reviewer failure mode: it reads the diff, not the final state.

Six were genuinely useful, and these are the ones that kept me up. Per-item input validation was missing. A client could submit arbitrary sizes, materials, and image paths. The checkout route trusted a client-controlled `Origin` header for Stripe redirect URLs. The webhook didn't validate line item metadata before sending orders to Printful. The cart hydrated `cartItemId` from localStorage without recomputing it, which could produce ghost items. I would have shipped all of them.

Three were wrong. Copilot said `collected_information.shipping_details` was "not the common location" for shipping data and suggested falling back to `session.shipping_details`. In Stripe SDK v22, `collected_information` is the correct field. The old one is deprecated. Two reviewers flagged the same non-issue. And one comment suggested `Stripe.LatestApiVersion` as a type-safe cast, a type the SDK doesn't export.

One was noise. "Consider adding unit tests for `getPrintPrice`." I'd already added them in the previous commit.

That's a 35% signal rate. Not great for a human reviewer. Perfectly useful for a free, automated first pass that runs in seconds.

## What the security fixes actually looked like

The input validation comment was the one that mattered most. Before the fix, the checkout route accepted whatever the client sent: any string for size, any number for quantity, any URL for the product image. A motivated attacker could have created Stripe checkout sessions with $0 line items or pointed the fulfillment image URL at an internal network address.

The fix was a validation function that checks size and material against the actual pricing table, bounds quantity to 1-100, and restricts image paths to the `/images/` prefix. Twenty lines of code. The kind of thing a human reviewer would catch in thirty seconds, and that I missed because I was focused on the architecture.

The redirect URL fix was simpler but sneakier. The original code read the `Origin` header from the request to build Stripe's `success_url` and `cancel_url`. An attacker calling the endpoint directly could set that header to their own domain and get Stripe to redirect paying customers there after checkout. The fix: use the configured `NEXT_PUBLIC_SITE_URL` from the server environment. Never the request.

## What I'm still not sure about

I don't know the right workflow for AI code review yet. Approving Copilot's suggestion through GitHub's web UI, the one that introduced the nonexistent `Stripe.LatestApiVersion`, was a two-second action that cost me a failed deploy and a debugging round. The friction of reviewing a suggestion should be proportional to the risk of applying it. Right now the friction is zero in both directions.

I also don't know how to handle the false positive rate. Seven comments about things that were already fixed is time I spent re-reading code to confirm it was fine. For a solo developer on a portfolio site, that's fifteen minutes. For a team with twenty PRs a week, it's a different calculation entirely.

## The labor behind the review

I keep thinking about who did the work here. Three AI systems left comments. I read every one. I checked each claim against the code, the Stripe SDK types, the API changelog. When a comment was right, I wrote the fix. When it was wrong, I had to know enough to dismiss it. The reviewers generated the list. A person did the thinking.

I think that's roughly where AI code review is right now. The tools find things you'd miss. Real things, in production-bound code, that would have cost money or exposed users. They also find things that aren't there. The skill isn't in having the tools. It's in knowing which output to trust. That knowledge comes from the same place it always has: writing the code, reading the docs, sitting with the errors long enough to recognize when something is actually wrong.

I wrote 36 tests this week to cover the shop code that shipped without any. That's the part that made the PR ready to merge. Not the AI comments. The tests.

## If you're shipping a Stripe integration

The PR is public: [ivanoats/StorckPhotos#20](https://github.com/ivanoats/StorckPhotos/pull/20). If you're building something similar, look at the input validation in `src/app/api/checkout/route.ts` and the idempotent webhook handling in `src/app/api/webhooks/stripe/route.ts`. The hexagonal fulfillment pattern in `src/lib/fulfillment/` is worth stealing if you think you might switch providers later.

If you've found a better workflow for triaging AI review comments at scale, I'd like to hear about it.
