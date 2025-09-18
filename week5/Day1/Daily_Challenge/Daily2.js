const readline = require("readline");

const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`;

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 1. Convert JSON string to JS object
function toJs() {
  return new Promise((resolve, reject) => {
    try {
      const morseJS = JSON.parse(morse);
      if (Object.keys(morseJS).length === 0) reject("Morse object is empty!");
      else resolve(morseJS);
    } catch {
      reject("Error parsing JSON");
    }
  });
}

// 2. Convert user input to Morse
function toMorse(morseJS) {
  return new Promise((resolve, reject) => {
    rl.question("Enter a word or sentence: ", (userInput) => {
      const translation = [];
      userInput = userInput.toLowerCase();

      for (let char of userInput) {
        if (char === " ") continue; // skip spaces
        if (!morseJS[char]) {
          reject(`Character "${char}" does not exist in Morse code!`);
          rl.close();
          return;
        }
        translation.push(morseJS[char]);
      }

      rl.close();
      resolve(translation);
    });
  });
}

// 3. Join Morse array and display in console
function joinWords(morseTranslation) {
  console.log(morseTranslation.join("\n"));
}

// Chain the functions
toJs()
  .then(toMorse)
  .then(joinWords)
  .catch(err => console.error(err));
