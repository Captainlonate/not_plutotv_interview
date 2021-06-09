# Pluto TV Interview

Notes from Nathan:

```
Tony G,

Summary:
I left all the code in the original, single files. (index.js / generators.js)

Time:
I was not able to complete all of this in the 30 minutes we would have had on the call.
It took me longer.
I spent the most time on the 'favorite' feature.

Honesty:
For the Generator questions, I wanted to google yield*, but remained "honest", and did not,
which will likely be reflected in the accuracy of my answer lol

To instill confidence, I've included a Github link to a past project I wrote,
where I used Generator functions so you could see that I've used them in the wild.
```

## The channel app should satisfy all conditions: (src/index.js)

* I moved the source into a create-react-app. I added `node-sass` so I could keep using your pre-written styles.
* I implemented the 'favorite' feature for categories
  * The favorite category always appears first, if there is one.
  * See the screenshot at the bottom
* Categories and Channels are sorted alphabetically
* I changed the css only where it was necessary. I wrote notes in the .scss file marking the changes I made.
  * I used B.E.M. (although I normally used styled-components).
* I used `useMemo` like we talked about earlier.
* Since you mentioned "currying", I curried a couple functions and partially applied them to create specialized utility functions, from generic ones.
* I considered refactoring the list management code into a custom react hook, like `useFilteredList`. But I was worried it would make the code hard to follow. Especially with it all in one file. So I didn't.

## Generators (generators.js)
I did all of the work right in the provided file. I "explained" myself within the comments.

But I did slightly change the export so that I could just run `node ./generators.js` and execute the code

Since you're quizzing me on Generator functions, [here is a link to a tetris game](https://github.com/Captainlonate/captotetris2/blob/main/src/classes/BoardManager/index.js#L34) I built, where I wrote
a generator function to iterate through a 2d array of cells. (Represents a game board)

## Screenshot of the functioning app
![Screenshot](./readme_screenshot.png)