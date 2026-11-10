---
layout: single
title: "AI Can Speed Up Delivery. Architecture Decides Whether It Lasts."
date: '2026-11-09 09:00:00'
excerpt: "What two research reviews covering 42 papers say about AI across the software lifecycle: where the speed is real, what it costs later, and what engineers, managers and product people can do about it."
tags:
- ai
- software-architecture
- sdlc
- engineering-management
- wsg-check
---

Anyone who has sailed a small boat in a building breeze learns this the hard way: more sail doesn't make you faster on its own. Past a certain point it just lays the boat over on its side. What lets a boat carry more sail is what's under the water, the keel and the ballast, the parts nobody photographs.

I kept coming back to that picture while reading two research reviews on AI across the software development life cycle. Together they cover 42 papers from 2021 to 2026. The first review is fairly upbeat. The second is more skeptical, and better for it: it brings in the randomized trials, the security studies and the longitudinal data the first one mostly skipped.

Both land in the same place. AI across the lifecycle can make delivery faster, but only when specification discipline and architectural governance are treated as real engineering work. Without them, you get a short burst of speed and a long tail of complexity, security flaws and debt.

This post is for the people who have to live with that: software engineers, engineering managers, and the product and program managers who plan around what engineering says it can deliver. There's also a [slide deck version](https://claude.ai/artifact/U9sZBctoF2Hs7Z5sQvyiPz) if you want to walk a team through it.

## Two findings, held together

The first finding is that the speed is real, and conditional. Controlled trials show gains of 20–56% on well-scoped tasks (Peng et al., 2023; Paradis et al., 2024; Cui et al., 2026). Enterprise deployments that put AI across the whole lifecycle report much larger numbers, though from weaker study designs (Karuppuchamy, 2026; Beshane, 2026).

The second is that erosion is real too. When code generation speeds up and nothing anchors the architecture, complexity, duplication and vulnerabilities pile up faster than anyone can review them (Alenezi, 2026a; He et al., 2025; Michels et al., 2026).

What limits the gains, according to both reviews, is governance rather than model capability (Alenezi, 2026a; Farrag, 2026). Most teams have already decided to adopt these tools. So the question I care about is what keeps the structure sound while you go faster.

## What the randomized trials say

The strongest evidence comes from four controlled studies, and they don't agree as neatly as the headlines suggest:

| Study                         | Setting                                                             | Result              |
| :---------------------------- | :------------------------------------------------------------------ | :------------------ |
| Peng et al., 2023 (GitHub)    | One bounded JavaScript task, less-experienced developers            | 55.8% faster        |
| Paradis et al., 2024 (Google) | 96 engineers, a complex multi-file task                             | 21% faster          |
| Cui et al., 2026              | Field experiments at Microsoft, Accenture and a Fortune 100 firm    | 26% more tasks done |
| Becker et al., 2025 (METR)    | 16 experienced developers, 246 real tasks in their own mature repos | 19% slower          |

That 55.8% figure shows up in a lot of slide decks. It comes from a single, well-bounded JavaScript task. As the tasks get more complex and the developers know their codebase better, the gain shrinks. In the METR trial it reversed. Experienced open-source maintainers working in their own repositories were 19% slower with AI tools allowed, even though they and outside experts had predicted a speedup (Becker et al., 2025).

Xu et al. (2025) found the same split from another angle. AI-assisted programming raised productivity mostly for less-experienced developers, while core developers reviewed 6.5% more code and wrote 19% less original code of their own.

## More code merged, same delivery

Farrag (2026) synthesizes 67 sources and names the pattern the productivity–reliability paradox. Telemetry across more than 10,000 developers shows a 98% increase in merged pull requests alongside a 91% increase in review time, and organizational delivery metrics that stay flat.

The speed showed up in the editor and disappeared before it reached customers. It turned into a queue in front of the reviewers, who are usually the most senior people on the team.

## What the pipeline studies report

Studies of whole-lifecycle enterprise deployments report the biggest gains:

