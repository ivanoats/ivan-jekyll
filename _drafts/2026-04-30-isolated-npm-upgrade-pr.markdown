<!-- borrow: Gladwell cold open -->
<!-- carries: values=care-ethics over collateral damage | audience=indie maintainer and solo founder | bilingualism=risk containment in plain English -->
---
layout: single
title: The cleanest way to do a risky npm upgrade
date: '2026-04-30 22:33:54'
tags:
- npm
- eslint
- pull-requests
- maintenance
---

The tell was not in `package.json`. It was in `git branch -vv`.

I had asked for an all-the-way npm upgrade on a repo that was already mid-flight on another branch, and the first useful fact was not "which packages are outdated?" It was that I was standing in `docs/arch-refresh`, not `main`, and a careless dependency sweep would pull unrelated work into the diff. That is how maintenance work turns into social debt. Not because `npm install` is reckless by nature. Because it is very easy to do a risky thing in the wrong room.

So the first real change in this session was not a version bump. It was a boundary. I made a second worktree at `/Users/ivan/code/ndwt-ol-chakra-upgrade-all-latest` on a new branch, `chore/upgrade-all-npm-latest`, and only then started asking the repo what "latest possible" actually meant.

That phrase sounds straightforward until you try to make it hold up. "Latest" is not the same thing as "installable." "Installable" is not the same thing as "compatible." And "compatible" is not the same thing as "safe to ship in a repo that already has an open PR and a flock of bots waiting to tell you what they think."

## The work was really about risk, not versions

The repo itself gave the first answer. In the clean worktree, I ran the existing suite the way the project already expects to be treated:

```bash
npm ci
npm run lint
npm run lint:md
npm run typecheck
npm run test
npm run build
```

That baseline mattered because dependency upgrades have a bad habit of laundering uncertainty. If you skip the before-state, every failure after the upgrade gets to pretend it is new. Here, the baseline was steady: the project built, the tests ran, and lint produced only the same standing warnings the repo already had.

From there the mechanical part was easy enough. `npm outdated` showed what could move. `npx npm-check-updates -u --target latest && npm install` pushed the manifest forward. Runtime packages like `lucide-react` and `ol` moved cleanly. Tooling moved too: `@typescript-eslint/*` to v8, Husky 9, newer Prettier, newer `lint-staged`, newer markdown tooling.

The interesting part came when "latest" hit the edges of the ecosystem.

`eslint` 10 exists. So does `@eslint/js` 10. But the current plugin stack in this repo - `eslint-plugin-import`, `eslint-plugin-react`, and `eslint-plugin-jsx-a11y` - is not all there yet. That is the difference between a number on the registry and a version you can responsibly land. I confirmed the incompatibility the boring way: install attempts, peer dependency output, and a repo that still used the old `.eslintrc` model until I migrated it.

So the decision was simple once the evidence was on the table: take ESLint to the newest line this stack can actually support, which is `9.39.4`, and move the config with it.

If you have to explain that in CFO language, it is risk containment. If you have to explain it in maintainer language, it is the same decision stated plainly: do not buy yourself a future merge headache just to win an argument with a version number.

## The sharp edge was the config migration

The real upgrade work was not in `package-lock.json`. It was in replacing two old files with one new one.

This repo had a legacy `.eslintrc.json` and `.eslintignore`. ESLint 9 wants flat config. So the job became: migrate the rule set without changing the repo's actual lint posture.

That distinction mattered. I was not trying to smuggle in a fresh set of opinions under the cover of a dependency upgrade. I was trying to keep the repo behaving like itself while the toolchain changed under it.

I used the official migrator to generate `eslint.config.mjs`, then cut it back to what the project really needed. The finished change set was small:

- delete `.eslintrc.json`
- delete `.eslintignore`
- add `eslint.config.mjs`
- add the supporting flat-config packages in `package.json`
- keep the existing rules that already shaped this repo

Two tiny code edits fell out of that pass. `src/components/map-handlers.ts` no longer needed an inline `no-console` suppression. `src/domain/facility.ts` no longer needed an inline `no-redeclare` suppression. Those were not "cleanup while I'm here" edits. They came straight from the new lint stack.

Husky moved too. Version 9 does not want the old `husky install` posture forever, so the `prepare` script became just `husky`. Again, not flashy work. Just the kind of maintenance that stops becoming tomorrow's chore if you bother to do it.

## The branch mattered as much as the code

There was one more trap in the session, and it had nothing to do with npm.

When I first cut the new branch, I cut it from the branch I was already sitting on. That meant the upgrade branch quietly inherited a docs commit from the in-flight work. The clue was again not abstract. It was concrete:

```bash
git --no-pager log --oneline main..HEAD
```

The output showed a docs commit that had no business being in a dependency PR.

This is the sort of thing that is easy to miss if you think of Git as plumbing instead of as a promise you are making to reviewers. A dependency PR that also carries stray documentation work is not just untidy. It raises the cost of trust. Someone now has to separate the maintenance you meant from the work you accidentally dragged in. That someone is usually tired already.

So I reset the branch onto `main`, restored the unrelated docs files, reran the repo checks, and only then committed the upgrade work. That gave the session its actual product:

- branch: `chore/upgrade-all-npm-latest`
- commit: [`699b2dc`](https://github.com/ivanoats/ndwt-ol-chakra/commit/699b2dc48466ed1fcbb8270fa151c021d770e197)
- PR: [#53](https://github.com/ivanoats/ndwt-ol-chakra/pull/53)

That PR is what the session was really for. Not "dependencies are updated," but "dependencies are updated in a way another human can review without wondering what else got mixed in."

## What I'm still not sure about

I do not know how long the current plugin ecosystem will make ESLint 9 the right holding pattern for this repo. The answer may change quickly, and when it does, the repo should probably move.

I am also not sure whether the next useful maintenance pass is more package churn or less. There is a point where "latest everything" starts producing more review noise than actual safety. This repo may have crossed that line for some tooling already.

And I do not yet know whether the bot review layer is getting better or just getting louder. On PR #53, Gemini posted several blocking comments that did not survive fact-checking against the npm registry or the installed lint stack. That is useful to know. It is not the same thing as useful review.

## The part I did not expect

The best outcome of this session is not the version bump. It is the reminder that maintenance work deserves the same care we usually reserve for features.

There is a very familiar way to do this kind of task: move fast, force the upgrade through, let the CI run, tell yourself you can sort out the rest in review. There is another way that looks slower from ten feet away and faster from the quarter after. Make a clean room. Prove the baseline. Upgrade only as far as the ecosystem will let you go honestly. Keep the diff small enough that another person can still see the shape of it. Name what you are not shipping yet, and why.

That is not caution for its own sake. It is stewardship. In a small repo, stewardship is how you keep maintenance from becoming a tax on whoever opens the project next - which, in a lot of cases, is just you in a worse mood.

## What you can do next

If you have a repo with an in-flight branch already open, try your next risky maintenance task in a separate worktree first. Run the existing checks before you upgrade anything. Then ask one harder question than "what is latest?": what is the latest version this project can actually carry without making the next reviewer do unpaid archaeology?
