---
layout: single
title: Epic Install Post is Epic
date: '2014-12-18 05:58:02'
tags:
- vim
- macosx
- install
- brew
- nvm
- chruby
- solarized
---

*How I Set Up My Mac for Development*

This is just the way I do it. It's a good way. It's not perfect. It probably could be automated more, but this is good enough for me. Hopefully it's a good starting point for you, too! Make sure to think about if you need all of these pieces yourself before blindly following my instructions.

## Wot, you actually use CAPS LOCK? Geezer!
First off, gotta have my Control-a working and easy. I change caps lock to control (keyboard icon in system prefs)

## Install Homebrew
Homebrew is the best and most up-to-date package manager for the Mac. Follow the instructions on [the bottom of their site](http://brew.sh), but it should be:
`ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

This should install the XCode command line tools for you on Yosemite, but you may also have to run `xcode-select --install` first.

## Install All My Mac App Store Apps
via the Mac App Store app:

* Evernote
* OneNote
* Buffer
* ReadKit
* Slack
* Browser Fairy
* OneDrive
* Viewfinder
* Mouseposé
* Textastic
* MindNode Pro
* Jump Desktop
* Tweetbot for Twitter
* Pocket
* Boom
* Dash
* Divvy
* Fantastical
* iKeyboard
* Xcode
* Base
* Patterns
* Growl
* iNet Network Toolbox
* Byword
* Pomodoro
* Chill
* Skitch
* GeekTool
* Go2Shell
* HTTP Client
* The Unarchiver
* CloudApp
* Caffeine
* Kindle

## Use Brew Cask for Non Mac App Store Apps
Also, some apps are  more powerful if you use the non-mac app store version, so that's why they are listed here.

### Install Brew Cask
Follow the instructions in the [README](http://caskroom.io), but it should be:
`brew install caskroom/cask/brew-cask`

### BREW CASK ALL THE APPS

`brew cask install  rubymine webstorm rubymine intellij-idea acorn alfred arq atom bartender base brackets cloudup default-folder-x dropbox firefox flux gitbook gitter google-chrome google-drive istat-menus iterm2 java limechat marked omnifocus onepassword pdfpen qlmarkdown qlprettypatch quicklook-json screenflow soulver sourcetree sublime-text3 textexpander transmission transmit vlc vmware-fusion xquartz` 

Now, if only there was an easy way to automatically install all the licenses... wishful thinking!

## Bash Is Old, Oh-My ZSH!
Install "oh-my-zsh" according to the instructions in their [README](https://github.com/robbyrussell/oh-my-zsh/blob/master/README.textile)

I have a custom color scheme. I add my branch of oh my zsh as a remote to `~/.oh-my-zsh` and `git pull ivanoats master`

## BREW ALL THE THINGS
Homebrew makes installing all the development tools and utilities easy. Here's what I install

`brew install python git hub tmux tree chruby ruby-install nvm the_silver_searcher ack macvim reattach-to-user-namespace cowsay heroku-toolbelt maven sqlite watch go gnupg2 siege ttyrec`

## Clone Your Dotfiles
You keep your dotfiles on Github, right? I do. They are in a private repo but eventually I will open source them.  Let me know if you're interested in specific parts.

* Clone my dotfiles into ~/dotfiles
* Set up my standard directories:
```
mkdir ~/bin
mkdir ~/dev
```

## Set up Vim
I use the a vim plugin manager called [Vundle](https://github.com/gmarik/Vundle.vim) because it's the best.

* install vundle following the directions on their [README](https://github.com/gmarik/Vundle.vim).

## Set up Powerline
Powerline gives me my cool prompt that lets me see current git branch and other neat stuff, especially in tmux and vim. Powerline requires some special fonts.  I love [Inconsolata](http://levien.com/type/myfonts/inconsolata.html) and also use the [Powerline version](https://github.com/powerline/fonts/tree/master/Inconsolata). Install it by double-clicking on the .otf file after it downloads.

```
pip install git+git://github.com/Lokaltog/powerline
pip install psutil
```
## Set up tmux and config files
I keep these in my dotfiles, if you are interested in them, let me know, and I will [gist](https://gist.github.com) the details.

```
ln -s ~/dotfiles/bin/safe-reattach-to-user-namespace ~/bin/safe-reattach-to-user-namespace
ln -s ~/dotfiles/.tmux.macosx ~/.tmux.macosx
ln -s ~/dotfiles/tmux.conf ~/.tmux.conf
```

## Databases
Which databases do you want? postgres, mongo, redis ? They are all available via `brew install`

`brew install postgres mongo redis`

## Set up Ruby and Gems
I use [chruby](https://github.com/postmodern/chruby) because it fucks with me the least. Strange but true. Also helpful is its companion, [ruby-install](https://github.com/postmodern/ruby-install). 

Once they are installed (via homebrew, of course, above)
```
ruby-install ruby 2.1.5
```
Make sure something like this is in your .zprofile or .zshrc
```
source /usr/local/opt/chruby/share/chruby/chruby.sh
chruby ruby-2.1.5
```
Open a new terminal and `gem update` to make sure you have the latest gems.

I usually install at least: `gem install coderay lunchy travis pry gist foreman sass minitest`

## Set up Node Version Manager
It's nice to have more than one version of NodeJS available. 

```
mkdir ~/.nvm
nvm install 0.10
nvm alias default 0.10
npm install -g jshint bower nodemon secretkey
```

## Set up Solarized colors
[Solarized](http://ethanschoonover.com/solarized) is a color-scheme tailored for readability. "Precision colors for machines and people" by Seattle's own Ethan Schoonover.  There's so much useful stuff in there that I usually just clone the repo into my ~/dev folder.

`git clone git@github.com:altercation/solarized.git`

It's got an apple color scheme for your built-in color picker, Terminal colors, iTerm colors, IntelliJ colors, and much more.

# ONE MORE THING
Congrats, you did it! Now you can run:
`cowsay EPIC INSTALL $USER !`


