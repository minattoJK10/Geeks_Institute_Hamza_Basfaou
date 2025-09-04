function capitalize(str) {
  let evenCaps = "";
  let oddCaps = "";

  for (let i = 0; i < str.length; i++) {
    if (i % 2 === 0) {
      evenCaps += str[i].toUpperCase(); // Even index uppercase
      oddCaps += str[i];                // Odd version stays lowercase
    } else {
      evenCaps += str[i];                // Even version stays lowercase
      oddCaps += str[i].toUpperCase();   // Odd index uppercase
    }
  }

  return [evenCaps, oddCaps];
}

// Example usage
console.log(capitalize("abcdef")); // ['AbCdEf', 'aBcDeF']
