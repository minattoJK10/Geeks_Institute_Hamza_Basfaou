const gameInfo = [
  {
    username: "john",
    team: "red",
    score: 5,
    items: ["ball", "book", "pen"]
  },
  {
    username: "becky",
    team: "blue",
    score: 10,
    items: ["tape", "backpack", "pen"]
  },
  {
    username: "susy",
    team: "red",
    score: 55,
    items: ["ball", "eraser", "pen"]
  },
  {
    username: "tyson",
    team: "green",
    score: 1,
    items: ["book", "pen"]
  },
];

const usernames = [];
const winners = [];
let totalScore = 0;

gameInfo.forEach(player => {
  // 1. Add "!" to usernames
  usernames.push(player.username + "!");

  // 2. Push usernames with score > 5
  if (player.score > 5) {
    winners.push(player.username);
  }

  // 3. Sum all scores
  totalScore += player.score;
});

console.log("Usernames:", usernames);  // ["john!", "becky!", "susy!", "tyson!"]
console.log("Winners:", winners);      // ["becky", "susy"]
console.log("Total Score:", totalScore); // 71
