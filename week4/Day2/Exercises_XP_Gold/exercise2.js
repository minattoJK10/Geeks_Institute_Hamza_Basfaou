// Using reduce() to merge nested arrays
const result = [[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    // At each step, concatenate the current array (cur) to the accumulator (acc)
    return acc.concat(cur);
  },
  [1, 2] // <-- Initial value of the accumulator
);

console.log(result);
// Expected Output: [1, 2, 0, 1, 2, 3]

// --------------------------------------------
// STEP-BY-STEP EXECUTION
// --------------------------------------------
// Initial accumulator (acc) = [1, 2]
// Array to process = [[0, 1], [2, 3]]

// 1st iteration:
// acc = [1, 2]
// cur = [0, 1]
// acc.concat(cur) → [1, 2, 0, 1]

// 2nd iteration:
// acc = [1, 2, 0, 1] (result of previous step)
// cur = [2, 3]
// acc.concat(cur) → [1, 2, 0, 1, 2, 3]

// Final result returned by reduce → [1, 2, 0, 1, 2, 3]
// --------------------------------------------
