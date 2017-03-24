---
layout: post
title: An Easy Way to Make New Elm Apps
date: '2015-10-11 17:00:00'
tags:
- webdev
- front-end
- elm
- brunch
- webapps
---

#### And even if you don't do Elm, try Brunch.

The process of setting up the currently popular ([Grunt]() or [Gulp]()) build tools for front-end web apps takes too long, and involves too much boilerplate code.

[Brunch](http://brunch.io) is a great solution. It is fast, easy to set up, and reduces boilerplate.

Also, and more importantly, the combination of writing an web app in 3 different languages (JavaScript+HTML+CSS) is just ... insane. Why do we do this to ourselves every day?

[Elm](http://elm-lang.org) is a programming language that brings the best of functional programming to the web. It offers a promise of no run-time exceptions (*Good riddance* `X is not a method of Undefined`), faster rendering than [ReactJS](https://facebook.github.io/react/), libraries with guarantees, clean syntax, smooth JavaScript interoperability, and a Time-traveling debugger.

Elm has an easy way to get started called [StartApp](https://github.com/evancz/start-app). I recommend trying it out and reading the source.

### Brunch and Elm
If you'd like to use Brunch with Elm, I made a Brunch skeleton for StartApp here:
https://github.com/ivanoats/elm-brunch-starter

You can simply `brunch new gh:ivanoats/elm-brunch-starter APPNAME` to try it out. You'll get a working "Hello World" start app and build process, ready to go.

It didn't take long thanks to the great work already done by Mads Flensted-Urech on 
https://github.com/madsflensted/elm-brunch

It was also inspired by Mike Clark's [Building Reactive Web Apps](https://pragmaticstudio.com/elm) video course at Pragmatic Studio, which I'd highly recommend.

Photo Credit: [American Elms in Central Park](https://www.flickr.com/photos/mikerollinger/539899740)