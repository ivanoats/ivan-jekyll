---
layout: single
title: "Seattle trash pickup, in the calendar you already use"
date: '2026-11-09 12:00:00 -0800'
published: false
excerpt: "A small app for Seattle neighbors: a recycling-week answer, an optional remembered address, an offline pickup calendar, and a raccoon named Jimothy."
tags:
- seattle
- app-of-the-day
- typescript
- software-architecture
- sustainable-web-design
---

<!-- carries: values=care-ethics, stewardship | audience=Seattle neighbors and community-tool maintainers | structure=specific artifacts and decisions -->

I always forget which week is recycling. Looking it up in Seattle's app or website takes longer than I want to spend answering that question.

My calendar is already on my phone, and it's available offline. Why not put the pickup dates there?

Today's app of the day is [Seattle Trash Calendar](https://seattle-trash-calendar.ivanstorck.workers.dev). Enter your address and select your service location to see whether recycling is scheduled this week, along with the next pickup date. You can also preview the collection dates and download an iCalendar file, choosing which services to include before importing it into your calendar.

I built it with Codex to solve that small, recurring annoyance, and wanted to share it with my Seattle neighbors. Once the dates are imported into my phone's calendar, I can check whether it's recycling week without opening Seattle's website or needing a connection.

## Start with the address

