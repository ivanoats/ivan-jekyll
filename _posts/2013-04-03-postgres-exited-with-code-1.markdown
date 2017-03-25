---
layout: single
title: 'Postgres Exited with code: 1'
date: '2013-04-03 19:38:00'
tags:
- postgres
- webdev
- macosx
- database
- homebrew
---


I had this problem with [PostgreSQL](http://www.postgresql.org/) installed via [homebrew](http://mxcl.github.com/homebrew/) on Mac OS X
(10.8.2) recently. I didn't seen anything immediately google-able.

```
> psql
psql: could not connect to server: No such file or directory
Is the server running   locally and accepting
connections on Unix domain socket "/tmp/.s.PGSQL.5432"?
```

In [Console.app](http://en.wikipedia.org/wiki/Console_(OS_X) I was seeing:
```
com.apple.launch.peruser.501: (homebrew.mxcl.postgresql[3678]) Exited with code: 1
```

Not much info there on why it was happening.

I found the answer in `/usr/local/var/postgres/server.log`

```
tail /usr/local/var/postgres/server.log
FATAL:  lock file "postmaster.pid" already exists
HINT:  Is another postmaster (PID 322) running in data directory
"/usr/local/var/postgres"?
```

There was no postgres running:

```
lunchy status
11:55 ivan
-1  homebrew.mxcl.postgresql

ps auxwww | grep postgres
grep postgres
```

So, the hint was misleading. The solution was just to delete the process
ID file (.pid)

```
rm /usr/local/var/postgres/postmaster.pid
```

Then launchd started up postgres automatically. I confirmend this with
`tail -f server.log`

