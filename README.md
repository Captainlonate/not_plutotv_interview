# Pluto TV Interview

Notes from Nathan:

```
Tony G,

Summary:
I felt discouraged after we got off the call today. In part, due to the time I lost from Codesandbox
freezing up. But also in part, because I felt like I didn't express myself well. So, my goal here
is to at least prove to you that I could accomplish / solve all of the problems you had prepared for
me. OBVIOUSLY, this strategy eliminates the pressure of time and audience, but at least you'll know
that I can complete the objectives in *some* amount of time, haha

Since this was off-script, I had two options.
  - Cheat, take a lot of time and make something production ready
  - Try to rush myself, and attempt to answer the questions as if you were here, but I was still
    on limited time (try to keep it realistic)

I chose option #2. I started completely over. I left all the code in the original files, and
just used comments to show you where I would have broken it into a separate file.

Time:
I'd like to say I completed all this in the allotted 30 minute period that we had on the
call today, but I didn't. It definitely took me longer. Do people really complete all of
this (including favorites and the generator questions) in 30 minutes? Either way, I didn't.
I spent the most time on the 'favorite' category and on the CSS.

Honesty:
For the App, I did not need to google anything.
For the Generator questions, I wanted to google yield*, but was honest, and did not,
which will likely be reflected in the accuracy of my answer lol
```

## The channel app should satisfy all conditions:

* I just created a create-react-app and moved the source code into this project. The only thing I added was `node-sass` so I could keep using your pre-written styles.
* I implemented the 'favorite' feature for categories
  * If one is favorited, the favorite button appears 'active', and a new category appears at the top of the categories list, hinting at the category.
* Everything is sorted alphabetically
* I changed the css just a tiny bit, so that the images, labels and buttons would line up. I wrote notes in the .scss file marking the changes I made. I used B.E.M. (although I normally used styled-components).
* I made use of `useMemo` like we talked about so I you could see what was suggesting earlier.
* I curried some utility functions, and partially applied a couple to create specialized functions (I was talking about it but didn't express myself well, so I wanted to show you a concrete example. Normally I'd have ramda)
* I considered breaking out the list management into a custom react hook, like `useFilteredList` or something, but I was worried it would make the code look so complex that it was hard to follow. Especially with it all in one file. So I didn't.

## Generators
I did all of the work right in the provided file. I "explained" myself within the comments.

But I did slightly change the export so that I could just run `node ./generators.js` and execute the code

## Screenshot of the functioning app
![Screenshot](./readme_screenshot.png)