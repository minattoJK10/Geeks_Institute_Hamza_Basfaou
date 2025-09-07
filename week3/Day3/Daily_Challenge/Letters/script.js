const input = document.getElementById("letterInput");

// Listen for input changes
input.addEventListener("input", () => {
    // Replace anything that is NOT a letter with an empty string
    input.value = input.value.replace(/[^a-zA-Z]/g, '');
});
