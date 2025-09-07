// ===== Step 1: Declare a global variable =====
let allBoldItems = []; // This will store all <strong> elements

// ===== Step 2: Create getBoldItems() =====
function getBoldItems() {
  // Collect all <strong> tags inside the paragraph
  allBoldItems = document.querySelectorAll('#text strong');
  console.log("Bold items found:", allBoldItems);
}

// ===== Step 3: Create highlight() =====
function highlight() {
  // Change color of all bold text to blue
  allBoldItems.forEach(item => {
    item.style.color = "blue";
  });
}

// ===== Step 4: Create returnItemsToDefault() =====
function returnItemsToDefault() {
  // Change color of all bold text back to black
  allBoldItems.forEach(item => {
    item.style.color = "black";
  });
}

// ===== Step 5: Attach mouse events =====
const paragraph = document.getElementById('text');

// Call getBoldItems() to initialize the bold elements
getBoldItems();

// On mouse over the paragraph -> highlight text
paragraph.addEventListener('mouseover', highlight);

// On mouse out of the paragraph -> reset text color
paragraph.addEventListener('mouseout', returnItemsToDefault);
