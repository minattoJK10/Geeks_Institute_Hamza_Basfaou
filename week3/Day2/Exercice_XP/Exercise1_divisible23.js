
function displayNumbersDivisible(divisor = 23) {
    let sum = 0;
    for (let i = 0; i <= 500; i++) {
        if (i % divisor === 0) {
            process.stdout.write(i + " "); // prints inline
            sum += i;
        }
    }
    console.log("\nSum:", sum);
}

displayNumbersDivisible(); // default 23
// displayNumbersDivisible(3);
// displayNumbersDivisible(45);
