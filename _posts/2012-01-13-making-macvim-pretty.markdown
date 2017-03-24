---
layout: post
title: Making MacVim Pretty
date: '2012-01-13 22:29:00'
tags:
- editors
- vim
- programming
- macvim
---

The holy editor wars. Almost everyone has their favorite, and your colleague, conference mate, or cellmate will rabidly talk your ear off about one editor versus another. I have to admit, I bounce back and forth between TextMate and MacVim, and am closely watching my new up and coming favorite, [Vico](http://vicoapp.com).

Lately I've been favoring MacVim. Especially with these modifications I'm about to show you that make it... pretty!

![macvim screenshot](http://faculty.washington.edu/ivanoats/images/macvim_screenshot.gif)

First, there is [Alloy's MacVim fork](http://github.com/alloy/macvim). It gives you a nice Mac-like sidebar, project drawer - just like TextMate. The easiest way I found to install Alloy's fork is to use the normal homebrew recipe for macvim, but edit it, and point it to a new tarball that you've created. 

* install homebrew if you haven't already
* <code>git clone https://github.com/alloy/macvim.git</code>
* <code>tar -cvzf macvim-7.3-63.tgz macvim/</code>
* <code>brew edit macvim</code>
* change the line with the URL to something like `file:///Users/ivan/dev/macvim-7.3-63.tgz`. Make sure to use your own file path
* you can either delete the md5 line or calculate the md5 of your tgz file with: <code>md5 macvim-7.3-63.tgz</code>
* you may need to update the version if it has changed
* `brew uninstall macvim` if you already had it installed
* `brew install macvim`
* launch MacVim and press command-, to get the preferences window. You should now have the option to show the sidebar

Secondly, there is Geoffrey Grosenbach's [PeepOpen](http://peepcode.com/products/peepopen). It gives you an
improvement over TextMate's Command-T file picker. There are Vim plugins
that duplicate and improve on Command-T's functionality already, like
[Ctrl-P](https://github.com/kien/ctrlp.vim) but
none of them are a pretty Cocoa GUI like PeepOpen. It is a paid product, but it's worth the cost if you like to make your environment worth tolook at it.

Other reasons I am preferring Vim over TextMate lately are Tim Pope's excellent plugins: Rails.vim, and Fugitive.com (for Git). 

