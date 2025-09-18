function timesTwoAsync(x) {
  // This function returns a Promise that resolves immediately with x * 2
  return new Promise(resolve => resolve(x * 2));
}

const arr = [1, 2, 3];

// Map each number to a Promise that resolves to its double
const promiseArr = arr.map(timesTwoAsync);

// Use Promise.all to wait for all promises to resolve
Promise.all(promiseArr)
  .then(result => {
    // Analysis:
    // 1. promiseArr = [Promise(2), Promise(4), Promise(6)]
    // 2. Promise.all waits for all promises to resolve.
    // 3. Since all promises resolve immediately, the final resolved value is an array
    //    of the resolved values in the same order as the input array.
    // Output:
    console.log(result); // [2, 4, 6]
  });
