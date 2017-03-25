---
layout: single
title: DRY Up Your Factory Girl Factories With RSpec and Cucumber
date: '2011-11-29 05:19:00'
tags:
- ruby
- tdd
- rspec
- cucumber
- dry
- bdd
---

When I first set up the fixture replacement gem [Factory_Girl](https://github.com/thoughtbot/factory_girl) in my current [Ruby on Rails](http://rubyonrails.org) project, I had two files with the same code in each one, creating the same factory twice. One in [RSpec's](https://www.relishapp.com/rspec) spec/factories directory, and another in [Cucumber's](http://cukes.info/) features/support directory. According to the [Don't Repeat Yourself (DRY)](http://en.wikipedia.org/wiki/Don't_repeat_yourself) principle, this was not ideal. How to fix?

I asked the question in the #rspec channel on [IRC](http://webchat.freenode.net), and lucky me, [David Chelimisky](http://davidchelimsky.net/), the lead developer/maintainer of RSpec, answered. Simply require the factory file from RSpec in Cucumber's features/support/env.rb file. Like this:

```ruby
require_relative("../../spec/factories/model_name.rb")
```
But this could get quite tedious, if you have more than one model. Which of course, you probably do. So, here's a snippet that will load all of your factories:

```ruby
Dir["../../spec/factories/*.rb"].each {|file| require_relative file }
```
I put this in my features/support/env.rb file. If you use Spork, I put it in my Spork.each_run section.

Are you using [factory_girl](https://github.com/thoughtbot/factory_girl), [machinist](https://github.com/notahat/machinist), or another [fixture replacement](https://www.ruby-toolbox.com/categories/rails_fixture_replacement) library? Let me know in the comments if you know a better way to do it.

