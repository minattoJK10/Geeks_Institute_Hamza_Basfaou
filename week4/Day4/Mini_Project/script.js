// Initial array of quotes
let quotes = [
  { id: 0, author: "Charles Lindbergh", quote: "Life is like a landscape. You live in the midst of it but can describe it only from the vantage point of distance.", likes: 0 },
  { id: 1, author: "Albert Einstein", quote: "Life is like riding a bicycle. To keep your balance, you must keep moving.", likes: 0 },
  { id: 2, author: "Oscar Wilde", quote: "Be yourself; everyone else is already taken.", likes: 0 }
];

let lastQuoteIndex = -1;

// DOM Elements
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const generateBtn = document.getElementById("generate-btn");

// Generate random quote
generateBtn.addEventListener("click", () => {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (randomIndex === lastQuoteIndex); // Ensure it's not the same as the last

  lastQuoteIndex = randomIndex;
  const randomQuote = quotes[randomIndex];
  quoteEl.textContent = randomQuote.quote;
  authorEl.textContent = randomQuote.author;
});

// Part 2: Add new quote
document.getElementById("add-quote-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const newQuote = document.getElementById("new-quote").value.trim();
  const newAuthor = document.getElementById("new-author").value.trim();

  if (newQuote && newAuthor) {
    const newId = quotes.length;
    quotes.push({ id: newId, author: newAuthor, quote: newQuote, likes: 0 });
    alert("New quote added!");
    e.target.reset();
  }
});

// Extra buttons
const infoEl = document.getElementById("info");

// Count characters including spaces
document.getElementById("char-with-space").addEventListener("click", () => {
  if (quoteEl.textContent) {
    infoEl.textContent = `Characters (with spaces): ${quoteEl.textContent.length}`;
  }
});

// Count characters excluding spaces
document.getElementById("char-no-space").addEventListener("click", () => {
  if (quoteEl.textContent) {
    const noSpaces = quoteEl.textContent.replace(/\s/g, "");
    infoEl.textContent = `Characters (no spaces): ${noSpaces.length}`;
  }
});

// Count words
document.getElementById("word-count").addEventListener("click", () => {
  if (quoteEl.textContent) {
    const words = quoteEl.textContent.trim().split(/\s+/);
    infoEl.textContent = `Word count: ${words.length}`;
  }
});

// Like button
document.getElementById("like-btn").addEventListener("click", () => {
  const currentQuote = quotes[lastQuoteIndex];
  if (currentQuote) {
    currentQuote.likes++;
    infoEl.textContent = `Likes: ${currentQuote.likes}`;
  }
});


// Part 3: Filter by author
let filteredQuotes = [];
let filterIndex = 0;

document.getElementById("filter-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const author = document.getElementById("filter-author").value.trim().toLowerCase();
  filteredQuotes = quotes.filter(q => q.author.toLowerCase() === author);

  if (filteredQuotes.length > 0) {
    filterIndex = 0;
    displayFilteredQuote();
  } else {
    document.getElementById("filter-display").textContent = "No quotes found for this author.";
  }
});

function displayFilteredQuote() {
  const quoteObj = filteredQuotes[filterIndex];
  document.getElementById("filter-display").textContent = `${quoteObj.quote} - ${quoteObj.author}`;
}

// Navigation for filtered quotes
document.getElementById("prev-quote").addEventListener("click", () => {
  if (filteredQuotes.length > 0) {
    filterIndex = (filterIndex - 1 + filteredQuotes.length) % filteredQuotes.length;
    displayFilteredQuote();
  }
});

document.getElementById("next-quote").addEventListener("click", () => {
  if (filteredQuotes.length > 0) {
    filterIndex = (filterIndex + 1) % filteredQuotes.length;
    displayFilteredQuote();
  }
});
