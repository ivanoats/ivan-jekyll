---
layout: single
title: "Sustainable Websites, Twenty-Two Years Later (and an Accidental Ferry Map)"
date: '2026-10-14 09:00:00'
tags:
- sustainability
- web-sustainability-guidelines
- wsg-check
- verdant
- mcp
- side-projects
---

In 2004 I started a web hosting company called Sustainable Websites. The idea was modest by today's standards: offset the carbon from the servers. I sold the hosting business to [GreenGeeks](https://www.greengeeks.com/track/sustainableweb/cp-default){:rel="sponsored"} in 2013 and went on to other things, but the question underneath it never went away. Hosting was only ever part of a website's footprint. The rest comes from how the site is built: how many bytes it sends, how much work it makes a phone do, how often it makes a server redo work it already did.

That question finally has a standard to measure against. The W3C, the body behind HTML and CSS, has been drafting the [Web Sustainability Guidelines](https://www.w3.org/TR/web-sustainability-guidelines/) (WSG), a set of practices for building lower-impact websites, organized much like the accessibility guidelines most developers already know.

So this fall I relaunched the name as a consulting practice, and shipped three things around it. A fourth thing, unrelated, got more attention than all three.

## A checker

[**wsg-check**](https://wsg-check.com) checks a website against the WSG. Give it a URL and it returns a sustainability score, a breakdown by category, and a prioritized list of what to fix first. No account required.

It's also a command-line tool, which is the version I use most:

```bash
npx @sustainablewebsites/wsg-check https://example.com
```

Add `--fail-threshold 70` and it exits with an error when a site scores below 70, so it can fail a CI build the same way a broken test would.

## Something worth checking

A checker needs something to check, and I wanted at least one site I could point to that does the right things by default. [**Verdant**](https://verdant-design.org) is a small design system, the shared colors, spacing, typography, and components a site is built from, with sustainable choices made up front instead of retrofitted later. It ships only the CSS a given page uses, and it measures itself. A first visit to its demo site transfers 52.6 KiB; a repeat visit, with caching doing its job, 11.6 KiB. For comparison, the median web page today is measured in megabytes.

It has also spread further than I planned. My ferry map (more on that below) and [Good Paddle](https://goodpaddle.com), my paddleboarding site, both run on it now. wsg-check's own site is next, which means the checker will finally be checked against its sibling.

## A way to make it someone's job

[**Sustainable Websites**](https://sustainablewebsites.com) is the consulting practice: a digital footprint audit, architecture consulting, and help cleaning up build and deploy pipelines. My day job is enterprise architecture, so the pitch is not purely environmental. A site that sends fewer bytes and does less redundant work also loads faster and costs less to run. In my experience that second argument is the one that gets budget approved, and it happens to produce the first outcome too. The first audit is free.

## wsg-check now works inside AI assistants

This is the part I didn't expect to build. Over the past few weeks most of my wsg-check time went into making it an [MCP](https://modelcontextprotocol.io) server. MCP, the Model Context Protocol, is the standard way for AI coding assistants such as Claude, Copilot, and Cursor to call outside tools.

The reason is practical. Most sustainability fixes are small, tedious, and scattered across a codebase: an image in the wrong format, unused CSS, fonts loaded too eagerly, a missing cache header. That is exactly the kind of work an assistant does well, as long as something tells it what to fix and confirms afterward that the fix worked.

The server runs on your own machine. There's no account and no hosted service. It gives an assistant three tools: check a URL (including your local dev server), list the guidelines, and look up the details of one. In Claude Code, setup is one line:

```bash
claude mcp add wsg-check -- npx -y -p @sustainablewebsites/wsg-check wsg-check-mcp
```

Configs for Claude Desktop, Cursor, and VS Code are in the [README](https://github.com/ivanoats/wsg-check#use-with-ai-assistants-mcp), and it's listed in the official [MCP Registry](https://registry.modelcontextprotocol.io). There's also an Agent Skill, a short set of instructions that walks an assistant through check, fix in priority order, and check again:

```bash
npx skills add ivanoats/wsg-check
```

Letting an assistant fetch arbitrary URLs deserves a word of caution, so I'll be specific about the limits. Requests are read-only. Private network addresses are blocked unless you opt in. Cloud metadata addresses are always blocked, and a public site can't redirect the checker into your network. Localhost is allowed by default, because checking your dev server is the point; `--no-local` turns that off.

## The accidental one: Salish Sea Ferry Map

I live in Seattle and spend as much time on the water as I can, and I've long wanted a single map of every ferry in the region. The routes are split across a dozen operators and two countries, each with its own website. So I built [**Salish Sea Ferry Map**](https://salishseaferrymap.com): Washington State Ferries, BC Ferries, Black Ball, Kitsap Transit, the Victoria Clipper, and the county ferries on one map, with live positions for Washington State Ferries vessels in beta. It's for planning, not navigation, and it says so.

I shared it on Reddit and Facebook, and it took off. Since then it has gained the SeaBus, Hullo, the False Creek ferries, the Jetty Island ferry, and a batch of Gulf Islands runs. After an audit against OpenStreetMap I moved 17 terminals onto their actual docks. It also has a subway-style route diagram you can export as a print.

It's a useful reminder. I spent months positioning the sustainability work. The ferry map had no strategy behind it at all, and it drew more than 138,000 views anyway.

## What's next

Next I'll run wsg-check against Verdant and write up what it finds, including whatever it gets wrong about my own work.

If you run [wsg-check](https://wsg-check.com) on your site and the score surprises you, in either direction, I'd like to hear about it.
