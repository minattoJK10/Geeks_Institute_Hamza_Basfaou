const form = document.getElementById('sunrise-form');
const resultDiv = document.getElementById('result');

// Fetch sunrise data for a city using its latitude and longitude
async function fetchSunrise(lat, lng) {
  const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch sunrise data');
  }

  const data = await response.json();
  return data.results.sunrise; // Return the sunrise time
}

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get values from inputs
  const lat1 = document.getElementById('lat1').value.trim();
  const lng1 = document.getElementById('lng1').value.trim();
  const lat2 = document.getElementById('lat2').value.trim();
  const lng2 = document.getElementById('lng2').value.trim();

  // Validate inputs
  if (!lat1 || !lng1 || !lat2 || !lng2) {
    resultDiv.innerHTML = `<p class="error">Please fill in all fields!</p>`;
    return;
  }

  try {
    resultDiv.innerHTML = `<p>Loading sunrise times...</p>`;

    // Run both fetch requests in parallel using Promise.all
    const [sunrise1, sunrise2] = await Promise.all([
      fetchSunrise(lat1, lng1),
      fetchSunrise(lat2, lng2),
    ]);

    // Convert UTC time to local time
    const city1Sunrise = new Date(sunrise1).toLocaleTimeString();
    const city2Sunrise = new Date(sunrise2).toLocaleTimeString();

    // Display results
    resultDiv.innerHTML = `
      <p>🌇 City 1 Sunrise: <strong>${city1Sunrise}</strong></p>
      <p>🌆 City 2 Sunrise: <strong>${city2Sunrise}</strong></p>
    `;
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  }
});
