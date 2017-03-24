---
layout: post
title: How to Get the Purchase Order Field Working in the PayPal Payflow Gateway for
  the ActiveMerchant gem
date: '2012-09-13 22:53:00'
tags:
- rails
- ruby
- webdev
- paypal
- activemerchant
---

This is pretty obscure, but if you need to fill out the PONUM (Purchase Order) field while communicating with the PayPal Payflow gateway, here's how to ensure the info gets transmitted to PayPal. It's not well documented in either the PayPal or ActiveMerchant documentation.

I'm using the ruby gem [ActiveMerchant](http://activemerchant.org/) and the [PayPal Payflow Gateway](http://rdoc.info/github/Shopify/active_merchant/ActiveMerchant/Billing/PayflowGateway)

The PayFlow gateway has an instance method called
[authorize](http://rdoc.info/github/Shopify/active_merchant/ActiveMerchant/Billing/PayflowGateway#authorize-instance_method)

```ruby
# File 'lib/active_merchant/billing/gateways/payflow.rb', line 16

def authorize(money, credit_card_or_reference, options = {})
  request = build_sale_or_authorization_request(:authorization, money,
credit_card_or_reference, options)

  commit(request, options)
end
```

You put your PO Number in the options hash, like this:

```ruby
options = {
  billing_address: address,
  comment: "blah blah",
  po_number: "any old string works"
}
authorization = your_gateway_object.authorize( amount, credit_card, options)

```

Hope this helps you if you found this post! Let me know in the comments
if it did.
