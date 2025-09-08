/*Part1*/
/*
function makeJuice(size) {
  // Inner function
  function addIngredients(ing1, ing2, ing3) {
    const sentence = `The client wants a ${size} juice, containing ${ing1}, ${ing2}, and ${ing3}.`;
    document.getElementById('output').innerHTML = `<p>${sentence}</p>`;
  }

  // Call inner function once
  addIngredients("apple", "banana", "mango");
}

// Invoke outer function
makeJuice("large");
*/
/*Part2*/
function makeJuice(size) {
  // Array to store ingredients
  const ingredients = [];

  // Inner function to add ingredients
  function addIngredients(ing1, ing2, ing3) {
    ingredients.push(ing1, ing2, ing3);
  }

  // Inner function to display final juice order
  function displayJuice() {
    const sentence = `The client wants a ${size} juice, containing ${ingredients.join(", ")}.`;
    document.getElementById('output').innerHTML = `<p>${sentence}</p>`;
  }

  // Add 6 ingredients (invoke twice)
  addIngredients("apple", "banana", "mango");
  addIngredients("orange", "kiwi", "strawberry");

  // Display final order
  displayJuice();
}

// Invoke outer function
makeJuice("medium");
