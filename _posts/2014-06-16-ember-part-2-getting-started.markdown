---
layout: post
title: 'Ember, Part 2: Getting started'
date: '2014-06-16 19:00:00'
tags:
- javascript
- ember
- frameworks
---

Here is the quickest way to get started with [Ember](http://emberjs.com/).
### Prerequisites

You'll need the following modules if you don't have them already:

    npm install -g phantomjs bower

### Installation

The first step is to install the command line tool globally:

    npm install -g ember-cli

Then install the [Ember Chrome Extension](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi).

### Kicking the Tires

Examine carefully the output of the help option for the `ember` command.

    ember --help

### Our First App Setup

    ember new emberNotes
    cd emberNotes
    ember serve

Take a look (in your editor) at `app/templates/application.hbs`. Go ahead and change the `h2` element to "Welcome to Notes" or something similar. The `{{outlet}}` tag is where our content will end up.

### Generating More

Browse to the [List of Ember Generators](https://github.com/cavneb/loom-generators-ember-appkit/tree/master/loom/generators).

    ember g model note
    ember g controller notes
    ember g template note
    ember g route index

Edit `app/routes/index.js`:

1. Include a model attribute of the route, that points to . . . 

2. A dummy data variable:

<br>
    
    import Ember from 'ember';
    
    export default Ember.Route.extend({
      model: function() {
	    return data.result;
      }
	});

	var data = {
	  "status": "ok",
	    "result": [
    	  { noteBody: "Twilight Sparkle"},
    	  { noteBody: "Applejack"},
    	  { noteBody: "Fluttershy"},
    	  { noteBody: "Rarity"},
    	  { noteBody: "Pinkie Pie"},
    	  { nodeBody: "Rainbow Dash"}
  	  ]
	};

And in `app/templates/index.hbs`:

	{{#each this}}
  		<li>{{noteBody}}</li>
	{{/each}}

Now let's add images to your data. Add a picture attribute, something like this:

	"result": [
      {
        noteBody: "Twilight Sparkle",
		picture: "http://img4.wikia.nocookie.net/__cb20140420032412/mlp/images/thumb/e/e0/Twilight_Sparkle_after_drying_herself_S1E03.png/209px-Twilight_Sparkle_after_drying_herself_S1E03.png"
      },
      {
        noteBody: "Applejack",
        picture: "http://img3.wikia.nocookie.net/__cb20121029101939/mlp/images/thumb/e/ee/Applejack_proud_of_herself_S1E01.png/209px-Applejack_proud_of_herself_S1E01.png"
      },
   	]

And in your `index.hbs`:

	{{#each this}}
  	  <li>
    	<img {{bind-attr src="picture"}} />
    	{{noteBody}}
  	  </li>
	{{/each}}

Now with more ponies!

### Two-way Data Binding

In `index.hbs`:

	<div>
	{{input type="text" value=name placeholder="Enter your pony name"}}
	</div>

	<div>
	  <p>Hello, my pony name is: <b>{{name}}</b>, and I think Ember is great!</p>
	</div>

### More on Ember CLI

* [Ember CLI docs](http://iamstef.net/ember-cli/)
* [Prototyping an Ember App in 20 minutes](https://www.youtube.com/watch?v=Hm8XsgKT0Qw)

<hr>

[Ember, Part 1: Why I use Ember and you should too](https://www.codefellows.org/blog/ember-part-1-why-i-use-ember-and-you-should-too)

[Ember, Part 3: 10 resources for getting (and staying) up to date](https://www.codefellows.org/blog/ember-part-3-10-resources-for-getting-and-staying-up-to-date)