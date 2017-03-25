---
layout: single
title: Is it Cold Enough for Beer Outside?
date: '2016-03-09 23:03:00'
tags:
- javascript
- aerobatic
- api
- beer
---

<img src="//www.aerobatic.com/media/beers.jpg" style="max-width: 100%; margin-left: 1em; max-height: 15em; float:right">

As winter releases its grip on the northern hemisphere, and things begin to chill down south, you may be wondering: *Can I store my beer outside?* Because, if your fridge is anything like mine, there's too much food in there for  more than a six pack of beer. Ideally, I would like to keep it on the back porch.

I like single-purpose sites. Even better is if the code is small enough to demo in a training class. Inspired by [Is it a Jewish Holiday Today](http://www.isitajewishholidaytoday.com/), I created <a href="http://coldout.beer">http://coldout.beer</a>

[ColdOut.beer](http://coldout.beer) uses the [Weather Underground API](https://www.wunderground.com/weather/api/). The API is a nice choice for teaching API requests for two reasons:

- it can be accessed by GET requests.
- the API key can simply be included in the URL or querystring

For deploying the site, [Aerobatic](https://www.aerobatic.com) was indispensible.  First off, publishing the site via `git push` is dead simple - something I can handle while lecturing to the class. More importantly, the [HTTP Proxy](https://www.aerobatic.com/docs/http-proxy) allows me to keep with Wunderground API key secure.  Third, having [easy staging sites](https://www.aerobatic.com/docs/deployment-management) lets me prototype ideas  while lecturing, and deploy them for the class to see. Finally, the [free SSL](https://www.aerobatic.com/docs/custom-domains-ssl) certificates give the site a professional feel.

How does the code work? It's a simple jQuery GET request:

```javascript
// this URL is set up by the Aerobatic HTTP Proxy
$.get('/api', updater);

function updater(data) {  
  var temp_f = data.current_observation.temp_f;
  var coldEnough = temp_f <= 46;

  if (coldEnough) {
    $('h2.answer').text('🍺 HELL YEAH!');
  } else {
    $('h2.answer').text('🌴 No way, José. It\'s only ' + temp_f + 'degrees.');
  }
  $('span.location').text(data.current_observation.display_location.full)
}
```

Some things I could do to improve the site (and happy to accept pull requests) are:

  - Temperature conversion to degrees Celsius. After all, most of the world uses it!
  - Use [browser geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation) for a more precise location

Go [check out the code](https://bitbucket.org/ivanoats/cold-enough-for-beer/) and [Aerobatic documentation](docs/getting-started) to see how all the features come together, stay cool, chill your beer, and spread the word!

*Photo by waitscm - http://flic.kr/p/avT1bH*