Seattle already provides an [address-based collection calendar](https://myutilities.seattle.gov/eportal/#/accountlookup/calendar). The city does the difficult work of knowing which services collect from which locations, and when. My app brings those dates into a downloadable format.

An early option was to ask residents to look up their collection day, then enter a weekday and a recycling date into the app. Direct address lookup was essential to me. Asking someone to move the information by hand would leave too much of the work with them.

We considered Playwright to operate the city's portal through a simulated browser. The implementation ultimately uses the same guest endpoints that power Seattle's lookup, so production doesn't need a running browser. Playwright became part of the test suite instead.

That integration has a boundary worth being clear about: the endpoints are undocumented. Seattle can change them. The app validates the responses and offers a route back to the city's lookup when it cannot produce a usable schedule. This is an independent community project.

## Answer the question first

Before writing this up, I realized the app could answer the question that brought me here: is it recycling week?

The homepage now puts that answer ahead of the calendar download. It says when recycling is scheduled for today or later this week and shows the next date. If Seattle returns a date from earlier in the week, it says recycling *was scheduled* for that date. A schedule can't tell us whether the truck actually came.

“This week” means Monday through Sunday in Seattle time, with the date range shown beside the answer. If Seattle only returns future dates, the app describes the rest of the week instead of guessing whether there was an earlier pickup. That wording took a little care. A confident yes or no would be less useful if it answered a different question from the one a neighbor meant.

There's also an unchecked **Remember this address on this device** option. Opt in and the app saves the selected service address and location identifier in this browser. When you return, it fetches a fresh schedule automatically. You can change the address or forget the saved one. Remembering a new address replaces the old preference; changing a lookup alone leaves it saved.

That saves another search without introducing accounts or a server-side address book. It also means someone else using the same browser can see the saved address, so the option belongs on a device you trust. If browser storage is unavailable, lookup and calendar download still work.

The homepage answer needs a connection. The imported phone calendar is still how I check offline. Both start with the same collection dates.

## Small enough to understand later

I wanted TypeScript, roughly 80% test coverage, hexagonal architecture, linting, and written architecture decisions from the start.

Hexagonal architecture has a practical meaning here. The rules for collection dates live separately from the code that talks to Seattle, writes an iCalendar file, or handles an HTTP request. A small interface connects the lookup use case to its schedule provider. An ESLint rule checks that the domain doesn't import the outer layers.

That separation lets the tests supply synthetic schedules without querying residents' accounts. It also lets a Node.js server run the app locally while a Cloudflare Worker handles production requests. The calendar rules stay the same.

The [architecture document](https://github.com/ivanoats/seattle-trash-calendar/blob/main/docs/architecture.md) describes those boundaries. An [architecture decision log](https://github.com/ivanoats/seattle-trash-calendar/blob/main/docs/adl.md) points to the decisions and their reasoning. Future me should be able to find out why something exists before changing it.

The checks concentrate on mistakes that would matter to a resident. An all-day pickup must stay on the right date. A new address search must clear an old result. Week boundaries must follow Seattle time, even if someone checks while traveling. A remembered address must trigger a fresh lookup, and forgetting it must remove the local preference. The downloaded file must parse as a calendar. The interface must work at mobile widths and with accessible controls.

CI enforces at least 80% coverage across statements, branches, functions, and lines for the domain, application, and API/calendar adapters. Playwright covers browser behavior, with axe accessibility checks and an independent iCalendar parser checking downloads. Thin runtime entry points sit outside the unit coverage denominator. The distinction matters when reading a coverage number.

Changes go through pull requests. Successful checks on main trigger deployment to Cloudflare.

## Sustainable design in the requests and bytes

The interface uses my [Verdant Design System](https://verdant-design.org), with system fonts, semantic colors, and system, light, and dark theme options. The bin illustrations are CSS.

Several choices reduce the work needed to deliver the app. The frontend is static. An explicit search contacts Seattle, as does returning with an address you've opted to remember. Typing an address doesn't send requests. The calendar file is generated in the browser. There is no application database or subscription service to operate.

The server doesn't keep an address book. The optional browser preference contains the service address and location identifier, without a cached schedule or guest token. Guest tokens and account identifiers stay in server request memory, and application code doesn't log addresses or schedule bodies. Cloudflare may still retain platform-level traffic metadata, so that isn't a claim that using the site leaves no trace.

I chose Cloudflare Workers with static assets because that matches the small fetch-based API and static interface. Node.js remains the development and CI toolchain. The [hosting ADR](https://github.com/ivanoats/seattle-trash-calendar/blob/main/docs/adr/0003-hosting.md) records the comparison with Netlify.

These are specific choices toward a more sustainable web. I haven't measured this app's carbon footprint. What I can point to is fewer requests while typing, no downloaded font family, and no server-side browser needed for each lookup.

## Room for Jimothy

<figure>
  <img src="{{ '/assets/images/seattle-trash-jimothy.webp' | relative_url }}" width="480" height="404" loading="lazy" decoding="async" alt="Jimothy, a round gray raccoon with a striped tail, black paws, and a small leaf beside him.">
  <figcaption>Jimothy, keeping an eye on the bins.</figcaption>
</figure>

I wanted a cute graphic of [Jimothy](https://en.wikipedia.org/wiki/Jimothy) on the site. We generated an illustration from the reference I supplied, preserving his round silhouette, masked face, and striped tail.

The transparent WebP is about 20 KB. It has descriptive alternative text and explicit dimensions to reserve its space while loading. He sits beside the bins on desktop and alongside the introduction on mobile, in both light and dark themes.

A little character was worth those bytes to me. This is a neighborhood utility, and I'm pleased Jimothy has a place in it.

## Take a copy, know its limits

The download is a snapshot, not a subscription. It contains the dates Seattle returns, without inventing a recurrence pattern or holiday adjustments. If the schedule changes afterward, the imported file won't update itself.

Importing into a separate calendar makes it easier to remove and replace the dates later. Repeated imports can create duplicates in some calendar apps. Seattle also says its collection calendar doesn't reflect weather delays; check [SPU service updates](https://atyourservice.seattle.gov/) when conditions disrupt pickup.

[Try Seattle Trash Calendar](https://seattle-trash-calendar.ivanstorck.workers.dev), or [read the code and decisions on GitHub](https://github.com/ivanoats/seattle-trash-calendar). The repository is public; a source-code license hasn't been selected yet.

If you're in Seattle, I'd like to hear whether it helps and where it gets in your way. That's the next useful thing to learn.
