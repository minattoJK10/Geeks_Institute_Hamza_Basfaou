// Function that returns a Promise that resolves after 2 seconds
function resolveAfter2Seconds() {
    return new Promise(resolve => {
        // setTimeout simulates a delay of 2 seconds (2000ms)
        setTimeout(() => {
            resolve('resolved'); // The promise is resolved with the value 'resolved'
        }, 2000);
    });
}

// Async function that calls resolveAfter2Seconds
async function asyncCall() {
    console.log('calling'); 
    // Logs 'calling' immediately to the console

    // The 'await' pauses the execution of asyncCall until the Promise is resolved
    let result = await resolveAfter2Seconds();

    // Once the promise is resolved after 2 seconds, this line executes
    console.log(result); 
    // Logs the resolved value: 'resolved'
}

// Execute the async function
asyncCall();

/*
--------- OUTPUT FLOW ----------
1. Immediately: "calling"
2. After 2 seconds delay: "resolved"

--------- EXPLANATION ----------
- 'asyncCall' starts executing.
- It logs "calling" right away.
- Then, it waits (because of 'await') for resolveAfter2Seconds() to complete.
- resolveAfter2Seconds() takes 2 seconds before resolving.
- Once resolved, "resolved" is logged to the console.
*/
