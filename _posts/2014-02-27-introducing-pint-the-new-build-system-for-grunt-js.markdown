---
layout: post
title: Introducing Pint, the new build system for Grunt.js
date: '2014-02-27 20:00:00'
tags:
- javascript
- pint
- grunt
- build-tools
---

*Organize your build into small, testable pieces with Pint, a new dependancy-aware wrapper for Grunt.js. This interview with Pint creator Eric Baer describes why he developed Pint and how it's relevant for JavaScript developers.*

**Ivan: What is Pint?**

**Eric:** [Pint](http://www.pintjs.com/) is a small, concurrent build system for [Grunt.js](http://gruntjs.com/). The idea behind Pint is that your build is more than just a list of tasks. Pint attempts to create a build system by providing structure, lifecycle and other meta-level tasks to your existing Grunt build. 

<br>
**Ivan: What problems does Pint solve for JavaScript developers?**

**Eric:** Grunt has moved up in the world and we’re starting to see it used on large complex projects. As your build grows, like in any other piece of code, managing complexity becomes one of the hardest part about modifying it. We should be treating our build with the same engineering discipline that we treat other pieces of code with and with Pint I’m trying to nudge things in that direction. By encouraging good organization, building off of existing tooling, and automating build execution order, Pint can greatly reduce the complexity of maintaining your build. One side effect of this is that your team goes from having “the build guy” to sharing ownership of a collection of easy-to-understand files just like everywhere else. 

<br>
**Ivan: What are Pint’s major features/benefits?**

**Eric:** There are four main features of Pint:

* Organization - To me there are two elephants in the room when it comes to Grunt configuration: 1) Our file is organized by plugin, and 2) all the configuration is in one gigantic file. If I saw pull request that grouped all functions that do string concatenation in one area, I would have to question who let that person near a computer. Pint encourages you to think in terms of Jobs rather than plugins. A Job in Pint is a collection of Grunt tasks related to a single build step. While it uses all the same plugins and configuration as Grunt, everything related to a single Job (e.g. CSS post-processing) is grouped into one file and all of the steps for something like JavaScript compilation are in a separate file.

* Concurrency - It’s surprising that after a few years of development, Grunt hasn’t introduced any build dependency management since Ant back in the year 2000 had a depends-on statement. The concept is simple; each Job may depend on something that came before it. For example, copying the minified files to a dist directory would need to happen after all the compilation steps. In Grunt you are left to carefully craft this execution order on a per build basis. Pint solves this with a simple declarative dependsOn array in each Job. Declaring your dependencies lets Pint build an internal dependency model and parallelize your build where possible by spinning up new Grunt processes.

* Lifecycle - This is a small but important one. Often in projects you will need to do some tasks that are not strictly related to the build. Pulling the Git SHA or the package.json file into variables for use in cache busting for example. Pint uses a simple build lifecycle with initializer and finalizer tasks that are part of each Job for this purpose.

* Grunt Based - It’s always fun to play with new technology - especially on personal projects but in a large codebase it can be a really tough sell. For a large project, rolling out new tools can be challenging for a ton of reasons. The nice thing about Pint is that it is really just a few hundred lines of JavaScript around regular old Grunt. With Pint there is no new tool to roll out and nothing new to teach people. It’s just a better version of what you already have and since it’s the same Grunt config you can port your existing build quickly and easily.

<br>
**Ivan: What inspired you to create Pint?**

**Eric:** I come from a traditional computer science background and in school they really don’t teach you much about web. Where I went to school, classes were pretty heavy on C/C++ and Java, which is the type of development I ended up doing after graduation. When I moved into the world of front end development I found that the tools I was used to were way behind those in other communities. It’s a really exciting time to be involved with front end since there is so much out there we can learn from other languages.

<br>
**Ivan:  What other cool projects do you and Formidable Labs have up your sleeve (or out in the open)?**

**Eric:** Outside of client work, the good folks at [Formidable Labs](http://formidablelabs.com/) have had their hands full fostering the JavaScript community here in Seattle, which is really cool to be a part of. I think the next event we are hosting is a Backbone.js office hours this [Wednesday](http://www.meetup.com/seattlejs/events/163700782/). As for Pint, that’s been a personal project—not a Formidable Labs project—so between that and work I’ve kept plenty busy.

<br>
**Ivan: What inspires you about JavaScript and/or the JS community?**

**Eric:** I think the most exciting thing about being involved with JavaScript is that everything that’s old is new again. Developers on backend platforms have gotten pretty adept at deploying big apps on servers, sharing databases, ORM, etc. JavaScript on the other hand is just beginning to figure out all of this stuff. Since the environment is radically different it’s interesting to see some of the creative solutions. It’s a really exciting time to be involved with the web, especially with all the buzz around ECMAScript 6 and the last nails in the IE7 coffin. I’m excited to see what sorts of applications people will be building a few years from now. 

<br>
**Ivan: Where can JavaScript developers get started with Pint?**

**Eric:** The [Pint website](http://pintjs.com) has some good information and a quick start guide. I have a repo you can pull down and get started with right away, if you want to check out a [sample project built with Pint](https://github.com/baer/pint-sample). If you just want to checkout the source, the project is hosted on [Github](https://github.com/baer/pint).
