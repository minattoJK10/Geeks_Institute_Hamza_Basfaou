// =======================
// Exercise 4 : Analyze #6
// =======================

let resolveAfter2Seconds = function () {
    console.log("starting slow promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("slow");
            console.log("slow promise is done");
        }, 2000);
    });
};

let resolveAfter1Second = function () {
    console.log("starting fast promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("fast");
            console.log("fast promise is done");
        }, 1000);
    });
};

// This function runs two promises independently
let parallelPromise = function () {
    console.log('==PARALLEL with Promise.then==');
    resolveAfter2Seconds().then((message) => console.log(message));
    resolveAfter1Second().then((message) => console.log(message));
}

setTimeout(parallelPromise, 13000);

/*
Résultat attendu :
1. 13s -> "==PARALLEL with Promise.then=="
2. immédiatement -> "starting slow promise", "starting fast promise"
3. +1s -> "fast promise is done"
4. +2s -> "slow promise is done"
5. ensuite -> "slow", "fast"
*/
