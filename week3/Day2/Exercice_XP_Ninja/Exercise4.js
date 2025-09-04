function biggestNumberInArray(arrayNumber) {
  // Step 1: Check if array is empty
  if (arrayNumber.length === 0) {
    return 0;
  }

  // Step 2: Initialize the biggest number as the lowest possible value
  let max = -Infinity;

  // Step 3: Loop through the array
  for (let i = 0; i < arrayNumber.length; i++) {
    if (typeof arrayNumber[i] === "number" && arrayNumber[i] > max) {
      max = arrayNumber[i];
    }
  }

  // Step 4: If no valid numbers found, return 0
  return max === -Infinity ? 0 : max;
}

// Example usage
const array1 = [-1, 0, 3, 100, 99, 2, 99];
console.log(biggestNumberInArray(array1)); // 100
const array2 = ['a', 3, 4, 2];
console.log(biggestNumberInArray(array2)); // 4
const array3 = [];
console.log(biggestNumberInArray(array3)); // 0
