// =======================
// Part I - setTimeout (alert after 2 seconds)
// =======================
setTimeout(() => {
  alert("Hello World");
}, 2000); // 2000ms = 2 seconds

// =======================
// Part II - setTimeout (add paragraph after 2 seconds)
// =======================
setTimeout(() => {
  const container = document.getElementById("container");
  const paragraph = document.createElement("p");
  paragraph.textContent = "Hello World";
  container.appendChild(paragraph);
}, 2000);

// =======================
// Part III - setInterval (add paragraph every 2 seconds)
// =======================
const container = document.getElementById("container");
const clearButton = document.getElementById("clear");

let intervalId = setInterval(() => {
  // Create new <p>Hello World</p>
  const paragraph = document.createElement("p");
  paragraph.textContent = "Hello World";
  container.appendChild(paragraph);

  // Automatically stop when there are 5 paragraphs
  if (container.getElementsByTagName("p").length === 5) {
    clearInterval(intervalId);
    console.log("Interval stopped automatically: 5 paragraphs reached.");
  }
}, 2000);

// =======================
// Allow manual stop using button
// =======================
clearButton.addEventListener("click", () => {
  clearInterval(intervalId);
  console.log("Interval cleared manually by user.");
});
