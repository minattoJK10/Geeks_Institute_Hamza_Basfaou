// =======================
// Exercise 2 : Analyze #4
// =======================

let resolveAfter2Seconds = function () {
    console.log("starting slow promise"); // Logs immediately
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("slow"); // resolves after 2 seconds
            console.log("slow promise is done"); // logs after 2 seconds
        }, 2000);
    });
};

let resolveAfter1Second = function () {
    console.log("starting fast promise"); // Logs immediately
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("fast"); // resolves after 1 second
            console.log("fast promise is done"); // logs after 1 second
        }, 1000);
    });
};

// This function runs both promises concurrently using Promise.all
let concurrentPromise = function () {
    console.log('==CONCURRENT START with Promise.all=='); // Logs immediately
    return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()])
        .then((messages) => {
            console.log(messages[0]); // logs "slow"
            console.log(messages[1]); // logs "fast"
        });
}

// Schedule the concurrentPromise to run after 1 second
setTimeout(concurrentPromise, 1000);

/*
Résultat attendu :
1. 1s -> "==CONCURRENT START with Promise.all=="
2. immédiatement -> "starting slow promise", "starting fast promise"
3. +1s -> "fast promise is done"
4. +1s (total 2s) -> "slow promise is done"
5. enfin -> "slow", "fast"
*/
