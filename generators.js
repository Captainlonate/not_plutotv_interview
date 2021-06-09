// 1. How does this generator work and how would I use it?
console.log("running generators");
function* idMaker() {
  var index = 0;
  while (true) yield index++;
}

/*
  QUESTION #1)
  To Tony:
  --------
  When you invoke 'idMaker', you will get back an object which
  implements the iterator protocol, or maybe it's called 'iterable', not sure.
  It's an object that has a key of [Symbol.iterator], which is a function
  that returns another object with `next()`.
  I know this because a while ago I saw a "Colt Steele" video on youtube where he
  overwrites the one on the String's prototype to make it print in reverse lol.
  Either way, this will be an object that has a `next()` function.

  What you get back is something you can iterate over, like this:
    for (const thing of idMaker()){}
  But that's a bad idea because it'll run forever.
  Instead you can manually run it, like I did below.
*/
// write example here
console.log("ID MAKER");
console.log("\nNathan's Question #1 starts here:\n")
const generatorObj = idMaker()
console.log(generatorObj.next()) // { done: false, value: 0 }
console.log(generatorObj.next()) // { done: false, value: 1 }
console.log(generatorObj.next()) // { done: false, value: 2 }

// 2. create a generator named take
// with 2 arguments ( N, iter)
// => it should return the N-th number of elements from the array
function* take(n, iter) {
  let index = 0;
  for (const val of iter) {
    if (index >= n) {
      return;
    }
    index = index + 1;
    yield val;
  }
}

/*
  QUESTION #2)
  To Tony:
  ------
  I wasn't sure what you wanted here. You said to implement `take`, but then you
  already gave me an implemented `take`.

  So two things:
    1) I won't lie to you, I'd never seen the `yield*` operator (the yield that has an * too).
      No idea what that does. So, I would have blanked in the interview. Since you would have
      asked me what it does, my best guess is:
      "It looks like it just re-yields whatever `take` yielded, like, maybe it just passes
      it up the chain similar to how re-throwing exceptions works in C#???"
    2) I implemented my own `takeNathan`, and then showed several use cases for how
      it could be used WITHOUT a `mainGenerator()` function. I wanted to change it up a bit,
      so notice that I don't throw out of bounds errors, by finding the 'min' first.
*/

console.log("\nNathan's Question #2 starts here:\n")

function* takeNathan(numberOfElsToTake, thingToIterateOver) {
  // Can only take at most the # of things in the iterable
  // At least this way, you don't throw an error
  const mostThatCanBeTaken = Math.min(thingToIterateOver.length, numberOfElsToTake)

  for (let idx = 0; idx < mostThatCanBeTaken; idx++) {
    if (idx < thingToIterateOver.length) {
      yield thingToIterateOver[idx]
    }
  }
}

// Use case 1)
// You can simply iterate it by spreading it
console.log('Should be "nathan", "tony": ', ...takeNathan(2, ['nathan', 'tony', 'pluto', 'tv']))
console.log('Should be undefined: ', takeNathan(5, []).next().value) // Does not error

// Use case 2)
// If your goal is to make another array out of the results, just wrap it in
// brackets before you spread it, although array.slice() is probably better lol
console.log('Should be "a", "b", "c", "d": ', [...takeNathan(4, ['a', 'b', 'c', 'd', 'e', 'f', 'g'])])

// Use case 3)
// And finally, you can just use a for loop if you need to work on each element
for (const letter of takeNathan(4, ['a', 'b', 'c', 'd', 'e', 'f', 'g'])) {
  console.log(`Letter: "${letter.toUpperCase()}"`)
}

//
// Tony: I did not mess with anything after here:
//

function* mainGenerator() {
  // take(5, [0, 1, 0, 1]);
  // ERROR: array out of bounds from N
  // const result = yield* take(5, naturalNumbers());
  // 1 2 3 4 5
  const result = yield* take(3, ["a", "b", "c", "d", "e"]);
  // // a b c
  console.log(result);
  yield "the end";
}

const gen = mainGenerator();
for (let i of gen) {
  console.log(i);
}
