---
layout: single
title: An Easier Way to Call an API From Your Web App
date: '2015-08-19 17:20:59'
tags:
- full-stack
- aerobatic
- api
- cors
- express
- proxy
---

*This post is written by Ivan Storck, Director of Developer Relations at Aerobatic and is a cross-post from the Bitbucket Blog at [https://blog.bitbucket.org](https://blog.bitbucket.org)*

At Aerobatic, our mission is to empower front-end developers to innovate faster - less time spent thinking about infrastructure, more time spent developing amazing customer-facing experiences; less time spent building and maintaining custom toolchains, more time spent innovating with clients; less time switching contexts between disparate tools, more time spent coding in a seamless flow.

In this post, I'll show you how to build a form that posts notifications to Hipchat using the [Aerobatic add-on for Bitbucket](http://bitbucket.aerobatic.com). It's simple, and no server-side code will be required.

## Do You Have the Time to Be a Full-Stack Developer?
Like many of you, I moved from server generated web pages in PHP or Rails, to Single Page Apps (SPA). There is only one choice for the language: JavaScript, but there is still a lot to keep track of. I'm capable of creating a virtual server, docker image, database setup, node API, or whatever I need. I can add in the JavaScript flavor of the month, from Backbone to Angular to React.

However, lately, I have been asking the question, do I need to know all this? Do I even have the time? What do I enjoy the most? The answer is that I love to create online products that are beautiful, useable, and technically well-crafted. The front-end is a big enough world for me to do that. But I don't want to lose control of the back-end, or need to team up with others to get simple apps done. Realistically, my back-end needs can be simple, and similar to many other people.

Many of you may host your static sites on Amazon S3, and manually configure CloudFront CDN via the (confusingly large) Amazon Web Services interface. But this gives you no chance at a back-end. Others code a simple node server and publish it to a PaaS provider, but this means you write boilerplate back-end with a basic REST API yet again. Maybe you even have a puppet / chef / docker script to spin up your own virtual server, but then you're stuck upgrading it whenever a security patch is released. What if you didn't have to worry about all this stuff? And if you didn't understand any of the jargon in this paragraph, doesn't that kind of prove my point?

## The Aerobatic Add-On for Bitbucket
Whether you have a Jekyll blog, a static site documenting your open-source project, or a full-featured web app built with a framework such as AngularJS, Ember, or React, you can now now edit your code, **push your changes to Bitbucket, and your site will be deployed automatically**. Assets are automatically hosted on a content delivery network (CDN) so that your site visitors will see the site faster. You can also have a custom domain point to your Aerobatic site with a DNS CNAME record.

## Express Request Proxy
Expanding our core hosting service for Bitbucket developers, Aerobatic is happy to introduce a custom web hook plugin for static site apps called Express Request Proxy. This means that you can call APIs on the internet without worrying about cross origin resource sharing (CORS) policies or leaking secret keys to the client. You can even contribute your own plugins to the [4Front](http://4front.io) open-source project, which powers our back-end.

The [Express Request Proxy](http://4front.io/docs/addons/express-request-proxy.html) plugin is a high performance, intelligent proxy that supports proxying AJAX requests to remote http endpoints. In addition to simple pass-through proxying, it also supports caching, parameter injection (to querystring, path, and body), as well as response transforms. In the `package.json` virtual router setup, you can define one or more instances of the proxy plugin.

The Express Request Proxy is available now in the Aerobatic Bitbucket add-on. Other plugins that will soon be supported include custom error pages, form processing, authentication, and more.

## Post to HipChat From Your Web App with Aerobatic
I'll walk you through using the Aerobatic Express Request Proxy to set up an integration with [HipChat](http://hipchat.com) (a popular chat app). We will create a simple web app. It has a form that posts a message to a HipChat room using the HipChat API.

## HTML page - index.html

Below I set up a basic `index.html` with a form, include `main.js`, and the simple [Skeleton](http://getskeleton.com) CSS framework.

```language-markup
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Send a Support Message to a HipChat Room</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <div class="container">
    <h1>Send a message</h1>
    <p>
      Use the form below to send a message to our HipChat room. Include your
      email and someone will contact you as soon as possible.
    </p>
    <p>This form sends directly to the webhook</p>
    <form id="hipchat" action="#">
      <div class="row">
        <div class="twelve columns">
          <label for="name">Name:</label>
          <input class="u-full-width" type="text" id="name" placeholder="Your Name">
          <label for="email">Email:</label>
          <input class="u-full-width" type="text" id="email" placeholder="you@yoursite.com">
          <label for="message">Message:</label>
          <input class="u-full-width" type="text" id="message" placeholder="your message to the chat room">
          <button id="submit-button" type="submit" class="button button-primary">Send</button>
        </div>
      </div>
    </form>
    <div style="display: none" id="confirm">
      <button>Your request was sent to the HipChat room successfully</button>
    </div>
  </div>
  <script charset="utf-8" src="main.js"></script>
</body>
</html>

```

## Main.js
Here's the meat of the app - It processes the form and sends the data via AJAX. I decided to use vanilla JS, and not to use jQuery, because what I'm doing does not need the whole library.

```language-javascript
var ready = function(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
};

var checkLoad = function() {
  if (this.status >= 200 && this.status < 400) {
    document.getElementById('hipchat').style.display = 'none';
    document.getElementById('confirm').style.display = 'block';
  } else {
    alert('Error with API Endpoint\n' + this.response);
  }
};

var ajaxError = function() {
  alert('Connection Error with API Endpoint');
};

var processFormData = function() {
  var formData = 'Name: ' + document.getElementById('name').value + 
    ' | Email: ' + document.getElementById('email').value +
    ' | Message: ' + document.getElementById('message').value;

  return JSON.stringify({
    color: 'green',
    message: formData,
    notify: 'true'
  });
};

var submitter = function(event) {
  var request = new XMLHttpRequest();
  var room = '1753375';

  request.open('POST', '/hipchat/' + room, true);

  request.setRequestHeader(
    'Content-Type',
    'application/json; charset=UTF-8'
  );

  request.setRequestHeader(
    'X-Requested-With',
    'XMLHttpRequest'
  );

  request.onload = checkLoad;
  request.onerror = ajaxError;
  request.send(processFormData());
  event.preventDefault();
};

ready(function() {
   document.getElementById('hipchat')
     .addEventListener('submit', submitter);
});
```

### Configuring the Express-Request-Proxy Plugin
In `main.js`, you might have noticed that I posted to a local endpoint `/hipchat`. Where does that come from? Here, in package.json, you can specify the plugin options. It's all in the `_virtualApp` section:

```language-javascript
{
  "name": "aerohip",
  "version": "0.0.1",
  "description": "Demo of using express-request-proxy on Aerobatic.com hosted apps",
  "main": "index.html",
  "scripts": {
    "start": "node ./node_modules/live-server/live-server.js"
  },
  "repository": {
    "type": "git",
    "url": "git+ssh://git@bitbucket.org/aerobatic/aerohip.git"
  },
  "keywords": [
    "aerobatic",
    "hipchat"
  ],
  "author": "Ivan Storck",
  "license": "ISC",
  "homepage": "https://bitbucket.org/aerobatic/aerohip#readme",
  "_virtualApp": {
    "router": [
      {
        "module": "express-request-proxy",
        "path": "/hipchat/:room",
        "method": "post",
        "options": {
          "url": "https://api.hipchat.com/v2/room/:room/notification",
          "query": {
            "auth_token": "env:HIPCHAT_AUTH_TOKEN"
          }
        }
      }
    ]
  },
  "devDependencies": {
    "live-server": "^0.7.1"
  }
}
```

The Aerobatic section is called `_virtualApp` because much like a virtual server, you can host multiple apps on an Aerobatic installation. The router section specifies how various paths in your application work. Each path matches a module. 

You'll notice that in the `path` argument, there is a parameter called `:room` The actual value is contained in our client JavaScript in `main.js`. You'll change that room value to be the room name or room ID that you wish to post to.

### Configuring the Environment Variables for Secrets

You need to get an access token from HipChat. This token should be kept secret. It's not something you want to check into Bitbucket for the public to see. Even if you have a private repo, it should not be kept in a file, in case you decide to open-source the repo later. The Aerobatic plugin for Bitbucket has the ability to store environment variables, which is a good place to store authorization secrets.

#### Get your token
Visit <span class="long-url">[https://www.hipchat.com/docs/apiv2/auth](https://www.hipchat.com/docs/apiv2/auth)</span> and get either a personal access token, or an integration token, depending on whether you are doing this for just yourself or a team.

<img class="img-responsive" src="http://bitbucket.aerobatic.com/media/blog/atlassian-post/hipchat-api.png">

We will follow the personal access token path here. You will get asked to login to your HipChat account next.

After that, you must choose an access scope for your token. To post to a HipChat room, you need "Send Notification"

<img class="img-responsive" src="http://bitbucket.aerobatic.com/media/blog/atlassian-post/hipchat-api-2.png">

The page will refresh and you should see your token appear above the form. Copy it to your clipboard for now.

- We will next set up the send notification auth token as an environment variable. 

- The URL that Hipchat expects should look something like: <div class="long-url"><code>https://api.hipchat.com/v2/room/ROOM\_ID\_OR\_NAME/notification?AUTH\_TOKEN=83b2519555c3894f2d099bac</code></div>

We had specified the name of the environment variable in `package.json` as `HIPCHAT_AUTH_TOKEN`. Now we need to add it to your Repo Settings on Bitbucket.

The following section assumes you have already installed the Aerobatic add-on, linked your repo to Aerobatic, and that you are an administrator of the repo:

- Go to your repo on Bitbucket, then click "Settings" from the left side menu.

- Scroll down to Aerobatic Hosting, and click "App Settings".

- In the Environment Variables section, fill in `HIPCHAT_AUTH_TOKEN` on the left and
your unique auth token on the right

<img class="img-responsive" src="http://bitbucket.aerobatic.com/media/blog/atlassian-post/hipchat-api-3.png">

### Try it out for yourself!

- To install the Aerobatic add-on, go to the [Bitbucket Add-On Directory](https://bitbucket.org/account/addon-directory/).
- Additional information can be found on our [Knowledge Base](https://aerobatic.atlassian.net/wiki/display/AKB/Aerobatic+Knowledge+Base) and [blog](http://bitbucket.aerobatic.com/blog/). 
- The code for this tutorial is hosted in the [AeroHip Repo](https://bitbucket.org/aerobatic/aerohip).

Let us know how it's working for you &mdash; and if you run into any roadblocks. Visit [our version](http://aerohip.aerobatic.io/) of this demo app to drop us a line!