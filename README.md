# Pluto TV Interview

## The channel app should satisfy all conditions: (src/index.js)

* I moved the source into a create-react-app.
  * I added `node-sass` so I could use your pre-written styles.
* I implemented the 'favorite' feature for categories
  * The favorite category always appears first, if there is one.
  * See the screenshot at the bottom
* Categories and Channels are sorted alphabetically
* I changed the css only where it was necessary. I wrote notes in the .scss file marking a few changes I made.
  * I used B.E.M. (although I normally use styled-components).
* I used `useMemo` like we talked about earlier.
* Since you mentioned "currying", I curried a couple functions and partially applied them to create specialized utility functions, from generic ones.
* I considered refactoring the list management code into a custom react hook, like `useFilteredList`. But I was worried it would make the code hard to follow. Especially with it all in one file. So I didn't.

## Generators (generators.js)
I "explained" my answers within comments, within the `generators.js` file.

I had to modify the file so that I could execute it with `node ./generators.js`.

[Here is a link to a tetris game](https://github.com/Captainlonate/captotetris2/blob/main/src/classes/BoardManager/index.js#L34) I built, where I wrote a generator function to
iterate through a 2d array of cells. (which represents a game board)

## Screenshot of the functioning app
![Screenshot](./readme_screenshot.png)
