function uniqueElements(arr) {
  return arr.filter((value, index) => arr.indexOf(value) === index);
}

// Example usage
const list = [1, 2, 3, 3, 3, 3, 4, 5];
console.log(uniqueElements(list)); // [1, 2, 3, 4, 5]
