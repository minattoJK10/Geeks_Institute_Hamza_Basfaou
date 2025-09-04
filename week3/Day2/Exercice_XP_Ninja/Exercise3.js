function isPalindrome(str) {
  // Step 1: Remove spaces, punctuation, and special characters
  str = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();

  // Step 2: Reverse the cleaned string
  const reversedStr = str.split('').reverse().join('');

  // Step 3: Compare original with reversed
  return str === reversedStr;
}

// Example usage
console.log(isPalindrome("Madam"));                     // true
console.log(isPalindrome("A man a plan a canal Panama")); // true
console.log(isPalindrome("No lemon, no melon!"));       // true
console.log(isPalindrome("Hello World"));               // false
