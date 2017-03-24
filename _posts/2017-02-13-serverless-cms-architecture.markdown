---
layout: post
title: A Serverless CMS Architecture
date: '2017-02-13 17:26:00'
tags:
- gatsby
- serverless
- cms
- architecture
---

I have a problem: I have two conflicting requirements for the content management system. The COO wants me to avoid managing servers if I can, or at least outsource it. On the other hand, the CEO and Marketing want something that’s web based, and easy to use. WordPress and CraftCMS are, of course, candidates. But, those would mean managing a LAMP infrastructure. Yuk.

> “Ain’t nobody got time for DevOps”

I agree with both conflicting objectives above. Who has time to babysit servers? Not me. I have code to write, and customers to keep happy. I could use just a static site generator like Jekyll, but we need more. I have important Internal customers — the marketing department. People that expect a nice web GUI for their CMS. How am I going to make that happen with a static website?

Why is serverless architecture so attractive? Amazon Web services lists these benefits:

- No operating systems to choose, secure, or manage
- No servers to right size, monitor, or scale out
- No risk to your cost by over-provisioning
- No risk to your performance by under-provisioning

> “There are already hundreds of thousands of production systems out there leveraging what is one of the world’s oldest and most successful serverless products: Amazon S3.” — Obie Fernandez

Fortunately, I did not have to write the web GUI for the admin. [Contentful](https://www.contentful.com) already has that. Boom — Done! Contentful keeps my Marketing folks happy on the admin side. It keeps me, as a developer, happy too. Contentful spits out JSON that i can use any way I want. They have SDKs for JavaScript, Ruby, and other popular languages.

I choose to use that JSON from Contentful in a static site generator. Why? Because static sites can be hosted without servers. On Amazon S3, or even better, on [Aerobatic](https://www.aerobatic.com).

Aerobatic allows me to accelerate the delivery of best practices in web hosting:
- I can have [staging sites](https://www.aerobatic.com/docs/deployment-management) based on git branches.
- I can [password protect](https://www.aerobatic.com/docs/http-basic-authentication) my sites.
- I can add [secure certificates](https://www.aerobatic.com/docs/custom-domains-ssl) easily.
- I can [make API requests](https://www.aerobatic.com/docs/http-proxy) easily without worrying about CORS.
- and [other](https://www.aerobatic.com/features/) time-saving features.

Here's the Architectural Diagram: ![Architectural Diagram](http://media.ivanstorck.com.s3.amazonaws.com/serverless-cms-architecture.svg)

After looking at that diagram, you might be wondering — why we didn't just go with WordPress? If the reasons above about not managing servers don't hold purchase with you , consider these:

- Do you want to be stuck programming an outdated PHP framework for the foreseeable future in your professional career? Or, would you rather choose your language *du jour* based on more current (and fun!) requirements?
- Do you want flexibility to create workflows beyond what comes in WP or other CMSs out of the box?
- Do you want a site that is easily and automatically replicated to a content delivery network, around the globe, making it highly available to your customers?
-  Do you want to de-couple editing and and presentation of content? Doesn't that sounds like *a really good idea* - maybe worth a little bit of extra effort? You can use current best-practice technology like ReactJS, Angular 2, TypeScript, or even Elm.

So, what are the details on making this happen? I chose [GatsbyJS](http://github.com/gatsbyjs/gatsby) because it lets me design my site with React. You can read more about [Gatsby](https://www.aerobatic.com/blog/gatsbyjs) in my post on how to host it on [Aerobatic](https://www.aerobatic.com). 

The key piece of code is a pre-build step that reads the content entries from Contentful, and creates JSON files in the Gatsby site's file structure, which get turned into pages with a custom wrapper. Here's what it looks like:

```javascript
#!/usr/bin/env babel-node
require('dotenv').config()
import contentful from 'contentful'
import fs from 'fs-extra-promise'

// Contentful Config
const apiToken = process.env.CONTENTFUL_DELIVERY_API_TOKEN
const spaceId = process.env.CONTENTFUL_SPACE_ID
const client = contentful.createClient({ accessToken: apiToken, space: spaceId })

async function getEntriesByType (contentType, fields) {
  const options = { content_type: contentType, fields }

  try {
    return await client.getEntries(options)
  } catch (error) {
    console.log('LegacyPost error: ', error)
    return []
  }
}

async function renderPost (post) {
  try {
    return fs.outputFile(
      `pages/blog/${post.fields.slug}/index.json`,
      JSON.stringify(post, null, 2)
    )
  } catch (error) {
    console.log('Error creating post', error)
    return Promise.reject('error')
  }
}

async function renderPage (page) {
  try {
    return fs.outputFile(
      `pages/${page.fields.slug}/index.json`,
      JSON.stringify(page, null, 2)
    )
  } catch (error) {
    console.log('Error creating page', error)
    return Promise.reject('error')
  }
}

async function main () {
  try {
    const posts = await getEntriesByType('legacyPost', { published: true })
    const postPromises = posts.items.map(post => renderPost(post))
    await Promise.all(postPromises)

    const pages = await getEntriesByType('legacyCustomPage', { active: true })
    const pagePromises = pages.items.map(page => renderPage(page))
    await Promise.all(pagePromises)
  } catch (error) { console.log(error) }
}

main()
```

To understand this code, look at the `main` function. It waits for the entries to be downloaded from Contentful. Then, it loops through each entry to a create file on disk for Gatsby to use during the static site build process.  I used Promises and ES2016 async/await functions to simpify the async nature of the code used.

Overall, designing a static website / "serverless" CMS system has been worth the effort. I'm happy I don't have manage and pay for LAMP servers.  My users have a decent UI that I didn't have to design myself. And my site visitors have a snappy, responsive site that can handle any load that they throw at it. I'd encourage you to think outside the WordPress box and consider this architecture for your next CMS project.


