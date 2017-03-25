---
layout: single
title: A Tiny Easy Webserver for Test Project Directories
date: '2013-11-14 17:23:00'
tags:
- javascript
- ruby
- webdev
- webrick
---


I like to try out ideas in little throwaway project directories. It gives me an isolated space to play in, and work on one concept at a time. It's really handy to have an easy way to start up a web server from the current directory. Here is how I do it:

```bash
serve () {
  port="${1:-3000}" 
  ruby -r webrick -e "s = WEBrick::HTTPServer.new(:Port => $port, :DocumentRoot => Dir.pwd); trap('INT') { s.shutdown }; s.start"
}
```

This code above createas a bash/zsh function that will start up a server for the current working directory. The server will default to port 3000, but you can also type `serve 3001` to put it on a different port. The only prerequisite is that you have a working ruby installed on your system. (Which comes with Mac OS X)

I put this function into my ~/.bashrc, ~/.zshrc, or a file that gets included at login, so it's always available. Then you can just `serve` from any directory that has an index.html file, and visit `http://localhost:3000` in your browser.

A main advantage of doing this to visit html / js files is that it is an easy way to overcome the [CORS/same origin problem](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Same_origin_policy_for_JavaScript) where you can't include scripts.

Another advantage of this is that it makes it very easy to use [Jasmine](http://pivotal.github.io/jasmine/).

There are also some [other ways](http://stackoverflow.com/questions/3708804/fire-up-a-web-browser-for-a-folder/14916690#14916690) to do this. I'd be very interested to hear what the easiest way to do this on Windows is. 

