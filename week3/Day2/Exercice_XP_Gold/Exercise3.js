function swapCase(str) {
  let swapped = '';
  for (let char of str) {
    if (char === char.toUpperCase()) {
      swapped += char.toLowerCase();
    } else {
      swapped += char.toUpperCase();
    }
  }
  return swapped;
}

console.log(swapCase('The Quick Brown Fox')); 
// tHE qUICK bROWN fOX
