// Your Giphy API key
const API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

// Elements from the DOM
const form = document.getElementById("gifForm");
const searchInput = document.getElementById("searchInput");
const gifContainer = document.getElementById("gif-container");
const errorMsg = document.getElementById("errorMsg");
const deleteAllBtn = document.getElementById("deleteAll");


// Event listener for form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent page reload
  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
    errorMsg.textContent = "Please enter a search term!";
    return;
  }

  errorMsg.textContent = ""; // Clear previous errors
  gifContainer.innerHTML = ""; // Clear old GIFs

  try {
    // Fetch GIFs from Giphy API
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en`
    );

    // Check for errors in the response
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // If no GIFs are found
    if (data.data.length === 0) {
      errorMsg.textContent = "No GIFs found for this search term.";
      return;
    }

    // Display each GIF on the page
    data.data.forEach(gif => {
      const img = document.createElement("img");
      img.src = gif.images.fixed_height.url; // URL for the GIF
      img.alt = gif.title;
      gifContainer.appendChild(img);
    });

  } catch (error) {
    // Handle network or fetch errors
    console.error("Error fetching GIFs:", error);
    errorMsg.textContent = "Oops! Failed to fetch GIFs. Please try again.";
  }
});
deleteAllBtn.addEventListener("click", () => {
  gifContainer.innerHTML = ""; // Clear all GIFs inside the container
});