| Metric                                | Reported outcome                 | Study design                      |
| :------------------------------------ | :------------------------------- | :-------------------------------- |
| Cycle and lead time                   | 40–67% shorter                   | Case studies                      |
| Lead time, governance-first DevSecOps | 39.2% shorter (Cohen's d = 1.32) | One deployment study              |
| Deployment cycle time, GenOps         | 55.7% shorter                    | 15,847 deployments, one framework |
| Deployment frequency                  | Up to 20×                        | Case studies                      |
| Defect rates in validation            | 41–90% lower                     | Case studies                      |
| Legacy modernization effort           | 1,080 down to 232.5 person-days  | One longitudinal field study      |

Sources: Karuppuchamy (2026), Kumar (2023), the 2025 JCSTS and 2026 F1000Research papers, Beshane (2026), Aluri (2025), Armesto and Kolb (2026).

None of these had randomized controls, so cause and effect are uncertain. I read them as what's possible in a well-governed pipeline, not what a team should expect. It's worth noticing that the governance-first designs report some of the strongest results.

## The bill arrives after the sprint

The longer-term studies are where it gets uncomfortable.

He et al. (2025) followed open-source projects after they adopted Cursor. Velocity spiked briefly, then static-analysis warnings and code complexity kept climbing, and the rising complexity slowed the projects down over time.

GitClear data reviewed by Michels et al. (2026) shows refactoring falling from 25% of all changes to under 10%, while duplicated code rose roughly fourfold. That data is observational and vendor-produced, so hold it a little loosely.

A survey of 415 practitioners using the SPACE framework found that frequent AI users did report faster task completion, along with heavier review burden and constant cognitive load from checking the output (Afroz et al., 2025). The effort got redistributed more than it got removed.

In fairness, the quality evidence is contested. A preregistered experiment with 151 professional developers found no significant maintainability penalty from AI-assisted code (Borg et al., 2026).

## Security is the least specified part

This is the section I'd most want an engineering manager to read.

Blain and Noiseux (2026) formally verified 3,500 AI-generated artifacts. 55.8% had at least one vulnerability. No model scored better than a D, and explicitly asking for secure code lowered the vulnerability rate by only four percentage points.

Developers with an AI assistant wrote less secure code than a control group and were more likely to believe their code was secure (Perry et al., 2022).

Agent context files tell the same story. In a study of files like AGENTS.md and CLAUDE.md, developers mostly described test procedures (75.9%), implementation details (70.8%) and architecture (68.1%). Only 14.8% said anything about security, and 14.5% about performance (Chatlatanagulchai et al., 2025). If you keep one of these files, open it and search for the word "security." It takes ten seconds.

And prompt injection attacks against agentic coding editors got them to run malicious commands up to 84% of the time, including credential theft and data exfiltration (Liu et al., 2025).

## How much to trust each claim

The second review rates the evidence behind each major claim:

| Claim                                                         | Evidence strength |
| :------------------------------------------------------------ | :---------------- |
| AI shortens bounded individual tasks                          | Strong (8/10)     |
| AI-generated code has systematic security flaws               | Moderate (7/10)   |
| Orchestrated multi-agent delivery beats isolated assistants   | Moderate (6/10)   |
| Specification governance reduces erosion and security defects | Moderate (5/10)   |
| AI helps experienced developers on mature codebases           | Weak (2/10)       |

The claim most vendor pitches lean on is the bottom row, and it's the weakest one.

It's also worth asking who's counting. A metric like "task time saved" counts the minutes an engineer spends typing. It doesn't count the reviewer's afternoon, the on-call engineer's 2 a.m. page, or the maintainer who inherits the code next year. Those costs still exist. They just land on different people, and the review-time numbers above say they land mostly on the senior ones.

Both reviews came from [Consensus](https://consensus.app), an AI research search engine, and several of the sources are 2026 arXiv preprints that haven't been through peer review. They make a good reading list. Go to the primary paper before you cite a number.

## The stability–velocity paradox

Bhati (2026) names the underlying tension the stability–velocity paradox. Large language models are non-deterministic. Production systems can't be. The property that makes generation fast, sampling from a distribution, is the same property that produces plausible-but-wrong code, and the wrong code arrives as fast as the good code does (Bhati, 2026; Daud et al., 2026).

Farrag's review-time numbers show what happens when human review is the only thing standing in the path. Something deterministic has to sit there too.

## From assistants to orchestration

The reviews draw a line between two ways of using AI.

The first is the isolated coding assistant: one engineer, one editor, one step sped up. Context resets at every handoff, so the gains stay fragmented.

The second is end-to-end orchestration. An orchestrator coordinates specialized sub-agents across requirements, design, build, test and operations, and carries context from one phase to the next. That's where the case studies report the largest gains (Armesto & Kolb, 2026; Arifin, 2026; JCSTS, 2025). The second review rates this claim moderate, because none of those studies had randomized controls.

Bhati's comparison of the two flows is worth looking at for one detail in particular: where the humans sit. In the traditional SDLC, people do the work at every phase and pass it along. In the agentic version, people supervise at gates. They set the intent at the start, review what comes back, and approve what goes to production.

That changes what an architect does all day. The work moves from writing code toward setting constraints, specifying intent and designing the governance (Bhati, 2026; Alenezi, 2026a).

## Specs as contracts

The answer both reviews keep returning to is specification-driven development (Alenezi, 2026a; Nguyen & Nguyen, 2026; Farrag, 2026). The shape of it is simple:

1. People own the intent.
2. The intent is written down as a machine-readable spec, a contract.
3. Generation against that spec is allowed to be stochastic.
4. Deterministic verification gates sit between generation and production.
5. Only what passes the gates ships.

The model can write a function ten different ways. That's fine. The gate doesn't care which way, only whether the result honors the contract.

Some of those gates are things most teams already know how to build, like contract tests and schema checks. The architectural ones are less common. Continuous conformance checking in CI, using fitness functions over structural metrics, can catch architectural degradation on each pull request before it reaches main (Mendoza et al., 2021; Bucaioni et al., 2024; Makieiev & Kravets, 2026). Either way, a gate is code that passes or fails, not a reviewer's judgment on a busy Friday.

This is the same instinct behind [wsg-check](https://github.com/ivanoats/wsg-check), the sustainability checker I've been building. A check that runs the same way every time is worth a lot when the thing it's checking changes faster than people can read it.

## Five governance patterns

The second review collects five named patterns. I'm listing their claimed results with a caveat: most of these effect sizes come from the frameworks' own authors, and independent replication is limited.

| Pattern                                                 | How it works                                                                                                                          | Claimed result                                                  |
| :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------- |
| Specification-Driven Development (Alenezi, 2026a)       | Machine-readable contracts and deterministic validation gates                                                                         | 73% fewer security defects, 50% shorter time to market          |
| Spec-Driven Agentic Development (Nguyen & Nguyen, 2026) | Intent, spec, agentic synthesis, multi-agent verification, human sign-off                                                             | Separates synthesis from release authority                      |
| Cognitive Software Delivery (JCSTS, 2025)               | Context mesh, Model Context Protocol, RAG and agent-to-agent orchestration                                                            | Up to two-thirds shorter cycle time, up to 90% fewer defects    |
| Governed AI-Assisted Engineering (Kang, 2026)           | Oversight tiered by risk: humans in the loop for strategic work, over the loop for customer-facing work, automation for internal work | Keeps 84–97% of agentic velocity, from analytical modeling      |
| GenOps (Beshane, 2026)                                  | Guardrailed planning, staged canary rollouts, immutable audit logs                                                                    | Zero safety policy violations, 47.2% less error-budget variance |

The tiered-oversight idea in GAIE is the one I'd steal first. Not every change deserves the same amount of human attention, and giving every change the same review is one way review time balloons.

## Four moves for architects

The first review lists four strategic imperatives. They still hold up after the second.

First, build a shared context layer: context meshes, Model Context Protocol servers and retrieval pipelines, so that nothing important gets truncated between phases (P et al., 2025; Nguyen & Nguyen, 2026).

Second, move discipline upstream. Rigor used to live mostly in code review. Now it has to live in machine-interpretable specifications and reusable prompt templates (Rajbhoj et al., 2024; Alenezi, 2026a).

Third, close the observability loop. Runtime telemetry, anomaly prediction and automated policy checks should feed back into the pipeline, not sit in a dashboard nobody opens (Eramo et al., 2024; Venkataraman et al., 2026).

Fourth, anchor the architecture. Keep humans on high-risk system design and deployment boundaries. In one 60-day case study, people handled about 90% of architectural design tasks and AI about 85% of basic implementation, and AI's share dropped wherever reliability and system constraints mattered most (Daud et al., 2026).

## What it means for your role

The research is written for architects. Here's my attempt to translate it for everyone else on the team. These are my recommendations, drawn from the findings, not findings themselves.

If you're a software engineer, the spec is now part of the deliverable, so write specs a machine can check. Your agent context file is a spec too, so put your security and performance requirements in it. Treat a failing gate as the system doing its job, not as friction.

If you're an engineering manager, expect review load to rise and staff for it, because the numbers say it lands on your senior people. Measure end-to-end delivery, like lead time and change failure rate, rather than merged pull requests. Which decisions stay with people and which go to agents is a management decision, so make it on purpose and write it down. And somebody has to write the specs, fitness functions and policy checks. That's real work done by real people.

If you're a product or program manager, plan on the 20–26% the controlled trials found for bounded work, not the 20× from someone else's case study. On a mature codebase, assume little or no gain until your own team has measured one. Your intent now feeds the pipeline directly, so a vague requirement can cost a wrong implementation built at machine speed. And put the approval gates on the schedule, because they take time.

## After launch

Governance doesn't stop at deployment. Distributed and multi-cloud systems drift, and they need continuous evaluation rather than a one-time architecture review (Arshad et al., 2025; Bucaioni et al., 2025). Mulluri (2026) looks at AI-assisted decision support for workload placement, resilience planning and cost. Others describe feedback loops that monitor architecture health, keep documentation tied to code revisions, and adjust configuration as operating constraints change (Arshad et al., 2025; Bucaioni et al., 2025).

One thing none of these papers measure is what all this generation costs in energy. Throwing away nine generated drafts to keep the tenth is cheap per keystroke. At the scale of a whole engineering org, it isn't free. I'd like to see that column in the next round of benchmarks.

## What nobody has measured yet

The biggest gap in the research is the setting architects actually work in: team-level and pipeline-level randomized evidence on mature production codebases. There are no randomized trials of architectural governance at all. The METR trial is the only study that comes close to that setting, and it found a slowdown (Becker et al., 2025).

Long-term data on architecture health is thin too. The Cursor complexity study and the GitClear churn data are observational, and the churn data is vendor-produced (He et al., 2025; Michels et al., 2026). The governance frameworks are carefully argued, but claims like GAIE's velocity numbers come from modeling, not deployments (Kang, 2026).

The open questions I'd most like answered: does specification-driven development prevent architectural erosion over a year or more, or just delay it? How much oversight do regulated systems really need? And what does all this do to how junior engineers learn the craft?

The second review closes with a line I keep thinking about. Paraphrasing: architects who treat AI-SDLC as a tooling upgrade will get the short-term velocity spike, then inherit the complexity, security and governance debt that follows.

## Where I'd start

If I were bringing this to a team this quarter, I'd keep it small:

1. Baseline lead time, deployment frequency, change failure rate and review time now, before the tooling changes, so you can tell later whether it helped.
2. Pick one service and write its contract as a machine-readable spec.
3. Add an architecture fitness check that runs on every pull request.
4. Tier human oversight by risk: strategic, customer-facing, internal.
5. Add security and performance requirements to your agent context files.

That's enough to learn from. The keel can get deeper once you know how much sail you actually want to carry.

## References

Both reviews were found and analyzed with [Consensus](https://consensus.app). This post paraphrases their findings and points to the underlying papers.

- (Unattributed). (2025). AI-Driven Product Development: Cognitive Software Delivery at Enterprise Scale. _Journal of Computer Science and Technology Studies_. <https://doi.org/10.32996/jcsts.2025.7.8.99>
- (Unattributed). (2026). Assessing the Impact of AI-Augmented DevSecOps on Lead Time in Agile Release Management. _F1000Research_. <https://doi.org/10.12688/f1000research.178067.1>
- Afroz, S., Feng, Z.-X., Menezes, T., Kimura, K., Trinkenreich, B., Steinmacher, I., & Sarma, A. (2025). The Fast and Spurious: Developer Productivity with GenAI. _Proceedings of the 34th ACM International Conference on the Foundations of Software Engineering_. <https://doi.org/10.1145/3803437.3806710>
- Alenezi, M. (2026a). Specification-Driven Development as the Foundation of AI-Native Enterprise Software Engineering. _arXiv, abs/2607.16680_. <https://doi.org/10.48550/arxiv.2607.16680>
- Alenezi, M. (2026b). How AI Changes DevOps Performance: A Mechanism-Based Simulation.
- Aluri, Y. S. (2025). Agentic AI Frameworks for Autonomous Enterprise Software Development Workflows. _International Journal of AI, BigData, Computational and Management Studies_. <https://doi.org/10.63282/3050-9416.ijaibdcms-v6i1p122>
- Arifin, G. Y. (2026). An AI-Integrated Multi-Agent Product Development Pipeline for Autonomous Design-To-Production Software Delivery: Architecture and Evaluation. _International Journal of Scientific Interdisciplinary Research_. <https://doi.org/10.63125/bq24tw25>
- Armesto, M., & Kolb, C. (2026). Orchestrating Human-AI Software Delivery: A Retrospective Longitudinal Field Study of Three Software Modernization Programs. _arXiv, abs/2603.20028_. <https://doi.org/10.48550/arxiv.2603.20028>
- Arshad, N., Butt, T., & Iqbal, M. (2025). A Comprehensive Framework for Intelligent, Scalable, and Performance-Optimized Software Development. _IEEE Access, 13_, 74062–74077. <https://doi.org/10.1109/access.2025.3564139>
- Becker, J., Rush, N., Barnes, E., & Rein, D. (2025). Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity. _arXiv, abs/2507.09089_. <https://doi.org/10.48550/arxiv.2507.09089>
- Beshane, N. K. S. (2026). GenOps: A Governance-First Architecture for Embedding Generative AI into CI/CD Pipelines. _Journal of Information Systems Engineering and Management_. <https://doi.org/10.52783/jisem.v11i1s.14322>
- Bhati, H. (2026). Agentic AI in the Software Development Lifecycle: Architecture, Empirical Evidence, and the Reshaping of Software Engineering. _arXiv, abs/2604.26275_. <https://doi.org/10.48550/arxiv.2604.26275>
- Blain, D., & Noiseux, M. (2026). Broken by Default: A Formal Verification Study of Security Vulnerabilities in AI-Generated Code. _arXiv, abs/2604.05292_. <https://doi.org/10.48550/arxiv.2604.05292>
- Borg, M., Hewett, D., Hagatulah, N., Couderc, N., Söderberg, E., Graham, D., Kini, U., & Farley, D. (2026). Echoes of AI: Investigating the downstream effects of AI assistants on software maintainability. _Empirical Software Engineering, 31_. <https://doi.org/10.1007/s10664-026-10889-1>
- Bucaioni, A., Di Salle, A., Iovino, L., Mariani, L., & Pelliccione, P. (2024). Continuous Conformance of Software Architectures. _2024 IEEE 21st International Conference on Software Architecture (ICSA)_, 112–122. <https://doi.org/10.1109/icsa59870.2024.00019>
- Bucaioni, A., Weyssow, M., He, J.-D., Lyu, Y., & Lo, D. (2025). Artificial Intelligence Support for Software Architecture Practice: A Systematic Review and Future Directions. _ACM Transactions on Software Engineering and Methodology, 35_, 1–36. <https://doi.org/10.1145/3828546>
- Chatlatanagulchai, W., Li, H., Kashiwa, Y., Reid, B., Thonglek, K., Leelaprute, P., Rungsawang, A., Manaskasemsak, B., Adams, B., Hassan, A. E., & Iida, H. (2025). Agent READMEs: An Empirical Study of Context Files for Agentic Coding. _ACM Transactions on Software Engineering and Methodology_. <https://doi.org/10.1145/3840295>
- Cui, K., Demirer, M., Jaffe, S., Musolff, L., Peng, S.-D., & Salz, T. (2026). The Effects of Generative AI on High-Skilled Work: Evidence from Three Field Experiments with Software Developers. _Management Science_. <https://doi.org/10.1287/mnsc.2025.00535>
- Daud, N., Rabani, M. I., & Supriyanto, B. F. (2026). Hybrid Human AI SDLC for Rapid SaaS Development: Evidence from a 60 Days Case Study. _Edumatic: Jurnal Pendidikan Informatika_. <https://doi.org/10.29408/edumatic.v10i1.34361>
- Eramo, R., Said, B., Oriol, M., Bruneliere, H., & Morales, S. (2024). An architecture for model-based and intelligent automation in DevOps. _Journal of Systems and Software, 217_, 112180. <https://doi.org/10.1016/j.jss.2024.112180>
- Farrag, S. E. (2026). The Productivity-Reliability Paradox: Specification-Driven Governance for AI-Augmented Software Development. _arXiv, abs/2605.01160_. <https://doi.org/10.48550/arxiv.2605.01160>
- He, H., Miller, C., Agarwal, S., Kästner, C., & Vasilescu, B. (2025). Speed at the Cost of Quality: How Cursor AI Increases Short-Term Velocity and Long-Term Complexity in Open-Source Projects. _Proceedings of the 23rd International Conference on Mining Software Repositories_. <https://doi.org/10.1145/3793302.3793349>
- Kang, R. (2026). Governed AI-Assisted Engineering: Graduated Human Oversight for Agentic Code Generation in Regulated Domains. _arXiv, abs/2606.22484_. <https://doi.org/10.48550/arxiv.2606.22484>
- Karuppuchamy, S. (2026). AI-Augmented Software Engineering for Rapid Feature Delivery and Operations Automation. _2026 IEEE 16th Annual Computing and Communication Workshop and Conference (CCWC)_, 0607–0614. <https://doi.org/10.1109/ccwc67433.2026.11393761>
- Kumar, U. (2023). Generative AI-Enabled Automated SDLC Orchestration for Efficient Software Delivery. _International Journal of Computer Engineering and Technology_. <https://doi.org/10.34218/ijcet_14_02_029>
- Liu, Y., Zhao, Y.-J., Lyu, Y., Zhang, T., Wang, H., & Lo, D. (2025). "Your AI, My Shell": Demystifying Prompt Injection Attacks on Agentic AI Coding Editors. _arXiv, abs/2509.22040_. <https://doi.org/10.48550/arxiv.2509.22040>
- Makieiev, O., & Kravets, N. (2026). Study of Variability of Architectural Metrics During the Evolution of a Software System in CI/CD Conditions. _Measuring and Computing Devices in Technological Processes_. <https://doi.org/10.31891/2219-9365-2026-87-36>
- Mendoza, C., Bocanegra, J., Garcés, K., & Casallas, R. (2021). Architecture violations detection and visualization in the continuous integration pipeline. _Software: Practice and Experience, 51_, 1822–1845. <https://doi.org/10.1002/spe.3004>
- Merler, M., Pan, R., Krishna, R., Tin, K.-H., Pavuluri, R., & Vukovic, M. (2026). Usage, Effects and Requirements for AI Coding Assistants in the Enterprise: An Empirical Study. _Proceedings of the 3rd International Workshop on Large Language Models For Code_. <https://doi.org/10.1145/3786181.3788727>
- Michels, D., Ghazaleh, M. A., Lazzari, F., Kassem, N., & Klein, J. (2026). Vibe Coding: Practice, Performance, Productivity, and Risk: A State-of-the-Art Review. <https://doi.org/10.48550/arxiv.2608.20446>
- Mulluri, P. K. (2026). AI-Assisted Software Architecture Design for Multi-Cloud Enterprise Environments. _International Journal on Advanced Computer Engineering and Communication Technology_. <https://doi.org/10.65521/ijacect.v15i1.2022>
- Nguyen, V. H., & Nguyen, T. (2026). SDAD: Spec-Driven Agentic Development for the AI-Native SDLC. <https://doi.org/10.48550/arxiv.2608.20341>
- P, P., M, T., & Jaslin, C. (2025). SDLC AutoPilot AI: Agentic Automation of Software Development Life Cycle. _2025 International Conference on Intelligent Computing, Information and Control Systems (ICOIICS)_, 1237–1242. <https://doi.org/10.1109/icoiics67115.2025.11390299>
- Paradis, E., Grey, K., Madison, Q., Nam, D., Macvean, A., Meimand, V., Zhang, N., & Chandra, S. (2024). How Much Does AI Impact Development Speed? An Enterprise-Based Randomized Controlled Trial. _2025 IEEE/ACM 47th International Conference on Software Engineering: Software Engineering in Practice (ICSE-SEIP)_, 618–629. <https://doi.org/10.1109/icse-seip66354.2025.00060>
- Peng, S., Kalliamvakou, E., Cihon, P., & Demirer, M. (2023). The Impact of AI on Developer Productivity: Evidence from GitHub Copilot. _arXiv, abs/2302.06590_. <https://doi.org/10.48550/arxiv.2302.06590>
- Perry, N., Srivastava, M., Kumar, D., & Boneh, D. (2022). Do Users Write More Insecure Code with AI Assistants? _Proceedings of the 2023 ACM SIGSAC Conference on Computer and Communications Security_. <https://doi.org/10.1145/3576915.3623157>
- Rajbhoj, A., Somase, A., Kulkarni, P., & Kulkarni, V. (2024). Accelerating Software Development Using Generative AI: ChatGPT Case Study. _Proceedings of the 17th Innovations in Software Engineering Conference_. <https://doi.org/10.1145/3641399.3641403>
- Serafini, R., Yardim, A., & Naiakshina, A. (2025). Exploring the Impact of Intervention Methods on Developers' Security Behavior in a Manipulated ChatGPT Study. _Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems_. <https://doi.org/10.1145/3706598.3713989>
- Vella, S., Ferworn, A., & Sharieh, M. (2026). ATeam: Governance-Aware LLM-Assisted Software Sustaining Engineering for Enterprise Systems. _2026 6th International Conference on Electrical, Computer and Energy Technologies (ICECET)_, 1–6. <https://doi.org/10.1109/icecet65726.2026.11633274>
- Venkataraman, M., Menon, K., & Senapati, A. (2026). Enhancing Software Delivery Performance through AI-Driven Observability and Intelligent Automation. _International Journal of Computer Science and Engineering Innovations_. <https://doi.org/10.64137/31079458/ijcsei-v2i1p107>
- Watanabe, M., Li, H., Kashiwa, Y., Reid, B., Iida, H., & Hassan, A. E. (2025). On the Use of Agentic Coding: An Empirical Study of Pull Requests on GitHub. _ACM Transactions on Software Engineering and Methodology, 35_, 1–24. <https://doi.org/10.1145/3798166>
- Xu, F., Medappa, P. K., Tunç, M., Vroegindeweij, M., & Fransoo, J. (2025). AI-Assisted Programming Decreases the Productivity of Experienced Developers by Increasing the Technical Debt and Maintenance Burden. <https://doi.org/10.48550/arxiv.2510.10165>
