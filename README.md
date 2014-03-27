Social proof
======================

Introduction
----

This is a demo of a real time social proof analytics service built using Require JS, Backbone, YQL and the GA API. This is intended to work in the following way:

-A request is made to the GA API to determine how many users are currently viewing the same page.

-If there is at least 1 other user looking at the same page, the user is shown a small overlay.

This is intended to be used as a third party JS application that a client could add to any page on an ecommerce site.

Testing:

-To increase the number of concurrent visitors, go to http://dl.dropboxusercontent.com/u/8767938/fresca/html5/real-time/ga.html
-Note, this is just a blank HTML page that runs some JS in the background to increase the visitor count.
-To view the demo page, go to http://dl.dropboxusercontent.com/u/8767938/fresca/html5/real-time/demo.html
