// Part 1
const array = [[1],[2],[3],[[[4]]],[[[5]]]];
const modifiedArray = array.flat();
console.log("Modified Array:", modifiedArray); 
// Output: [1, 2, 3, [4], [5]]

// Bonus One-liner
console.log("One-liner:", [[1],[2],[3],[[[4]]],[[[5]]]].flat());

// Part 2
const greeting = [["Hello", "young", "grasshopper!"], ["you", "are"], ["learning", "fast!"]];
const joinedGreeting = greeting.map(arr => arr.join(" "));
console.log("Joined Greeting:", joinedGreeting);
// Output: ["Hello young grasshopper!", "you are", "learning fast!"]

// Part 3
const finalGreeting = joinedGreeting.join(" ");
console.log("Final Greeting:", finalGreeting);
// Output: "Hello young grasshopper! you are learning fast!"

// Part 4
const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]];
const freed = trapped.flat(Infinity);
console.log("Freed Number:", freed);
// Output: [3]
