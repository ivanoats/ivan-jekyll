---
layout: single
title: How to Set Up Your Computer for Full-Stack JavaScript Development
date: '2014-03-15 19:00:00'
tags:
- javascript
- setup-tag
- tutorial
---

On day 1 of our Full-Stack JavaScript Development Accelerator, students set up their computers with the programs they will need for the next 8 weeks and beyond. If you are curious about our offerings, or are just getting started in web development, take a look at the programs and tools we use.

### Tools

Set up your computer with:

* [Latest version of Ruby](https://www.ruby-lang.org/en/)

* [Node.js](http://nodejs.org/)

* [PostgreSQL](http://www.postgresql.org/)

* [MongoDB](http://www.mongodb.org/)

* [Redis](http://redis.io/)

### Editors
#### Our choice:
We use [Atom.io](https://atom.io/) or [Sublime Text 3](http://www.sublimetext.com/3) in class, and I'm betting you already do too (unless you rock Vim or Emacs). Bonus: enjoy the full-feature, unlimited-time Trial mode.

#### Editors with debugging tools:
If you are coming from an IDE like Visual Studio or Eclipse, you may like [WebStorm](http://www.jetbrains.com/webstorm/) (trial version) better than Sublime Text because of the autocompletion and debugging tools. It's also cheaper for an academic license ($29 vs $79).

#### Open source:
If you're a strict proponent of open source, or want to dog-food and customize your editor in JavaScript, there are two great free editors: [Brackets](http://brackets.io/) and [Light Table](http://www.lighttable.com/).

### Free web services:
Sign up for:

* [GitHub](http://github.com/) (if you don't already have GitHub, you can submit an [education discount request](https://education.github.com/discount_requests/new).)

* [Pivotal Tracker](https://www.pivotaltracker.com/faq#istrackerreallyfreeforpublicprojectsindividualusenonprofitsandeducators)

### Set up on Mac OS:
##### <a href="/blog/how-to-set-up-your-computer-for-full-stack-javascript-development#ubuntu">Click here for Ubuntu »</a>

* [Homebrew](http://brew.sh) (The instructions are at the end of the web page.)

* rbenv, ruby-build, ruby 2.1.0 and the sass gem

  * `brew doctor`
  * `brew update`
  * `brew install rbenv ruby-build rbenv-gem-rehash`
  * `echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile`
  * `echo 'eval "$(rbenv init -)"' >> ~/.bash_profile`
  * `rbenv install 2.1.0`
  * `rbenv global 2.1.0`
  * `gem install sass`
  * Do NOT use sudo to install ruby or gems
  * If you get a permissions error when installing sass, somehow system ruby is still active. Try restarting your terminal, or if it persists, check for the items above in your .bash_profile file
  
* Node.js

  * `brew install nvm`
  * `nvm install 0.10`
  * `nvm alias default 0.10`
  * add `source $(brew --prefix nvm)/nvm.sh` to your .bash_profile or .zshrc
  * Reference the [NVM README](https://github.com/creationix/nvm/blob/master/README.markdown) if you get stuck

* PostgreSQL

  * Follow Ivan's blog post on [how to install PostgreSQL](https://www.codefellows.org/blogs/how-to-install-postgresql)

* Pick a programmer's editor:

  * Try out [Atom.io](https://atom.io/) and ask around for an invite.
  * Or go with the crowd and choose [Sublime Text 3](http://www.sublimetext.com/3)
     * [Package Control](https://sublime.wbond.net/installation)
  * Or try [Adobe's open source](http://brackets.io)
  * Which one should you choose? I like Atom.io and Brackets because you can customize them with JavaScript. Customizing Sublime requires knowledge of Python.

* MongoDB

  * `brew install mongodb`
  * You may not want it to start at login; it's pretty easy to just run MongoDB when you need it

* Redis

  * `brew install redis`
  * Same as above: you don't need it to start at login

* Heroku Toolbelt

  * `brew install heroku-toolbelt`

### <div id="ubuntu">Set up on Ubuntu:</div>

* No need for Homebrew; you already have a perfectly good [package management system](https://help.ubuntu.com/community/AptGet/Howto).

* In your terminal preferences, make sure that "Run Command as a login shell" is an enabled profile preference.

  * Reference these two screenshots ([1](http://cl.ly/image/220M3f093v2M) and [2](http://cl.ly/image/3i2O0y0A3e04)) for help

* rbenv, ruby-build, and [ruby](https://www.digitalocean.com/community/articles/how-to-install-ruby-on-rails-on-ubuntu-12-04-lts-with-rbenv--2)
  * Note: You DO NOT have to buy a digital ocean server. These are instructions for how to install LOCALLY. Ignore the create a server droplet step.
  * Note: Replace 1.9.3 with the latest version of ruby: 2.1.0

* gem install sass // DO NOT use sudo to install gems

* [Node.js](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

* PostgreSQL
  * Follow Ivan's blog post on [how to install PostreSQL](https://www.codefellows.org/blogs/how-to-install-postgresql)

* [Sublime Text 3](http://docs.sublimetext.info/en/latest/getting_started/install.html)

* [MongoDB](https://www.digitalocean.com/community/articles/how-to-install-mongodb-on-ubuntu-12-04) 
  * Note: You DO NOT have to buy a digital ocean server. These are instructions for how to install LOCALLY. Ignore the create a server droplet step

* [Redis](https://library.linode.com/databases/redis/ubuntu-12.04-precise-pangolin) 
  * Same note as above

* Heroku Toolbelt - sudo apt-get install heroku-toolbelt

There you go—all the tools we use in the [Full-Stack JavaScript Development Accelerator](https://www.codefellows.org/full-stack-javascript-development-accelerator). 

Questions, comments, or concerns? Let me know on the [GitHub repo](https://gist.github.com/ivanoats/10691384).