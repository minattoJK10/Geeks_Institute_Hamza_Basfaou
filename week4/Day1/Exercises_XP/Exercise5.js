/*Step 1*/
function kgToGrams(weightInKg) {
    return weightInKg * 1000;
}

console.log(kgToGrams(5)); // Output: 5000

/*Step2*/
const convertKgToGrams = function(weightInKg) {
    return weightInKg * 1000;
};

console.log(convertKgToGrams(3)); // Output: 3000

/*Step3*/
const kgToGramsArrow = weightInKg => weightInKg * 1000;

console.log(kgToGramsArrow(2)); // Output: 2000

// Function declaration is hoisted, function expression is not hoisted.

