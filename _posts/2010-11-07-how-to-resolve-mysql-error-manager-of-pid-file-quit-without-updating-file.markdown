---
layout: single
title: 'How to resolve MySQL: ERROR! Manager of pid-file quit without updating file'
date: '2010-11-07 20:00:00'
---

This probably only applies if you are setting up MySQL via homebrew on your mac.

I ran the normal brew install mysql then found this error: ERROR! Manager of pid-file quit without updating file.

It turns out the solution was that I had missed part of the install instructions. Make sure to brew info mysql if you missed it after mysql installs. It contains the instruction you probably missed to mysql_install_db

Getting the database set up properly resolved the error for me.

UPDATE: After upgrading to Mac OS 10.6.5, I had the same error. I was stumped, until I realized that Apple’s update had changed the write permissions on /usr/local I ran `sudo chmod g+w /usr/local` and then restarted mysql, and it worked!

UPDATE 2: Dima Kovalenko  adds:
`sudo chmod -R 777 /usr/local/var/mysql`

if you do not do this, server does not give your user permission to write to the pid file and server does not start.

P.S. 777 is probably an overkill but you know... ;)