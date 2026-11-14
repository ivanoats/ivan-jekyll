---
layout: single
title: "The Greener Website Is Also the Cheaper, Faster One"
date: '2026-11-15 09:00:00'
excerpt: "Most of what makes a website lighter on the planet also makes it cheaper to run and faster to load. The evidence is stronger than you'd expect."
tags:
- sustainability
- web-sustainability-guidelines
- wsg-check
- performance
- e-commerce
---

When I talk to site owners about sustainability, I can usually see them doing the math. It sounds like a cost: another thing to pay a developer for, so the site can feel good about itself.

It works the other way. Most of what makes a website lighter on the planet also makes it cheaper to run, faster to load, and easier to buy from. The last two are where the money is.

The [Web Sustainability Guidelines](https://www.w3.org/TR/web-sustainability-guidelines/) (WSG) are a set of practices from the W3C, the body behind the standards every web browser follows. They cover how a site is designed, built, hosted, and run, much as the accessibility guidelines do for people with disabilities. The guidelines say plainly that using fewer resources "brings cost savings" and that faster pages mean "reduced cart abandonment in e-commerce." They don't attach numbers to those claims. Other people have measured them, and that's what this post is about.

## Smaller bills (the modest part)

Every time someone opens a page, your host sends them a pile of files: text, images, fonts, and scripts. You pay for that traffic, either directly or through the hosting plan you need to handle it. The [median home page on a phone now weighs about 2.6 megabytes](https://almanac.httparchive.org/en/2025/page-weight), according to the HTTP Archive's yearly survey of millions of sites. Images are the biggest share.

I'll be honest about the scale. At typical content-delivery rates of about [$0.085 per gigabyte](https://aws.amazon.com/cloudfront/pricing/pay-as-you-go/), a small business site with 50,000 page views a month spends around $10 on that traffic. Halving the page weight saves you $5. A shop with a million page views a month saves closer to $100 a month. That's real money, but not the reason to do this.

The bigger savings are less visible:

- **Fewer moving parts.** Each plugin, widget, and tracking script is something to pay for, update, and debug. The WSG asks you to treat third-party code with the same scrutiny as your own. Most sites I audit carry scripts nobody remembers adding.
- **A cheaper hosting plan.** Lighter pages and good caching mean the server does less work per visitor. That often means a smaller plan, or the same plan surviving a busy sale.
- **Less rework.** Sites built lean stay maintainable longer. That pushes back the expensive redesign that happens when a site becomes too slow and tangled to change.

## Faster pages sell more (the big part)

A lighter page is a faster page, and the evidence that speed affects sales is unusually strong. People don't wait. The BBC found it [lost an additional 10% of users for every additional second](https://web.dev/articles/why-speed-matters) its site took to load.

The best evidence comes from companies that tested it directly: two versions of the same page, identical except for speed, shown to different visitors.

| Who | What they changed | What happened |
| --- | --- | --- |
| [Rakuten 24](https://web.dev/case-studies/rakuten) | Sped up the home page, with design and features unchanged | 33% higher conversion rate; 53% more revenue per visitor |
| [Vodafone](https://web.dev/case-studies/vodafone) | Made a landing page's main content appear 31% sooner | 8% more sales |
| [Retail and travel brands](https://www.deloitte.com/ie/en/services/consulting/research/milliseconds-make-millions.html) (Deloitte, for Google) | Measured what a tenth of a second of mobile speed was worth | Retail conversions up 8.4%; average order value up 9.2% |

A tenth of a second is about the time it takes to blink.

Two caveats, because you'll hear them anyway. First, Google published or paid for much of this research, and Google benefits from a faster web. The Vodafone and Rakuten results come from proper A/B tests, though, and those are hard to argue with. Second, these are large companies. A small site won't see the same percentages. But the direction holds: nobody has found that a slower checkout sells more.

## Easier to use means more customers

The WSG isn't only about bytes. One guideline asks for "efficient and streamlined user journeys": fewer steps, fewer distractions, less to read before someone can do what they came to do. That's a sustainability practice because every extra page and pop-up uses energy. It's also plain good business.

Checkout is where this shows most clearly. The [Baymard Institute](https://baymard.com/lists/cart-abandonment-rate), which has spent years testing how people shop online, puts the average cart abandonment rate at about 70%. Some of that is people browsing or comparing prices, and no design will fix it. But Baymard estimates that a large online store can raise its conversion rate by about 35% through better checkout design alone — fewer form fields, clearer progress, less friction. The WSG's recommendation to streamline user journeys points at the same fixes.

The guidelines also overlap heavily with accessibility. Clear structure, readable text, and pages that work on older phones and slow connections help everyone. They matter most to the [more than 1 in 4 US adults who report a disability](https://www.cdc.gov/ncbddd/disabilityandhealth/features/disability-prevalence-rural-urban.html), according to the CDC. A site that's hard for them to use is turning away a large share of the market without knowing it.

## Easier to find

Google says its ranking systems use [Core Web Vitals](https://developers.google.com/search/docs/appearance/page-experience), its own measures of how quickly a page loads, how soon it responds, and whether things jump around while loading. A good score alone won't put you on page one. But when two pages are otherwise equally good, the one that's pleasant to use has the edge.

Clear structure helps search in a more direct way, too. The W3C's own [business case for accessibility](https://www.w3.org/WAI/business-case/) cites *This American Life*, whose search traffic rose almost 7% after it published text transcripts of its episodes. Content that people can read is content that search engines can index.

## Where to start

You don't need to read all 93 guidelines. Here are five changes that pay for themselves on most sites, and that you can ask your developer or agency for by name:

1. **Right-size your images** (WSG 2.9). Photos straight off a camera or phone are often ten times bigger than the screen needs. Modern formats and correct sizes are usually the single biggest win.
2. **Audit third-party scripts** (WSG 3.5). List every tracking pixel, chat widget, and plugin. Remove the ones nobody uses, and ask what each of the rest earns.
3. **Load fewer fonts** (WSG 2.11). Two typefaces in a couple of weights is plenty. Every extra weight is another file to download before your text looks right.
4. **Shorten the path to purchase** (WSG 2.4). Count the steps from landing page to confirmation and the fields on each form, then cut one of each.
5. **Let browsers remember** (WSG 4.2). Good caching means a returning visitor's browser reuses files instead of downloading them again. A repeat visit should cost a fraction of the first. If you're starting a new site or redesigning one, consider building on a design system that makes these choices by default — [Verdant](https://verdant-design.org) is one we built for exactly that.

If you'd like to know where your site stands, [WSG-Check](https://wsg-check.com) is free and needs no account. Give it a URL and it scores the site against the guidelines and lists what to fix first. If the result surprises you, or you'd like someone to go through it with you, that's what [Sustainable Websites](https://sustainablewebsites.com) does.

I'd like to hear what you find.
