// Using the map() method to transform each element of the array
const result = [1, 2, 3].map(num => {
  // Check if the current element is a number
  if (typeof num === 'number') {
    // If it's a number, return it multiplied by 2
    return num * 2;
  }
  // If it's NOT a number (not the case here), return undefined
  return;
});

console.log(result); 
// Output: [2, 4, 6]

// ------------------------------------
// Explanation:
// 1. map() iterates through each element of the array [1, 2, 3].
// 2. For each element (num):
//    - typeof num === 'number' → true for 1, 2, and 3
//    - So, it returns num * 2.
// 3. The return statement after the if would only run if num was NOT a number,
//    but in this case, it's never reached.
// ------------------------------------
