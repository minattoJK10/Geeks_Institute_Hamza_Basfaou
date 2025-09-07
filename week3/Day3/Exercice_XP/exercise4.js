// ===== Step 1: Select elements =====
const form = document.getElementById('MyForm');
const radiusInput = document.getElementById('radius');
const volumeInput = document.getElementById('volume');
const errorMsg = document.getElementById('errorMsg');

// ===== Step 2: Add event listener for form submission =====
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from refreshing the page

  // Get the radius value and convert it to a number
  const radius = parseFloat(radiusInput.value);

  // ===== Step 3: Validate the input =====
  if (isNaN(radius) || radius <= 0) {
    errorMsg.textContent = "⚠️ Please enter a valid positive number for the radius.";
    volumeInput.value = ""; // Clear the volume field
    return;
  }

  // Clear any previous error
  errorMsg.textContent = "";

  // ===== Step 4: Calculate the volume =====
  // Formula for volume of a sphere: (4/3) * π * r³
  const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);

  // ===== Step 5: Display the result rounded to 2 decimals =====
  volumeInput.value = volume.toFixed(2);
});
