// =======================
// Exercise 3 : Analyze #5
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

let parallel = async function () {
    console.log('==PARALLEL with await Promise.all==');
    // Start 2 "jobs" in parallel and wait for both to complete
    await Promise.all([
        (async () => console.log(await resolveAfter2Seconds()))(),
        (async () => console.log(await resolveAfter1Second()))()
    ]);
}

setTimeout(parallel, 5000);

/*
Résultat attendu :
1. 5s -> "==PARALLEL with await Promise.all=="
2. immédiatement -> "starting slow promise", "starting fast promise"
3. +1s -> "fast promise is done"
4. +2s -> "slow promise is done"
5. ensuite -> "slow", "fast"
*/
