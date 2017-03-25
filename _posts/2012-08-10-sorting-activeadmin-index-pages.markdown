---
layout: single
title: Sorting ActiveAdmin Index Pages
date: '2012-08-10 19:57:00'
tags:
- rails
- webdev
- activeadmin
- oo
---

Here's how I got my list of
[Philosoraptors](http://knowyourmeme.com/memes/philosoraptor) sorted in a
[Ruby on Rails](http://rubyonrails.com) [ActiveAdmin](http://activeadmin.info)
app:

```ruby
ActiveAdmin.register Philosoraptor do
  controller do
    def index
      params[:order] = "name_asc"
      super
    end
  end 
end
```

Because each Resource in ActiveAdmin (meaning table in the database,
or rails model) has a controller, you can 
[modify the controller](http://activeadmin.info/docs/8-custom-actions.html#modify_the_controller).
What I did above was just add to the params array a key called ```order``` with a value of ```name_asc``` - meaning I wanted my philosoraptors to be sorted in order to by name, ascending (from a to z). 

You can find out these order key values by looking at the end of 
the URL in your browser, in Active Admin. The query string will be everything after the ? in the URL, after clicking on one of the column names in the top row of the table.

In my code example above, I put in the order parameter, then I called
```super``` on the method to inherit the rest of the controller code from
ActiveAdmin.

Hopefully you find that this works for you. It's a pretty easy way of setting
up a default sort in ActiveAdmin. Let me know if you have any comments or troubles getting it working in your app.
