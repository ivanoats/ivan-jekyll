---
layout: post
title: Hosting Phenomic Static Sites on Aerobatic
date: '2017-02-20 19:18:28'
tags:
- reactjs
- hosting
- aerobatic
- react
- phenomic
---

[Phenomic](https://phenomic.io) is a static site generator. Its claim to fame is letting you use [ReactJS](https://facebook.github.io/react/) to create your template using web components. Content is in Markdown files, or any other format, including React. 

Phenomic is customizable. You can choose your own Markdown engine, CSS processor, and CSS in JS, or inline style solutions. 

There are some high-profile websites built in Phenomic already. 

- [Amazon SES Marketing](https://moonmail.io/amazon-ses-email-marketing)

- [Serverless](https://serverless.com/) framework

- [Stylelint](http://stylelint.io/)

- [PostCSS](http://postcss.org/)

- [CSSnano](http://cssnano.co/)

- [BlueJay Wireless](https://www.bluejaywireless.com/)

Hosting Phenomic is as simple as any static site on Aerobatic. Let's get started. 

## Install Phenomic

_Prerequisite: Node JS installed_

1.  `mkdir your-site`

2.  `cd your-site`

3.  `npm install phenomic` - you'll see some errors from npm, which you can ignore for now.

4.  `./node_modules/.bin/phenomic setup` (or on Windows, use backslashes)

5.  Setup will ask you some questions, generate a `package.json` file for you, and install the base theme. <img class="screenshot" src="http://media.ivanstorck.com/aerobatic/phenomic-install.png" alt="Phenomic setup">


6.  `npm install` to install the dependencies.



## Preview your Site

Use `npm start` to preview your site in your browser. Phenomic includes hot-reloading. The web page updates automatically whenever you make changes in your editor.

## Build the Site

Building a Phenomic site is simply `npm run build`. This makes your website into the `dist` folder.

## Deploy to Aerobatic

1.  Login to Aerobatic (if you haven't already) `aero login`

2.  Create the Aerobatic site `aero create`. This makes a file called `aerobatic.yml` in your directory. The file contains the application ID and other configuration information.

3.  Deploy to Aerobatic: `aero deploy -d dist`

That's it! Your site should be live at the URL that the `aero` command tells you when complete.

## Similar Projects

[GatsbyJS](https://github.com/gatsbyjs) is a similar project worth checking out. We have an article on Gatsby [here](https://www.aerobatic.com/blog/gatsbyjs/).

There is also the [static site generator webpack plugin](https://www.npmjs.com/package/static-site-generator-webpack-plugin). 

## Next steps

*   You can choose a different URL using the `aero rename` command.  For example `aero rename -n "my-awesome-site"`

*   Use one of the [many plugins](https://www.aerobatic.com/docs/plugins/) that make Aerobatic hosting unique.

*   [Read the Phenomic Getting Started guide](https://phenomic.io/docs/getting-started/).
