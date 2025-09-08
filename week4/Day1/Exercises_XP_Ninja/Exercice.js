// Curried function to merge words
const mergeWords = (string) => (nextString) => 
    nextString === undefined 
        ? string
        : mergeWords(string + ' ' + nextString);

// Example 1: Single word
console.log(mergeWords('Hello')()); 
// Output: "Hello"

// Example 2: Multiple words chained
console.log(
    mergeWords('There')('is')('no')('spoon.')()
); 
// Output: "There is no spoon."

// Example 3: Another sentence
console.log(
    mergeWords('JavaScript')('is')('fun')('and')('powerful.')()
); 
// Output: "JavaScript is fun and powerful."
