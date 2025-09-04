function abbrevName(fullName) {
  let words = fullName.split(' ');
  return `${words[0]} ${words[1].charAt(0).toUpperCase()}.`;
}

console.log(abbrevName("Robin Singh")); // Robin S.
console.log(abbrevName("Hamza Basfaou")); // Hamza B.
