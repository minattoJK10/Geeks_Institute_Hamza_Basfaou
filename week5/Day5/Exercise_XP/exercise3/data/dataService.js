const axios = require("axios");

// Function to fetch posts from JSONPlaceholder
async function fetchPosts() {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching posts from JSONPlaceholder");
  }
}

module.exports = { fetchPosts };
