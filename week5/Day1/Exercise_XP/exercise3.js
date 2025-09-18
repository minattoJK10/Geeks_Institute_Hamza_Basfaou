// Create promises
const promise1 = Promise.resolve(3);       // This will resolve with value 3
const promise2 = Promise.reject("Boo!");   // This will reject with message "Boo!"

// Use Promise.allSettled to handle both
Promise.allSettled([promise1, promise2])
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`Promise ${index + 1} Resolved:`, result.value);
      } else {
        console.log(`Promise ${index + 1} Rejected:`, result.reason);
      }
    });
  });
