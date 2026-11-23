---
layout: single
title: What I've Been Building at lululemon
date: '2026-09-15 10:10:10'
tags:
- architecture
- security
- ai
- enterprise
---

I don't usually write about the day job here. The last few posts on this site were about a Rust media CDN and a boat's instrument panel. This one's the exception, written mostly for recruiters and hiring managers who want the plain version of what I've actually been doing at lululemon, not a bullet-point resume.

For the last year and a half I've been a Senior Solutions Architect II on lululemon's platform engineering org. I own end-to-end solution architecture across a small number of concurrent, cross-team programs rather than any single codebase. Two examples carry most of the weight: a grants and donations platform (lululemon Gives, the company's philanthropic giving arm) and an ambassador engagement platform connecting the company with the athletes and community members who represent the brand.

## The habit that mattered more than any single decision

I publish an Architecture Decision Record for essentially every major cross-system call on both programs, with the trade-offs and the build-vs-buy reasoning written down instead of left in someone's head. When three teams are touching the same integration boundary, a written record of why a choice was made turns out to matter more than being right about the choice itself. Most of my architecture practice, honestly, is this habit applied consistently rather than any individual moment of insight.

## The AI question inside an enterprise DAM

The most interesting problem on my plate right now is architecture for an international, AI-enabled digital asset management platform, the system that stores and routes lululemon's photo and video assets globally. The AI piece is a build-vs-buy call: build custom capability in-house, or adopt a vendor platform (we've been evaluating Hyland's Nuxeo/CIC product) for things like automated tagging, rights management, and content search across a large existing asset library.

That evaluation is the closest my day job gets to what I do for fun on nights and weekends. It's a real recommendation going to enterprise leadership, weighing capability against cost against governance, for a system that has to work across different regions' content rules. The discipline required to evaluate AI tooling honestly, instead of getting sold on it or dismissing it out of hand, turns out to be its own skill.

## Security and access as architecture, not afterthought

A good chunk of the last year has been RBAC work: designing who can see and do what across customer-facing, partner, and internal user populations, and making sure that design holds up under a security review instead of getting bolted on after the fact. In practice that means threat modeling early, defining role hierarchies and least-privilege defaults before implementation starts, and treating a security sign-off as a design constraint rather than a final gate to get past. I've driven that readiness work across security, platform engineering, and product teams on both programs above. Most of it is coordination: getting the right people talking to each other before a decision hardens, not making the decision alone.

The infrastructure underneath all of this is fairly standard for a company this size. AWS, Kubernetes (EKS), Terraform for infrastructure-as-code, Akamai at the edge, Istio for service mesh. None of that is the interesting part of the job, but architecture decisions don't mean much if they ignore what they're actually running on.

## The honest middle

I don't know yet whether the DAM AI recommendation lands on build or buy. I'd trust my own judgment less if I already knew the answer before finishing the evaluation. And I'll say plainly that evaluating AI tooling for an enterprise system is still genuinely hard to do well. Vendor demos are built to look good. A build option's maintenance cost is easy to underestimate up front. I don't think anyone, myself included, has fully solved how to run this kind of evaluation honestly, and I'd rather admit that than pretend the framework is settled.

## What I'd take from this into whatever's next

The pattern across all of it is the same: real budget constraints, real security requirements, and a growing amount of AI evaluation work layered on top of traditional enterprise architecture. That combination, architecture discipline plus a genuine, hands-on read on where AI tools are actually useful, is what I want to keep doing. If you're doing this kind of evaluation somewhere else, or hiring for it, I'd like to hear how you're approaching it.
