const curriedSum = (a) => (b) => a + b;
const add5 = curriedSum(5);
console.log(add5(12));
