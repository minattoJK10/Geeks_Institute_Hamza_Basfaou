const form = document.getElementById('gif-form');
const searchInput = document.getElementById('search-input');
const gifContainer = document.getElementById('gif-container');
const deleteAllBtn = document.getElementById('delete-all');

// Your Giphy API key
const API_KEY = 'hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';

// Fetch a random GIF based on the user's search term
async function fetchRandomGif(searchTerm) {
  try {
    // API endpoint
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${searchTerm}`
    );

    // Check if response is okay
    if (!response.ok) {
      throw new Error('Failed to fetch GIF');
    }

    const data = await response.json();

    // Extract the GIF URL
    const gifUrl = data.data.images.downsized_large.url;

    // Append the GIF to the page
    appendGif(gifUrl);
  } catch (error) {
    console.error('Error fetching GIF:', error);
    alert('Oops! Something went wrong. Please try again.');
  }
}

// Append GIF to the DOM with a DELETE button
function appendGif(url) {
  const gifItem = document.createElement('div');
  gifItem.classList.add('gif-item');

  // Create the image
  const img = document.createElement('img');
  img.src = url;

  // Create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'DELETE';
  deleteBtn.classList.add('delete-btn');

  // Event to delete only this GIF
  deleteBtn.addEventListener('click', () => {
    gifContainer.removeChild(gifItem);
  });

  gifItem.appendChild(img);
  gifItem.appendChild(deleteBtn);
  gifContainer.appendChild(gifItem);
}

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = searchInput.value.trim();

  if (searchTerm) {
    fetchRandomGif(searchTerm);
    searchInput.value = ''; // Clear input
  } else {
    alert('Please enter a category to search.');
  }
});

// Handle Delete All button
deleteAllBtn.addEventListener('click', () => {
  gifContainer.innerHTML = ''; // Remove all GIFs
});
