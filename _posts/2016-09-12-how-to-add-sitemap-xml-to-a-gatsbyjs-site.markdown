---
layout: single
title: How to add Sitemap.xml to a GatsbyJS site
date: '2016-09-12 22:17:51'
tags:
- javascript
- gatsby
- seo
---

A sitemap is a file where you can list the web pages of your site to tell Google and other search engines about the organization of your site content. Search engine web crawlers like Googlebot read this file to more intelligently crawl your site.

GatsbyJS already keeps a list of pages handy ready for you to use. It's not too much more code to make a site map generator for Gatsby. Most of the work is already done by the [sitemap](https://www.npmjs.com/package/sitemap) package.

Add this code to your `gatsby-node.js` file in your site's main directory. If you don't have one you can create it.

<script src="https://gist.github.com/ivanoats/8d01d9e934fdc17bae9090147f1e799b.js"></script>

Make sure to modify the `hostname` property of the sitemap object to use your site. 

The pagesToSitemap function maps Gatsby's pages array into an array of objects that the sitemap package needs. 

If I had more time to work on this, I'd grab the `changefreq` and `priority` and make them part of the page data somehow. 

Please leave a comment if you use this (free, MIT licensed) code and let me know if you have improved it!