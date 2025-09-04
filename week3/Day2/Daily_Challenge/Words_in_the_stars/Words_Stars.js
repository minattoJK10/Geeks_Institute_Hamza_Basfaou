// Step 1: Prompt the user for words separated by commas
let userInput = prompt("Enter several words separated by commas:");

// Step 2: Convert the string into an array and trim extra spaces
let words = userInput.split(",").map(word => word.trim());

// Step 3: Find the length of the longest word
let maxLength = 0;
for (let word of words) {
  if (word.length > maxLength) {
    maxLength = word.length;
  }
}

// Step 4: Create the top and bottom border
let border = "*".repeat(maxLength + 4);

// Step 5: Print the frame
console.log(border);
for (let word of words) {
  // Pad words with spaces so they align perfectly
  let paddedWord = word.padEnd(maxLength, " ");
  console.log(`* ${paddedWord} *`);
}
console.log(border);
