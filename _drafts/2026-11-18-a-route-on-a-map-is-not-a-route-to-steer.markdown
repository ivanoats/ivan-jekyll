---
layout: single
title: "Planning a Salish Sea Cruise, One Day at a Time"
date: '2026-11-18 09:00:00'
excerpt: "A starting itinerary, wind trade-offs, and tidal-pass timing for a Salish Sea cruise. What the planner helps with, what it leaves to the skipper, and what I learned building it."
tags:
- salish-sea
- maps
- sailing
- side-projects
---

The [Salish Sea Ferry Map](https://salishseaferrymap.com) puts the region's ferry routes in one place. I wanted help with a different question for my own time on the water: where could I go with a few days available, without turning every day into a long passage?

That question turned into [Salish Sea Route Planner](https://github.com/ivanoats/salish-nav-planner). Pick a starting harbor, choose the first night's stop and how many days you have, and it suggests the rest of the itinerary. I wanted a starting point I could change, with enough information alongside it to decide whether the trip made sense.

## What it helps you do

### Find a trip that fits the time you have

The planner works in hours underway rather than just miles. Set a minimum and maximum day length, your boat's cruising speed, and a trip of one to seven days. It suggests stops that fit the window. Change the speed and it replans the reachable destinations; it doesn't just recalculate the arrival times.

You can ask for a round trip, name a different final harbor, or leave the end open. That makes it useful for comparing a weekend loop with a one-way trip, or seeing what a shorter day underway does to your options.

### Change the stops without rebuilding the whole plan

You can cycle through alternative stops or pin a destination you want to visit. Pinning a day resets the automatically chosen days after it, because those choices depended on where you were coming from. A pinned stop outside your preferred day-length window stays in the plan, but gets flagged.

That's useful when there's one place you really want to go and the rest is negotiable. You can also copy a link containing the settings and chosen stops, so someone else can look at the same itinerary rather than trying to reconstruct it from a screenshot.

### See the wind trade-off before committing to a destination

For a sailor, the same distance can mean very different days. A reach toward the next harbor and a beat into the wind aren't interchangeable just because the mileage is the same. A powerboat cruiser has reasons to care about wind on the nose, too.

Each day shows forecast wind direction, sustained speed and gusts, and the point of sail relative to the day's heading. Turn on **Let the forecast shape the plan** and wind becomes part of how destinations are ranked. A long day into strong headwinds gets a worse score than it would in lighter conditions or with the wind from another direction. Leave it off and you can inspect the forecast without letting it move your stops.

It **cannot plan your tacks for you**. The line on the map is a passage-planning track, not a series of sailing maneuvers. The planner doesn't model your boat's sailing performance at different wind angles or work out where to tack. Its travel-time estimates use published mileage and the cruising speed you enter; a wind penalty changes the ranking, not the time calculation.

If you have to tack, you'll travel farther, and your progress toward the destination may be slower. That also changes when you reach a tidal pass. The benefit is seeing a reason to reconsider a destination early, not getting a promise about when a sailing boat will arrive. Beyond the forecast horizon, the planner says it has no wind forecast rather than treating missing weather as calm.

### Put tidal passes and mast clearance into the conversation

With a start date and daily departure time, the itinerary shows an estimated arrival at each tidal pass, the predicted current then, and the next slack. It uses NOAA predictions for US passes and Canadian Hydrographic Service predictions for Canadian ones. The water doesn't stop at the border, and a trip plan shouldn't either.

Those estimates give you something specific to check: does this departure put me at the pass at a sensible time? They aren't a departure-time optimizer or a guarantee of slack-water arrival.

Mast height can change the route itself. Using the planner's nominal clearance figures, Port Ludlow to Port Townsend is 12.9 nautical miles through the Port Townsend Canal for a 45-foot mast. Enter 60 feet and it becomes 35.1 miles around Marrowstone Island. That's a different day, not just another warning to dismiss. The clearance figures still need checking against current charts and water levels.

## What I learned as a software architect

The most useful architecture lesson came from a disagreement inside the application. The map could show one track while pass timing used a different line. Each part was doing its own job, but together they described two different trips.

The fix was to resolve a shared track for each selected leg and use it for both the map and timing. A mesh track has to agree with the known passages and spans. If it doesn't, the application uses a curated waypoint line, labels it approximate, and draws it dashed. That fallback can cross land; it isn't quietly promoted to a verified route.

I write about separating responsibilities because it makes software easier to change. This project reminded me of the other half: separate components still need to agree on what their shared data means. A route isn't just a list of coordinates. It carries assumptions that the map, timing, and clearance checks must not contradict.

I also learned to look for checks outside the model I had built. A connected network with no land crossings can still send a boat on an unnecessary detour. Comparing mesh distances with the published harbor-to-harbor mileage exposed problems that connectivity checks couldn't see. Passing the checks I'd designed was not the same as producing a useful route.

### AI-assisted pipelines need evidence at each stage

This is a concrete example of what I mean by this site's tagline, "AI-assisted data pipelines for maps, charts, and media." The visible result is a map, but much of the work happens before anything is drawn: reading inconsistent harbor pages, resolving names and coordinates, generating a waterway network, and combining routes with forecasts and current predictions.

For me, AI-assisted means using coding assistants to help build and revise that machinery, not asking a language model where to sail. The routing and timing come from code and source data. The architect's job is still to decide what each stage must preserve, what evidence would show that it worked, and what happens when it doesn't.

A coordinate parser can reject impossible minutes and seconds. A mesh build can check for land crossings. A distance comparison can expose an implausible detour. None of those checks proves the whole itinerary correct, but each tests a different assumption. Asking an assistant whether its own output looks right isn't a substitute for them.

The lesson I take into chart and media pipelines is the same: keep the source identifiable, make the transformations repeatable, and check the result against something other than the process that produced it. AI can help write a transformation and its tests. Choosing an independent reference, reviewing exceptions, and deciding what is ready to publish remain responsibilities I own.

## What I learned as a cartographer

The route data covers about 220 harbors, with distances and named passages rather than continuous tracks. Connecting the harbor coordinates draws convincing lines at a regional scale. Zoom in and one of those lines can cross an island.

I built a waterway mesh from OpenStreetMap's coastline, using an 80-meter grid and a search that tends toward mid-channel. A hand-authored skeleton identifies the waterways; the generated geometry fills in the detail. That let me review the structure without pretending I could place every channel correctly from memory.

But resolution is a decision with consequences. An 80-meter cell cannot describe a 40-meter cut. Narrow channels need special handling, and a coastline still tells me nothing about depth. I had to keep asking what the source data could actually support, rather than what I could persuade the map to draw.

The lesson for me was that the line's appearance is part of the information. A smooth, solid route looks authoritative. Showing an approximate route differently matters as much as explaining the limitation in documentation. The person looking at the map needs that distinction where they're making the decision.

## Where it stands

This is a **planning aid, not a navigation tool**. The mesh contains no soundings, rocks, aids to navigation, or seasonal closures. A line through a pass can be geometrically correct and still be a bad choice at the wrong state of tide. Use current charts, official forecasts and current predictions, and your own assessment of the boat and crew.

There is also a source-data question to resolve before wider distribution. The distances and passage notes come from [nwcruising.net](https://www.nwcruising.net). Crawling is permitted by its robots.txt, but I haven't sought redistribution permission, and the scraped files aren't committed to the repository.

What I want from the planner is a better starting conversation about a trip: these stops fit the time available, this day looks like a beat, this pass needs attention, and that bridge changes the route. There's still plenty for the skipper to decide. Having those questions in front of me earlier is the reason to build it.

The project and its [design decisions](https://github.com/ivanoats/salish-nav-planner/tree/main/docs/adr) are in the [Salish Sea Route Planner repository](https://github.com/ivanoats/salish-nav-planner).
