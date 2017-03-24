---
layout: post
title: How to  Set Up Your First Minispec Project from Scratch
date: '2014-03-02 06:35:00'
tags:
- ruby
- minispec
- tdd
- tatft
---

 *Get a simple ruby project going, the right way.*
 
 All this program is going to do is have a class that says "Welcome".

**Note:** I don't care what editor you use. I am going to call the command `edit`.

* If you use Sublime text, you can `alias edit="subl"`
* If you use Vim, you can `alias edit="vim"`
* If you use Brackets, you can `alias edit="open -a Brackets.app"` You get the idea.

<hr>

First step: Create a directory for your project:

    mkdir my_project && cd my_project

Now create two subdirectories, like this:

    mkdir lib spec

Now open the current directory up in your editor:

    edit Rakefile

Put the following text into the Rakefile. Don't copy and paste. Type it out so that you get familiar with it and get used to typing ruby code.

    require 'rake/testtask'

     Rake::TestTask.new do |t|
      t.libs << "spec"
      t.pattern = "spec/**/*_spec.rb"
     end

* Try the `rake` command. You'll get an error, about no default task. Let's put this thought on hold for a sec.
* Try the rake test command. You'll get no output—OK, you haven't written a spec yet, so that makes sense.

Now it's time to create your first spec file: `edit spec/welcome_spec.rb`

And put the following text into the spec file:

    require "minitest/spec"
    require "minitest/autorun"

    describe Welcome do
      it "has a message" do
        hello = Welcome.new
        hello.message.must_match "Welcome"
      end
    end
    
Now, run the spec with `rake test`. You should see something like this:

    rake test
    /Users/ivan/dev/my_project/spec/welcome_spec.rb:4:in `<top (required)>': uninitialized constant Welcome (NameError)
      from /usr/local/var/rbenv/versions/2.0.0-p247/lib/ruby/site_ruby/2.0.0/rubygems/core_ext/kernel_require.rb:53:in `require'
      from /usr/local/var/rbenv/versions/2.0.0-p247/lib/ruby/site_ruby/2.0.0/rubygems/core_ext/kernel_require.rb:53:in `require'
      from /usr/local/var/rbenv/versions/2.0.0-p247/lib/ruby/gems/2.0.0/gems/rake-10.1.0/lib/rake/rake_test_loader.rb:10:in `block (2 levels) in <main>'
      from /usr/local/var/rbenv/versions/2.0.0-p247/lib/ruby/gems/2.0.0/gems/rake-10.1.0/lib/rake/rake_test_loader.rb:9:in `each'
      from /usr/local/var/rbenv/versions/2.0.0-p247/lib/ruby/gems/2.0.0/gems/rake-10.1.0/lib/rake/rake_test_loader.rb:9:in `block in <main>'
      from /usr/local/var/rbenv/versions/2.0.0-p247/lib/ruby/gems/2.0.0/gems/rake-10.1.0/lib/rake/rake_test_loader.rb:4:in `select'
      from /usr/local/var/rbenv/versions/2.0.0-p247/lib/ruby/gems/2.0.0/gems/rake-10.1.0/lib/rake/rake_test_loader.rb:4:in `<main>'
    rake aborted!
    Command failed with status (1): [ruby -I"lib:spec" -I"/usr/local/var/rbenv/versions/2.0.0-p247/lib/ruby/gems/2.0.0/gems/rake-10.1.0/lib" "/usr/local/var/rbenv/versions/2.0.0-p247/lib/ruby/gems/2.0.0/gems/rake-10.1.0/lib/rake/rake_test_loader.rb" "spec/**/*_spec.rb" ]

    Tasks: TOP => test
    (See full trace by running task with --trace)
   
It's OK. I wanted to show you this error. It's long. It's called a stack trace. 

Get used to decyphering these. The key thing is to look at the first few lines carefully. I've noticed in my classes that some people are afraid of scrolling up to the beginning of the error. Don't be that guy. Scroll back if you have to, and take a careful look at the start of the stack trace. 

The first significant message is "uninitialized constant welcome (NameError)". So, in line 4 of welcome_spec.rb, what happened? Well, Ruby tried to find something called Welcome. There was no class called Welcome, so Ruby tried to look for a constant, because the convention in Ruby is that CONSTANTS ARE ALL UPPERCASE, OR AT LEAST START WITH AN UPPERCASE LETTER.

So what? Well, we have written a test, but now we have to write the implementation. Let's write our Welcome class.

Go ahead and `edit lib/welcome.rb` and put in the following lines:

    class Welcome
    end
    
Now, after you save the file, and `rake test` again, you...still get the same darn error. What?! Oh. One more thing. You have to require the file in your spec file. Modify your spec file to add in this require line:

    require "minitest/autorun"
    require "minitest/spec"

    require "welcome"   # Add in this line, this comment is optional

    describe Welcome do
      it "has a message" do
        hello = Welcome.new
        hello.message.must_match "Welcome"
      end
    end
    
Now, when you `rake test`, you'll see:

    # Running:

    E

    Finished in 0.000944s, 1059.3220 runs/s, 0.0000 assertions/s.

      1) Error:
    Welcome#test_0001_has a message:
    NoMethodError: undefined method `message' for #<Welcome:0x007f861b8c6420>
        /Users/ivan/Nitrous.IO/blog/code-rails-chapter-1/spec/welcome_spec.rb:8:in `block (2 levels) in <top (required)>'

    1 runs, 0 assertions, 0 failures, 1 errors, 0 skips
    rake aborted!

Undefined method `message` is the key here. We haven't told our Welcome class that it has a way of setting or getting the message. Our Welcome class does not have a method called message yet. Let's set that up as a readable and writable property, which is called an accessor in Ruby:

    class Welcome
      attr_accessor :message
    end
    
Ok, run `rake test` again:

    # Running:

    F

    Finished in 0.000940s, 1063.8298 runs/s, 2127.6596 assertions/s.

      1) Failure:
    Welcome#test_0001_has a message [/Users/ivan/Nitrous.IO/blog/code-rails-chapter-1/spec/welcome_spec.rb:8]:
    Expected /Welcome!/ to match nil.

    1 runs, 2 assertions, 1 failures, 0 errors, 0 skips
    rake aborted!
    
Alright! This error message hits a little closer to home. It makes more sense. Remember, in our spec we are saying the message must_match "Welcome!" But, message is currrently not set, it is nil, so it does not match "Welcome!" We need to set the `@message` instance variable. Let's do that in the class `initialize` method:

    class Welcome
      attr_accessor :message

      def initialize
        @message = "Welcome to ruby"
      end
    end
    
Now, when you `rake test`, you should see something like:

    # Running:

    .

    Finished in 0.000989s, 1011.1223 runs/s, 2022.2447 assertions/s.

    1 runs, 2 assertions, 0 failures, 0 errors, 0 skips

Great! Our spec passes.

Now, there's just one more little thing. Wouldn't it be great to save a few key presses every time you run a spec? Sure. Let's set up `test` as the default task for the rake command. Edit the `Rakefile`.

    require 'rake/testtask'

    task default: 'test'          # add this line

    Rake::TestTask.new do |t|
      t.libs << "spec"
      t.pattern = "spec/**/*_spec.rb"
    end
    
Now, you can just `rake` and your spec will run. Try it out!

In this post we learned a simple way that ruby projects can be set up. We used Behavior-Driven-Development (BDD) to specify the desired behavior of a class, before writing the implementation of that class.