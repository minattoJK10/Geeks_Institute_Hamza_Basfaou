// app.js

/**
 * Function to extract numbers from a string using RegEx
 * @param {string} str - The input string
 * @returns {string} - The numbers extracted and joined
 */
function returnNumbers(str) {
  // Use RegEx to match all digits
  const numbers = str.match(/\d/g);  // \d matches digits 0-9
  return numbers ? numbers.join('') : ''; // Join array into a string
}

// Test the function
const input = 'k5k3q2g5z6x9bn';
const result = returnNumbers(input);

console.log(`Input: ${input}`);
console.log(`Extracted Numbers: ${result}`);
