// Arrow function to check if a value is a string
const isString = value => typeof value === 'string';

// Testing the function
console.log(isString('hello'));  // true
console.log(isString([1, 2, 4, 0])); // false
console.log(isString(123)); // false
console.log(isString('123')); // true
