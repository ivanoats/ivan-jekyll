---
layout: post
title: Code Fellows adds ReactJS to the JavaScript Development Accelerator
date: '2014-12-12 20:42:27'
tags:
- javascript
- codefellows
- reactjs
- reactive
- flux
---

The pace of change in the JavaScript community is vertiginously fast, like experiencing high g-force turns in a fighter jet. In the past year for our front-end framework choice, we have gone from teaching [BackboneJS](http://backbonejs.org), to [AngularJS](https://angularjs.org), and now we are adding in [ReactJS](http://facebook.github.io/react/). 

## Why teach ReactJS and Flux Architecture?
It's not just because they are the latest new hotness, although, it is gaining in popularity, very fast. A lot of the programmers I respect have encouraged us to teach it, and are using React in their own companies and projects. It's also an important, and possibly simpler, alternative to the MVC or MV* architectures that have been used for almost every web app project for many years.

## What's good? Why React?
 Having built some code in React, it's worth adding to your toolset or considering on a new project. It have some great advantages:
 
* It's only the view layer. So it's simpler to understand what things you need to learn, compared to a whole MV* framework like Angular. You can use your favorite router, like Backbone, Angular, or Facebook's Dispatch.

* JSX (JavaScript + XML, essentially HTML tags) is a great addition to the build process. You probably already use Browserify, CoffeeScript, or some other transpiler or build process anyway.  Being able to specify the HTML and JS for your web component in one place makes it easier to understand exactly what it does. And, the reactify JSX transform for Browserify fits right in to your build flow.

* JSX tags are easier to understand your app with. The Chrome Developer Tools [React Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) is great debugging tool

* The [Reactive Manifesto](http://www.reactivemanifesto.org) outlines how all applications are becoming more "Reactive". If you haven't seen it yet, it's worth a read. Also read about [Functional Reactive Programming](http://en.wikipedia.org/wiki/Functional_reactive_programming).

* The next version of JavaScript is EcmaScript version 6 ([Harmony](https://github.com/facebook/react/blob/master/examples/basic-jsx-harmony/index.html)). ES6 mode saves some time, lines of code, andoffers great new features.

[Ryan Sobol](http://www.codefellows.org/blog_authors/23), Director of Education & Technology at Code Fellows says: 

> You have nodes within nodes, for example you have body, and within that you have a div, and within that you have an h1. And so the way that react component works is they are a basically a 1:1 mapping. You create your custom components and your custom sub-components. I really like that paradigm, it helps me think as a front-end developer about the stuff that I actually care about - the way the content is presented to the user. 

> I like the patterns that ReactJS uses, for example, it has some optional methods that you can use to implement various different lifecycle hooks [the stuff that was inspired by iOS] , like shouldUpdateComponent.  In my opinion in Backbone, the view system is highly evented, and it's really easy to get tanlged in an event cascade, where events are triggering other event, and then triggering other events. For me, it's hard to keep that model in my mind. Whereas React for every single component, it's pretty easy to tell what the lifecycle of that single component is.

> I like the one-way binding system.  I like how it creates this single circular flow of responding to events, changing the model and updating the view. It's easy to reason about. 

Ryan Roemer, our partner at [Formidable Labs](http://formidablelabs.com/blog/2014/11/21/backbone-and-react/) says ReactJS has these pros and cons: 
> * Heavy handed DOM wiping and reflows.
> * Memory leaks and dreaded "Zombie Views".
> * A slimmer overall minified bundle. With React as the view layer, we can remove dependencies on jQuery and Underscore.js.
> * Server-side rendering. This is a huge feature, and actually quite easy with React. Even better, if you have a single-page JavaScript application for your site, React can bootstrap the HTML of the page server-side and then startup the app without re-rendering any HTML!
