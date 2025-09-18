// Function 1: Convert all words to uppercase
function makeAllCaps(words) {
    return new Promise((resolve, reject) => {
        // Check if all elements are strings
        const allStrings = words.every(word => typeof word === 'string');
        if (allStrings) {
            const uppercased = words.map(word => word.toUpperCase());
            resolve(uppercased);
        } else {
            reject('Error: Not all items are strings');
        }
    });
}

// Function 2: Sort words alphabetically if length > 4
function sortWords(words) {
    return new Promise((resolve, reject) => {
        if (words.length > 4) {
            const sorted = words.slice().sort(); // sort alphabetically
            resolve(sorted);
        } else {
            reject('Error: Array length must be bigger than 4');
        }
    });
}

// Test cases

// 1. Contains a number → should reject in makeAllCaps
makeAllCaps([1, "pear", "banana"])
      .then(arr => sortWords(arr))
      .then(result => console.log(result))
      .catch(error => console.log(error)); 
// Output: "Error: Not all items are strings"

// 2. Array length not > 4 → should reject in sortWords
makeAllCaps(["apple", "pear", "banana"])
      .then(arr => sortWords(arr))
      .then(result => console.log(result))
      .catch(error => console.log(error)); 
// Output: "Error: Array length must be bigger than 4"

// 3. Valid case → uppercased & sorted
makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
      .then(arr => sortWords(arr))
      .then(result => console.log(result))
      .catch(error => console.log(error)); 
// Output: ["APPLE","BANANA","KIWI","MELON","PEAR"]
