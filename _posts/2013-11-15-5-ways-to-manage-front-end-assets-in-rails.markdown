---
layout: post
title: 5 Ways to Manage Front-End Assets in Rails
date: '2013-11-15 20:00:00'
tags:
- javascript
- rails
- assets
---

*Ready to have the latest and greatest HTML5, JavaScript and CSS3 components like Angular and Ember in your Ruby on Rails application?*

Choose one of these five strategies to ensure that you successfully have up-to-date, third-party code included in your app.

### Strategy One: Download from Source
Just download the code from each website and put it in the `vendor/assets/` directory. This is a simple strategy that is easy to implement right away. It also is somewhat naïve. It’s not automated. Updating the code will be a a slow point-and-click process that is hard to duplicate when you have a new developer on board. You may have to hand-code and copy particular assets to the correct file paths, which is error-prone and time consuming.

### Strategy Two: Use a Ruby Gem Including a Rails Engine
There are many Ruby gems that package front-end assets into a convenient and easy-to-use gem. [Bundler](http://bundler.io/) is great at managing gems and keeping them up-to-date. But that’s only if the gem’s maintainer keeps the front-end assets current. Unfortunately, that doesn’t happen very often and [frequently takes a long time](https://github.com/thomas-mcdonald/bootstrap-sass/issues/428). And even worse, each ruby gem packages front-end assets in a slightly different way.

### Strategy Three: Use Bower and Configure Rails
[Bower](http://bower.io/) is a package manager for front-end assets. It can help you install and keep your Javascript and CSS assets up to date very easily and efficiently. Bower depends on [Node](http://nodejs.org/), [npm](https://www.npmjs.org/), and [git](http://git-scm.com/) and can be installed via `npm install -g bower`. You’ll have to configure both Bower and Rails to know about each other and install things to the right directory. There are a couple of great guides (<a href="https://coderwall.com/p/hhaxlg" target="_blank">1</a>, <a href="https://coderwall.com/p/6bmygq" target="_blank">2</a>) on [coderwall](https://coderwall.com/ivanoats) for this already.

### Strategy Four: Use the Bower-Rails gem
Luckily, coders at a company called [42dev](https://twitter.com/42_dev) created the [bower-rails gem](https://github.com/42dev/bower-rails). It makes installing and updating Bower packages quite a bit easier. It includes rake tasks for the above, and also has a nice Ruby Domain Specific Language (DSL) for specifying which packages you want included, via a [Bowerfile](https://github.com/42dev/bower-rails#ruby-dsl-configuration). As of today, the README for the gem is missing a few small steps, so I wrote up an overview of the process for a [lightning talk](https://speakerdeck.com/ivanoats/bower-and-rails) that I gave at the recent [Seattle.js meetup](http://www.meetup.com/seattlejs/) at Facebook here in Seattle.

<script async class="speakerdeck-embed" data-id="1865304045840131002222524170b49d" data-ratio="1.29456384323641" src="http://speakerdeck.com/assets/embed.js"></script>

### Strategy Five: Use Rails-Assets.org
Last, but most certainly not least, there is an even newer, slicker way to manage your front-end assets in Ruby projects: [RailsAssets.org](http://rails-assets.org/).

Add `https://rails-assets.org` as an additional, new Ruby gem source in your `Gemfile`, and reference any Bower components as `gem 'rails-assets-BOWER_PACKAGE_NAME'`. For example, to pull in Twitter bootstrap, you would use `gem 'rails-assets-bootstrap'`. Don’t forget to also reference the Bower package name in your asset pipeline (application.js and application.css)

#### Want to Learn the Professional Tools That the Top Ruby on Rails Developers Use?

Sign up for one of our [workshops, classes, or Development Accelerators](http://www.codefellows.org/calendar) and learn from us in person!