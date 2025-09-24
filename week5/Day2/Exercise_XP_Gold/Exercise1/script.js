const API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"; // Provided API key
const gifContainer = document.getElementById('gifContainer');
const errorMsg = document.getElementById('error');
const button = document.getElementById('fetchGifBtn');

async function fetchRandomGif() {
  try {
    errorMsg.textContent = ""; // Clear previous error messages
    gifContainer.innerHTML = "<p>Loading...</p>";

    // Giphy Random Endpoint
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

    const response = await fetch(url);

    // Check if response is OK
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Extract gif URL
    const gifUrl = data.data.images.original.url;

    // Display the gif
    gifContainer.innerHTML = `<img src="${gifUrl}" alt="Random GIF"/>`;
  } catch (error) {
    console.error("Error fetching the GIF:", error);
    gifContainer.innerHTML = "";
    errorMsg.textContent = "Failed to load GIF. Please try again later.";
  }
}

// Event listener for button click
button.addEventListener('click', fetchRandomGif);
