---
layout: single
title: Setting up Phantom.js on Ubuntu
date: '2014-01-08 23:40:00'
tags:
- javascript
- ubuntu
- phantomjs
---


[PhantomJS](http://phantomjs.org) is a headless (no GUI) browser used for testing and capturing screen shots of web sites. I use it to test JavaScript in Ruby on Rails apps, along with [Poltergeist](https://github.com/jonleighton/poltergeist), a driver for [Capybara](http://jnicklas.github.io/capybara/), the library for simulating user interaction with a web application.

1. Go to the [PhantomJS download page](http://phantomjs.org/download.html)

2. Download the Linux binary, it will be something like this [phantomjs-1.9.2-linux-x86_64.tar.bz2](https://phantomjs.googlecode.com/files/phantomjs-1.9.2-linux-x86_64.tar.bz2)

3. un-bzip and untar the archive file.
``` plain
bunzip2 phantomjs-1.9.2-linux-x86_64.tar.bz2
tar -xvf phantomjs-1.9.2-linux-x86_64.tar
``` 
4. move the file into the /opt directory
``` plain
sudo mv phantomjs-1.9.2-linux-x86_64 /opt/phantomjs
```
5. If you don't have a `~/bin` directory in your path, now would be a good time to make one and include it in your path.

6. Link the phantomjs executable to a link in your `~/bin` directory.
``` plain
cd ~/bin
ln -s /opt/phantomjs/bin/phantomjs phantomjs
```
7. You're done! Test out the phantomjs command with `phantomjs --help`
