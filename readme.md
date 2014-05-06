#ProComics#

Hate Comicpress with a passion? Want a custom comic site without having to get knee deep in javascrip or php?  ProComics is a starting place for people who want custom webcomic websites.  It's uses Angular and Bootstrap to offer fantastically fast performance in a totally static package.  Uploading comics is as easy as uploading the file and adding a link to the config.  Since it's built on bootstrap, ProComics can be easily modified with any theme or functionality desired.

##Install##
1. Upload to a Webserver (Amazon S3 also works)
2. Customize js/comics.js
3. Success

##Adding A Comic##
###Layout###
At the very top layer are Arcs.  Arcs represent entire stories.  Anyone should be able to pick up an Arc and not need any previous information to enjoy the story.  

Inside of Arcs are chapters.  They represent chunks of story.

Inside of chapters are pages.  These are mapped to a single image.

You must have at least one Arc and one chapter.  Many comics may only ever need a single Arc.  Some comics may only need a single chapter.

The config file is a javascript object, allowing to type in basically JSON.  If you get any funny errors, make sure you're using a ',' between objects.

###Actually Adding A Comic###
You just need to customize titles as you see fit for the Arc and Chapter to begin, and then add in a page when appropriate.  A page looks like this:

	{title:'My Awesome Title', image:'comics/myfile.jpg'}

Upload your comic somewhere (I advise the comics folder, but, up to you) and make sure it's correctly named in the config.

##Adding Pages##
You can easily add pages that can be dynamically linked by adding a page in the form of

    TITLE.html
to

    views/pages/

Replacing TITLE with your page title.  Your page can then be accessed by going to yourwebsite.com/#/pages/TITLE.  Since you can theme the wrapper for pages, and since each page allows full html including bootstrap, you can easily create complex and easily edited websites without much fuss.

*Note* - Pages you add won't normally work with Angular, since they're being dynamically injected.  There is a rather convoluted fix for this, but it's beyond the scope of this document.  If it's a major problem, you may just want to add another full view with an empty controller.

##Changing the Landing Page##
By default, your visitors will land on your latest comic when they visit.  If you want to change that behavior, you can modify 

    js/app.js

starting at line 11.

##Theming##
ProComics uses Angular, so you can use all of the angular tags, including ng-src and ng-href.  You can also use angular expressions!

Let's say we wanted to get the page's title:

    {{page.title}}

We can mix that expression directly into our html:

	<div class="title"><h1>{{page.title}}</h1></div>

Now, if we want to use an expression inside of a tag, then we just use the appropriate ng tag.  For instance,

    <img ng-src="{{page.image}}" >

Some common tags include:

    ng-href
    ng-src
    ng-disabled
    ng-selected
    ng-checked

For more, you can check out the [AngularJS website](http://docs.angularjs.org/api/ng/directive).

Otherwise, just use [Bootstrap](http://getbootstrap.com).  The full Bootstrap3 library is included and ready to go.  You can easily drop in your favorite [Bootswatch](http://bootswatch.com) theme if you want, or roll your own.

There are two sets of files you should be concerned with. 

    index.html

In the root directory, this is the file that is used as the template for all others.  If you wanted to add a header that'd appear on all pages, you'd do it here.  You'll see a well demarcated div where the pages themselves will appear.

    views/*.html

Each page gets it's own view.  The comics view is persistant for every comic, and most of your comic styling should go there.

##Exposed APIs##

###Arc###
    arc.title - The Title of the current arc
###Chapter###
	chapter.title - The title of the current chapter
###Page###
    page.title - The title of the current page
    page.image - The image attached to the current page

###Links###

    links.first - Link to the very first page of the comic
    links.prev - Link to the previous page
    links.next - Link to the next page
    links.latest - Link to the latest page

###Comics###
This is the full comics object.  It contains all comics, as layered arrays.

	Comics.arcs[].chapters[].pages[]

###Location###
This is the current location.

    location.arc - The current arc number
    location.chapter - The current chapter number
    location.page - The current page number

Locations behaves as a descending array.  That means 0 is the latest, 1 is the next to latest, and 2 is two comics in the past.  Therefore, the latest page will always be [0,0,0], while the first may be [1,2,1] or [5, 5, 7] or so on.  [0,\*,\*] maps to the latest Arc, [0,0,\*] to the latest chapter, and so on.

###Archive###
This is the list of all arcs, chapters and comics.  You should use a ng-repeat="entry in archive" to unwind it.  Each entry contains the following:

    entry.title - Title
    entry.type - Either 'arc' 'chapter' or 'page'
    entry.link - A link to the entry
    entry.vector - A comic vector

####Changing Archive from Ascending to Descending####
Modify line 159 to read:

    $scope.archive = $scope.buildArchiveDescending();

##Adding to Arcs, Chapters, and Pages##
The configuration objects are never stripped, and the Arc, Chapter and Page objects simply act as pointers within the Comics array.  Therefore, if you add additional fields to the config, they'll be available to the Arc, Chapter and Page objects as appropriate.  You could add in support for alt tags, descriptions, and so on.

##Major Modifications##
This is an app built on top of [Micro](http://github.com/dark12222000/micro), a super extensible bootstrap and angular starting project.  At it's core, it's just a simple Angular app based primarily off a single controller.  So you can easily and quickly extend it without any difficulty.

