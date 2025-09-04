// Frame Program - Dynamic Border

// Step 1: Get input from the user
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter words separated by commas: ", function(userInput) {
  // Step 2: Split and clean words
  let words = userInput.split(",").map(word => word.trim());

  // Step 3: Find the longest word
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
    let paddedWord = word.padEnd(maxLength, " ");
    console.log(`* ${paddedWord} *`);
  }
  console.log(border);

  rl.close();
});
