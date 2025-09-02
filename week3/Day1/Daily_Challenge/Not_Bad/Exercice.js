//  Exercise : Replace "not ... bad" with "good"

let sentence = "The movie is not that bad, I like it";

// Find positions
let wordNot = sentence.indexOf("not");
let wordBad = sentence.indexOf("bad");

if (wordNot !== -1 && wordBad !== -1 && wordBad > wordNot) {
  // Replace from "not" up to "bad" with "good"
  let result =
    sentence.slice(0, wordNot) + "good" + sentence.slice(wordBad + 3);
  console.log(result);
} else {
  console.log(sentence);
}