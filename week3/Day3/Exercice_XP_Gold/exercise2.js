// Get references to the select element and button
const select = document.getElementById("colorSelect");
const button = document.getElementById("removeBtn");

// Add click event listener to the button
button.addEventListener("click", removecolor);

function removecolor() {
    // Get the index of the selected option
    const selectedIndex = select.selectedIndex;

    if (selectedIndex !== -1) {
        // Remove the selected option
        select.remove(selectedIndex);
    }
}
