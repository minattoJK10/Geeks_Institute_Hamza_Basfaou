// Function that simulates a slow operation, which resolves after 2 seconds
let resolveAfter2Seconds = function () {
    console.log("starting slow promise"); 
    // Logged immediately when this function is called

    return new Promise(resolve => {
        setTimeout(function () {
            resolve("slow"); // The promise is resolved with the value "slow"
            console.log("slow promise is done"); 
            // Logged AFTER 2 seconds when the promise finishes
        }, 2000); // 2000ms = 2 seconds delay
    });
};

// Function that simulates a fast operation, which resolves after 1 second
let resolveAfter1Second = function () {
    console.log("starting fast promise"); 
    // Logged immediately when this function is called

    return new Promise(resolve => {
        setTimeout(function () {
            resolve("fast"); // The promise is resolved with the value "fast"
            console.log("fast promise is done"); 
            // Logged AFTER 1 second when the promise finishes
        }, 1000); // 1000ms = 1 second delay
    });
};

// Async function that will execute the two promises SEQUENTIALLY
let sequentialStart = async function () {
    console.log('==SEQUENTIAL START=='); 
    // Step 1: Start of the process

    // Step 2: Start slow promise and WAIT for it to resolve before moving on
    const slow = await resolveAfter2Seconds();
    console.log(slow); 
    // Logged after 2 seconds: "slow"

    // Step 3: Once the slow promise is done, start the fast promise
    const fast = await resolveAfter1Second();
    console.log(fast); 
    // Logged 1 second later: "fast"
};

// Call the async function
sequentialStart();

/*
====================== EXPLANATION ======================
1. "sequentialStart" runs and logs the start message.
2. "resolveAfter2Seconds" runs FIRST, logs "starting slow promise",
   waits 2 seconds, then resolves and logs "slow promise is done".
3. Once it's resolved, "slow" is logged.
4. THEN "resolveAfter1Second" starts, logs "starting fast promise",
   waits 1 second, then resolves and logs "fast promise is done".
5. Finally, "fast" is logged.

====================== FINAL CONSOLE OUTPUT ======================
==SEQUENTIAL START==
starting slow promise
slow promise is done
slow
starting fast promise
fast promise is done
fast

====================== TIMING ======================
- At 0s: Logs start messages.
- At 2s: Slow promise resolves -> logs "slow promise is done" and "slow".
- At 3s: Fast promise resolves -> logs "fast promise is done" and "fast".

Total runtime = 2 seconds (slow) + 1 second (fast) = 3 seconds
*/
