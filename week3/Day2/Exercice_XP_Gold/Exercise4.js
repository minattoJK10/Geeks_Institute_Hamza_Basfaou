function isOmnipresent(arr, value) {
  for (let subArray of arr) {
    if (!subArray.includes(value)) {
      return false;
    }
  }
  return true;
}

console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 1)); // true
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 6)); // false
