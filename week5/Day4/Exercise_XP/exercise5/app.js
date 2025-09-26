// app.js

// Import lodash
const _ = require('lodash');

// Import custom math module
const math = require('./math');

// Use the math module
const sum = math.add(10, 5);
const product = math.multiply(10, 5);

console.log(`Sum: ${sum}`);
console.log(`Product: ${product}`);

// Use lodash to sum an array
const numbers = [1, 2, 3, 4, 5];
const lodashSum = _.sum(numbers);

console.log(`Lodash sum of [1,2,3,4,5]: ${lodashSum}`);

// Use lodash to find the maximum number
const maxNumber = _.max(numbers);
console.log(`Max number in array: ${maxNumber}`);
