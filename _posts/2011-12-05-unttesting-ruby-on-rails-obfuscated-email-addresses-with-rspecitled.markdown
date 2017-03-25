---
layout: single
title: Testing Ruby on Rails Obfuscated Email Addresses with RSpec
date: '2011-12-05 23:26:00'
tags:
- ruby
- rspec
- email
- rubyonrails
- testing
---

You may have known that Ruby on Rails can protect email addresses that you have on your web pages with the [mail_to](http://api.rubyonrails.org/classes/ActionView/Helpers/UrlHelper.html#method-i-mail_to) view helper. But how do you test email obfuscation in your RSpec view tests?

To obfuscate an email address in a rails view, you can simply add encode: "javascript" to your mail_to helper.

```ruby
mail_to "you@example.com","email me", encode: "javascript"
```

To test this, I created a method in my spec/spec_helper.rb file. This method goes through each character (byte) of the string containing the email address, and calls the [sprintf](http://apidock.com/ruby/Kernel/sprintf) method to format the character in the way that the javascript decoder in rails can read.

```ruby
  def encode_email(email)
      # copied escape method from:
      #http://api.rubyonrails.org/classes/ActionView/Helpers/UrlHelper.html#method-i-mail_to
    escaped = ""
    email.each_byte { |c| escaped << sprintf("%%%x",c) }
    return escaped
  end
```

Having that method available makes my example very easy to read:
```ruby
it "should obfuscate and display the contact email" do
  render.should have_content(encode_email("contact@example.com"))
end
```

Do you know a better way? For example, hooking directly into the view helper code from [ActionView::Helpers::UrlHelper#mail_to](http://api.rubyonrails.org/classes/ActionView/Helpers/UrlHelper.html#method-i-mail_to)? Let me know in the comments.

