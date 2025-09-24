// Function that returns a promise which resolves after 2 seconds
let resolveAfter2Seconds = function () {
    console.log("starting slow promise"); 
    // This message appears immediately when the function is called.

    return new Promise(resolve => {
        setTimeout(function () {
            resolve("slow"); 
            // The promise resolves with the value "slow" after 2 seconds.

            console.log("slow promise is done"); 
            // Logged right after the slow promise finishes.
        }, 2000); // 2 seconds delay
    });
};

// Function that returns a promise which resolves after 1 second
let resolveAfter1Second = function () {
    console.log("starting fast promise"); 
    // This message appears immediately when the function is called.

    return new Promise(resolve => {
        setTimeout(function () {
            resolve("fast"); 
            // The promise resolves with the value "fast" after 1 second.

            console.log("fast promise is done"); 
            // Logged right after the fast promise finishes.
        }, 1000); // 1 second delay
    });
};

// Async function to run the two promises concurrently
let concurrentStart = async function () {
    console.log('==CONCURRENT START with await==');
    // Initial log indicating the start of the concurrent execution.

    /*
      Here, we start both promises at the same time WITHOUT awaiting them immediately.
      This means both timers (2 seconds and 1 second) will run in parallel.
    */
    const slow = resolveAfter2Seconds(); // Starts the slow promise
    const fast = resolveAfter1Second();  // Starts the fast promise

    /*
      Execution pauses here until the `slow` promise is resolved.
      Even though `fast` finishes first (after 1 second), 
      the code will not continue until `slow` is done (after 2 seconds).
    */
    console.log(await slow); // Logs "slow" after 2 seconds.

    /*
      At this point, `fast` has already been completed for a while,
      so awaiting it resolves immediately without any additional delay.
    */
    console.log(await fast); // Logs "fast" immediately after "slow".
};

// The setTimeout waits 4 seconds before starting the concurrentStart function
setTimeout(concurrentStart, 4000);

/*
==========================
=== Step-by-step Timeline ===
==========================

1. After 4 seconds → `concurrentStart` is called.
2. Logs:
   ==CONCURRENT START with await==
   starting slow promise
   starting fast promise

3. After 1 second:
   fast promise is done  <-- The fast promise finishes first

4. After 2 seconds:
   slow promise is done  <-- The slow promise finishes second

5. `await slow` resolves, and logs:
   slow

6. `await fast` resolves immediately (already done), and logs:
   fast

=====================
=== Final Output ===
=====================

==CONCURRENT START with await==
starting slow promise
starting fast promise
fast promise is done
slow promise is done
slow
fast

=====================
=== Explanation ===
=====================
- Both promises are started concurrently (in parallel) because they are 
  called before the `await` keyword is used.
- The `fast` promise completes first, but the code waits for the `slow` 
  promise due to `await slow`.
- After `slow` resolves, the result "slow" is logged, then 
  "fast" is logged immediately after because the fast promise had already finished.
*/
