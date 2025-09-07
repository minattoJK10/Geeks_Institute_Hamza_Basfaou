const select = document.getElementById("genres");
const display = document.getElementById("display");

// Display the initially selected value
display.textContent = select.value;

// Listen for changes in the select element
select.addEventListener("change", () => {
    display.textContent = select.value;
});

// Add a new option dynamically
const newOption = document.createElement("option");
newOption.value = "classic";
newOption.textContent = "Classic";
newOption.selected = true; // make it selected by default
select.appendChild(newOption);

// Update display to show the newly selected option
display.textContent = select.value;
