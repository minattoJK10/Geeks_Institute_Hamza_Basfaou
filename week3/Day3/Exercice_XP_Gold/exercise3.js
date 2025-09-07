// Create an empty shopping list array
let shoppingList = [];

// Get reference to root div
const root = document.getElementById("root");

// Create form
const form = document.createElement("form");

// Create text input
const input = document.createElement("input");
input.type = "text";
input.placeholder = "Enter item";
input.id = "itemInput";

// Create AddItem button
const addButton = document.createElement("button");
addButton.type = "button";
addButton.textContent = "AddItem";

// Create ClearAll button
const clearButton = document.createElement("button");
clearButton.type = "button";
clearButton.textContent = "ClearAll";

// Create a list to display shopping items
const list = document.createElement("ul");

// Append input and buttons to form
form.appendChild(input);
form.appendChild(addButton);
form.appendChild(clearButton);

// Append form and list to root
root.appendChild(form);
root.appendChild(list);

// Function to add item
function addItem() {
    const item = input.value.trim();
    if (item !== "") {
        shoppingList.push(item);
        displayList();
        input.value = ""; // clear input field
    }
}

// Function to clear all items
function clearAll() {
    shoppingList = [];
    displayList();
}

// Function to display shopping list
function displayList() {
    list.innerHTML = ""; // clear current list
    shoppingList.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });
}

// Event listeners
addButton.addEventListener("click", addItem);
clearButton.addEventListener("click", clearAll);
