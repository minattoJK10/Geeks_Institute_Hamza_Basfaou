function keysAndValues(obj) {
  // Get keys and sort them alphabetically
  const keys = Object.keys(obj).sort();

  // Map sorted keys to their corresponding values
  const values = keys.map(key => obj[key]);

  // Return both as separate arrays
  return [keys, values];
}

// Test examples
console.log(keysAndValues({ a: 1, b: 2, c: 3 }));
// ➞ [["a", "b", "c"], [1, 2, 3]]

console.log(keysAndValues({ a: "Apple", b: "Microsoft", c: "Google" }));
// ➞ [["a", "b", "c"], ["Apple", "Microsoft", "Google"]]

console.log(keysAndValues({ key1: true, key2: false, key3: undefined }));
// ➞ [["key1", "key2", "key3"], [true, false, undefined]]
