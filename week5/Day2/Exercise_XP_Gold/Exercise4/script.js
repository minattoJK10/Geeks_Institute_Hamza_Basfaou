// Array of API URLs
const urls = [
  "https://jsonplaceholder.typicode.com/users",  // 1: Users endpoint
  "https://jsonplaceholder.typicode.com/posts",  // 2: Posts endpoint
  "https://jsonplaceholder.typicode.com/albums"  // 3: Albums endpoint
];

// Async function to fetch data
const getData = async function () {
  try {
    /*
      Promise.all is used here to fetch all three URLs concurrently.
      If ANY of the fetch calls fail, the whole Promise.all will reject
      and go directly to the catch block.
    */
    const [users, posts, albums] = await Promise.all(
      urls.map(async (url) => {
        // Fetch each URL with await
        const resp = await fetch(url);

        // Check if the response status is not OK (error handling)
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }

        // Parse and return JSON data
        return await resp.json();
      })
    );

    // Log the retrieved data to the console
    console.log("users", users);
    console.log("posts", posts);
    console.log("albums", albums);

  } catch (error) {
    // Catch network errors or failed fetch
    console.log("ooooooops TypeError: Failed to fetch", error.message);
  }
};

// Call the function
getData();
