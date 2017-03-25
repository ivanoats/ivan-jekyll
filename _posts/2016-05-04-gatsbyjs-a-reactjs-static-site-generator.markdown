---
layout: single
title: Hosting GatsbyJS - A React Static Site Generator
date: '2016-05-04 03:54:47'
tags:
- javascript
- static
- aerobatic
- gatsby
- react
---

Gatsby transforms plain text into dynamic blogs and websites using the latest web technologies. It's easy to get started with — and host on Aerobatic. I'll go over why you should consider it, and how to get it up and running quickly with Aerobatic. 

## Why Gatsby? The Advantage of React Over Templates
The current crop of content management systems (CMS) utilizes templates to organize content.  Things like [Liquid](https://shopify.github.io/liquid/) (Jekyll), [S|T]wig, etc. While these work, there is now a better approach — components.  The leading web component framework is, of course, ReactJS. See what the React team says themselves about the advantages of components are over templates:

> Traditionally, web application UIs are built using templates or HTML directives. These templates dictate the full set of abstractions that you are allowed to use to build your UI. React *[and Gatsby]* approaches building user interfaces differently by breaking them into components. This means React uses a real, full featured programming language [JavaScript] to render views, which we see as an advantage over templates for a few reasons:

> By unifying your markup with its corresponding view logic, React *[and thus Gatsby]* can actually make views easier to extend and maintain.

## Why GatsbyJS was created
I asked [Kyle Mathews](https://twitter.com/kylemathews) why he created [GatsbyJS](https://github.com/gatsbyjs/gatsby), and why he thinks React components are better: 

> Four main reasons.  React components are perfect if you want a "progressive" website as it's trivial to layer in javascript-driven experiences on top of the static HTML version.
 
> Second, React components are highly reusable/sharable. There's a huge number of fantastic React components already available on NPM (see [js.coach](https://js.coach)) and it's very easy to abstract away parts of your site into your own components directory. I've seen very noticeable quality/velocity improvements by heavily relying on community components and my own components. 

> Third, React components solve nasty CSS problems better than anything else I've seen. The React community has come up with a number of very creative solutions leveraging the component model. My favorites are inline styles and CSS Modules.

> Finally, if you spend most of your time working in React, working with Gatsby and React components feels far more comfortable than some other templating system. Gatsby is designed to feel completely natural to any dev who knows React.

The bottom line is that if you're already using React for developing sites, you'll probably want the same advantage for your blog or static site, too!

## Installing Gatsby
For your development machine, you'll need the command line tool:

`npm -g install gatsby`

## Creating your first Gatsby site
Gatsby has some convenient starter templates. Try out the blog one:
`gatsby new blog https://github.com/gatsbyjs/gatsby-starter-blog`

This will create and install npm packages in a new directory called blog, one level below your current directory

## Previewing your site locally

Take a look at your site on your local machine with this command:
`gatsby develop`

## Hosting and Deploying your GatsbyJS site

You can almost use Aerobatic's [npm build](https://www.aerobatic.com/docs/automated-builds#npm) process out of the box, but there's one small trick you need to know about, because Gatsby uses [babel-register's require hook](https://babeljs.io/docs/usage/require/)

You need to create a separate 'build-prod' script that disables Babel's cache. This is because there is not enough available hard drive space on the Amazon Lambda image to support a full Babel cache. Don't worry, the build, and the resulting site, are still super speedy. 

Here's the configuration: 

```javascript
  "scripts": {
    "dev": "gatsby develop",
    "build": "gatsby build",
    "build-prod": "BABEL_DISABLE_CACHE=1 gatsby build",
    "lint": "./node_modules/.bin/eslint --ext .js,.jsx --ignore-pattern public .",
  },
  "_aerobatic": {
    "build": {
      "engine": "npm",
      "script": "build-prod",
      "output": "public"
    }
  }
```
  
  So we've created some npm build scripts, including the important `build-prod` for production. Then, from our Aerobatic config, we've specified that we are using the npm build option,`build-prod` is the script to run, and that the files it generates go in the `public` subdirectory.
  
Go ahead and make these changes to the `package.json` file in your `blog` directory. Commit the changes and push to your Bitbucket repo. 
  
## Configuring Aerobatic
  
  Visit your repo on Bitbucket and click on the Aerobatic icon.  Here's an example screenshot of how you should set up your configuration. Choose a new name for your site, and point to the public directory for your files.

![aerobatic gatsby config](/content/images/2016/04/create-gatsby-site.png)
  
After you click 'Create website', your site will be deployed and available on the web. If there are any errors in the deployment process, check the deploy logs. And please reach out to us at Aerobatic for [support](https://www.aerobatic.com/contact/) if you need it, we are happy to help.

## Example code 
  
The code in this blog post should be all you need. Just in case we've made our example code available here: https://bitbucket.org/aerobatic/gatsby-demo
  
## Ready? Go!
  
If you're not already  signed up for Aerobatic, [get started](https://www.aerobatic.com/docs/getting-started)!

## Go farther

[Scott Nonnenberg](https://blog.scottnonnenberg.com/practical-gatsby-js/) has some must-see tips on using Gatsby. After you've deployed your site on Aerobatic, go check it out!

*Photo by Eva Rinaldi - http://flic.kr/p/bsTxXB*
  