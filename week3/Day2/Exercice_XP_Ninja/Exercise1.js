// Step 1: Generate a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;
console.log("Random Number:", randomNumber);

// Step 2: Console.log all even numbers from 0 to the random number
for (let i = 0; i <= randomNumber; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}
