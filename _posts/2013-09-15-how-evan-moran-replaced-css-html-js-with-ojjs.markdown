---
layout: single
title: How Evan Moran replaced CSS-HTML-JS with OJJS
date: '2013-09-15 19:00:00'
tags:
- ojjs
- webdev
---

*OJJS introduces the idea that you can do more and code less by using javascript to replace the HTML/CSS/JS system.*

If you have wondered how this is possible, we were intrigued too, which is why we reached out to Evan Moran, creator of [OJJS](http://ojjs.org/),  for an interview.

### How did you discover that JavaScript could replace HTML and CSS?
Instead of the word ‘replace’ let's use "abstract away" in the sense that compilers abstract away assembly. With OJ, you can still use HTML and CSS the way you did before, but OJ can use objects that generate their own HTML/CSS/JS for you. This may not seem like a big deal for the Table object, but for YouTubeVideo, AceEditor, or TwitterButton this means you need to write a lot less code.

![image](http://i.imgur.com/bQgDZqT.jpg)

As to how I discovered it: The first idea came from trying all these different templating languages -- Less, Stylus, SASS, Slim, Jade, etc. They all generate HTML/CSS in different ways, but they also all started adding language features like variables, if statements, loops, and functions. So I wondered, why are we creating all these new languages when we already have JavaScript? That's when I started making a library to unify templating around JavaScript.

The second insight was that creation wasn't enough. Once you make a page, you want to be able change it easily. As it turns out, objects are the key. Objects can represent parts of a website already on the page. Objects provide methods and properties to help change themselves (with DOM manipulation). Therefore, a Table object, for example, could have an addRow or removeRow method, and a YouTubeVideo could have a volume property and pause and play methods.

### How would this improve the workflow for a developer? What kind of developer do you think will respond best?

On the client side, all you have to do is include oj.js + the plugins you want and the plugins will work. You can VimeoVideos in one line and never read a single line of Vimeo documentation! ([Proof by jsfiddle!](http://jsfiddle.net/evanmoran/yPXuL/))

Server-side OJ works best (for now!) for people making static sites (think GitHub pages). Take a look at the OJ commandline tool (install with `npm install -g oj`). You can write OJ code, and the tool outputs static HTML and CSS for you. The best part is that the oj commandline tool uses Node's npm as a package manager, so if you just require OJ plugins, they'll be included automatically. --minify and --watch options are built in.

Right now, I’m working on Express support for node webserver folks. I also see the commandline tool as the integration point for other frameworks like Rails, but this isn't finished yet. Keep in mind that OJ is just a JavaScript library that generates HTML/CSS/JS files, so if a framework can interface with those kind of files (e.g., all of them!) it should eventually be able to interface with OJ. We just need to output the files in the right way.

### How do see this integrating with a typical HTML/CSS designer, or is it just for programmers?

In OJ, CSS is a simple JSON format. This looks a ton like CSS, but you need to quote strings and selectors. Since many non-technical folks can edit JSON, designers should be able to edit this easily enough.

For example this is the OJ for making all paragraphs blue on a phone and red everywhere else:

	css({
      p:{
        color:'red',
        '@media phone':{
          color:'blue'
        }
      }
    })
    
Another question I get asked a lot is how do you separate content (HTML) from presentation (CSS). In OJ, this separation still exists--it's just in JavaScript now. If you want, of course, you can still put the code in separate files. You can also pull these components out into separate functions and variables -- this is as powerful as it sounds! OJ also has a big theming feature that lets you define css that you can dynamically add to objects.

Check out this [JSFiddle example](http://jsfiddle.net/evanmoran/RmM96/) to get a better idea of what that looks like.

It's true that it's a little different from what designers are used to, but the syntax is still pretty clear, and since you can group this code by file or function, however you want, a designer should be able to easily change the themes & CSS across a website.

### What are the most interesting theoretical things that could be done with OJ?

In the MVC sense OJ is just the View. OJ isn't trying to create Models or Controllers. In fact, it isn't a framework--it's just a library trying to make the best View abstraction possible. To this end, I could also see it being plugged into something like EmberJS or AngularJS to act as a powerful rendering layer. It's true that OJ binds to Backbone models out of the box, but a simple wrapper should let it work with any model system.

### How can people help to get the word out about OJ?

More than anything I'm looking for people to try it and write about it! I'm making my best guesses about what the community would find useful, but the more people who try and give feedback the better it will get. One early reaction was that this thing is too big--so one of my biggest priorities right now is shrinking the size. I made it 7% smaller just this afternoon--and I have a lot more ideas for improvement!

Also, feel free to reach out to me directly. I love helping people get started and you can reach me on Twitter ([@evanmoran](https://twitter.com/evanmoran)), or even ask questions on Stack Overflow and I'd be glad to answer them.

Do you have a broader vision for where you're going to take this?

Now that the syntax is pretty solidified, long term I'm looking to really increase the number of plugins. There is no limit to where this can go: Grid Frameworks, UI Controls, Maps, Charts, anything that's hard to use and/or ties to data! In the short term, though, I'm focusing on the core library:

1. Shrink Filesize by 50%
1. Improved Rendering Performance
1. Express Support

If you find this interview helpful please upvote it at Hacker News. We'd love to keep doing more!

##### Contact Evan on Twitter ([@evanmoran](https://twitter.com/evanmoran))
