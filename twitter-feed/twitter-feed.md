We've acquired some data from the Twitter Streaming API. Using React, let's create a Twitter feed to display this data. The finished website should
look like this:

![Twitter Feed 1][twitter-feed-1]

## Setup
From your challenges directory, run the following:

```sh
$ et get twitter-feed
$ cd twitter-feed
$ npm install
$ npm start
```
If you go to [localhost:8080][localhost-8080], the page will display nothing, and the console will show no errors. You'll find the data for your application in `src/constants/data.js`. **DO NOT MODIFY** this data.

## Deliverables
1. The finished application should contain the information in the mock-up.
2. When clicking on the [reply icon][fa-reply], an alert box should pop up with
   the text "reply".
3. When clicking on the [retweet icon][fa-retweet], an alert box should pop up
   with the text "retweet".
4. When clicking on the [like icon][fa-heart], an alert box should pop up with
   the text "like".
5. When clicking on the [more icon][fa-ellipsis-h], an alert box should pop up
   with the text "favorite".
6. When the tweet object's `favorited` property is `true`, then the like icon should be red.
7. When the tweet object's `retweeted` property is `true`, then the retweet icon should be green.
8. If the tweet includes a media entity, remove the corresponding `display_url`
   from the tweet `text` and show the image in the tweet.
9. Front-end developers style their applications. You're a front-end developer.
   Therefore, you must style your application so it matches the mock-up.

## Pro Tips
* To complete this challenge, you should **not** have to create additional
    components. The `Tweet` and `TwitterFeed` components should be all that you
    need to create a functioning application.
* Start by looking over the provided data and make sure you understand the
    data structure. While investigating the data structure, you should note that tweets with images contain an object which possesses a `media_url` and a `display_url`. The `media_url` is the URL to the image, so use this URL to display the image in your application. The `display_url` is a URL found in the tweet `text`. Make sure you remove the `display_url` from the tweet `text` before displaying it in your application.
* [Foundation][foundation] and [Font Awesome][font-awesome] are available for
    you to use via a CDN. Rejoice!


[fa-heart]: http://fortawesome.github.io/Font-Awesome/icon/heart/
[fa-retweet]: http://fortawesome.github.io/Font-Awesome/icon/retweet/
[fa-ellipsis-h]: http://fortawesome.github.io/Font-Awesome/icon/ellipsis-h/
[fa-reply]: http://fortawesome.github.io/Font-Awesome/icon/reply/
[font-awesome]: http://fortawesome.github.io/Font-Awesome/
[foundation]: http://foundation.zurb.com/
[localhost-8080]: http://localhost:8080
[twitter-feed-1]: https://s3.amazonaws.com/horizon-production/images/twitter-feed-1.png
