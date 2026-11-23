<!-- borrow: Gladwell cold open — open with the specific render error, pivot to the AI-docs pattern -->
<!-- carries: data-feminism=consider-context | little-guy=indie dev with AI helper | historical-frame=map vs territory (Korzybski) -->
---
layout: single
title: The architecture docs lied, and the bots told on me
date: '2026-04-30 16:30:00'
tags:
- documentation
- ai-assisted-development
- code-review
- mermaid
- architecture
---

The browser tab said "Unable to render rich display."

Below it, on GitHub's view of `docs/architecture/overview.md`, in place of a system diagram I'd shipped weeks earlier and linked from a half-dozen other files: a parser error in red, pointing at a line that didn't look broken when I read it. *Undefined is not an object (evaluating 'e.x')*.

I'd been doing unrelated work that morning, a layer switcher for the OpenLayers map on the same project, some bot-comment cleanup on a different PR. I clicked over to the broken doc and pulled the file open.

I knew before I read a line what the answer would be. The diagram used Mermaid's experimental C4 syntax, the one with `Person()` and `System()` and `Container()` macros and embedded HTML in the description args. I'd been suspicious of that plugin since the docs landed. The error wasn't a surprise.

The surprise came next.

## Map drift

The fix was easy: convert C4 to plain `flowchart`, the same syntax the other architecture docs already used without trouble. While I had the file open, I figured I'd bring the rest of the architecture docs up to date too. The project had gained editorial MDX pages, a sites detail route, a layer switcher, and a few new components since the docs were last touched. The docs hadn't kept up.

So I let an AI agent help me redraw the diagrams. Site count from 147 to 159. The tile providers list grew from OSM alone to five sources. New nodes for `LayerSwitcher`, `SiteIndex`, `SiteDetails`, and the editorial subtree. New edges between them. A new `Slug` domain module that I'd added during a recent feature-parity push.

I committed, pushed, opened a PR. Mermaid rendered. The Sonar gate passed. The build went green.

Then the bot reviewers showed up.

Gemini first, three comments on the same diagram. *"The dependency `SiteIndex --> Slug` appears to be incorrect. Based on the implementation in `src/components/sites/SiteIndex.tsx`, the component uses the slug property already present on the `Site` object for navigation, but it does not import or use the slug generation logic from `src/domain/slug.ts`."*

Then Copilot, five more. *"The diagram shows `Slug --> Site`, but `src/domain/slug.ts` does not depend on `src/domain/site.ts` (it defines its own `SluggableSite` interface and has no imports)."*

I went and looked. Both bots were right. They'd both read the actual TypeScript. The diagram had drifted from the code in ways neither of us had noticed, because we'd written the new edges from a model of how the code is organized, not from the code itself.

## What the bots had that we didn't

The map is not the territory. Korzybski wrote that in 1933, before there were architecture diagrams. The line usually gets quoted as a warning against confusing models with reality. Here's the practical version: a diagram is a map, the code is the territory, and maps drift from territories without anyone meaning for them to.

When I rewrote the docs with the AI's help, both of us had context. We had the conversation history. We had a working model of the project. We remembered, vaguely, the files opened earlier in the session. What we didn't have, while we were writing the new diagram edges, was the actual import statements at the top of `SiteIndex.tsx`. We had a model of the code. The bots had the code.

This isn't a bot-supremacy story. Gemini and Copilot aren't smarter about architecture than the agent I was working with. They may even be the same family of model, behind different product wrappers. What mattered was procedural. Both ran after the diff landed, with file-level access to the codebase at that commit. What they did, and I hadn't, was open the file and compare the diagram I'd shipped to the imports it actually contained. The bots had what D'Ignazio and Klein call *context* — the situated, code-rooted ground truth that the in-session draft never reached for.

The little guy in this story is the solo developer using AI to help with docs. Right now the easy default is to let an AI assistant draft your README, your architecture diagrams, your changelog, anywhere there's a writing task you'd rather not do. The result is plausible documentation that is also subtly wrong, in ways the writer can't see and the reader will believe. The fix isn't "stop using AI for docs." The fix is: never ship AI-written docs without a reviewer that reads the actual code. That reviewer can be human. It can also be a bot. What it cannot be is the same context window that drafted the docs.

## Eight comments, all right

I addressed all eight. Removed the `SiteIndex --> Slug` edge: `SiteIndex` consumes `Site.slug` as a string field, not the slug module. The `Article --> Heading` and `Article --> Stack` edges came out next; `ArticleLayout.tsx` only imports `Link`. The `Slug --> Site` edge went too. `slug.ts` declares its own `SluggableSite` interface by design, so the parser can use it before a full `Site` exists. I replaced the bald `AboutRoutes --> Mdx` and `EditorialRoutes --> Mdx` edges with reverse dotted edges labeled "MDX-backed subset," because several editorial routes are TSX wrappers that don't import MDX at all.

The fixes were small. Together, they made the diagram match the code, not just my idea of it.

## Then the second Mermaid bug

A few minutes later I opened `hexagonal.md` on the same branch. *"Parse error on line 24: ... = readonly Facility[] end subgrap."*

This one wasn't C4. The file already used `flowchart` syntax, like the others. The Facility node had been written as `Facility[Facility<br/>FacilitySet = readonly Facility[]]`. Bare bracket node labels can't contain `[]`, because Mermaid's parser sees the inner `]` and assumes the node ended. One character per side fixes it: wrap the label in double quotes.

Two Mermaid bugs in two diagrams, in two unrelated files, on the same docs branch. The first was the brittle plugin's fault. The second was a months-old mistake of mine that GitHub had been quietly rendering the whole time, until something in the renderer tightened up and it stopped.

## What I'm still not sure about

I don't know how to make the bot fact-check automatic in-session. The PR loop made it work because Gemini and Copilot ran on the diff with the codebase at hand. If I were updating these diagrams in a long agentic session and merging by hand, there'd be no review pass, and the drift would land as silent rot. I have no good answer for the in-session case yet, other than the obvious one: read the imports before you write the edges.

I also don't know how widespread this failure mode is. My instinct is that AI-drafted architecture docs are wrong more often than the writers realize, in a specific way: they describe the system as it would be if the AI had written it, not as it actually is.

## What you can do next

If you're using AI to help maintain architecture docs, go look at one of your diagrams right now and trace one edge back to the actual import statement. Just one. If it survives, you've found nothing, and that's worth knowing. If it doesn't, you have your first bug, and you'll find more.

If you're a maintainer who hasn't enabled bot review because you didn't want the noise, this is the case for turning it on. Gemini Code Assist and GitHub Copilot's PR reviewer are both free for public repos. They will catch things you miss. Especially in docs.

The PR for this session is [ivanoats/ndwt-ol-chakra#52](https://github.com/ivanoats/ndwt-ol-chakra/pull/52). The render-broken file, the rewrite, the eight bot comments, the eight resolutions, and the second Mermaid bug are all in the history.
