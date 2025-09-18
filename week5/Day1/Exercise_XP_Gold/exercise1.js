const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'foo');
});

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values);//[3, 42, "foo"]
  })
  .catch(error => {
    console.error(error);
  });
// Promise.all waits for all promises in the array to resolve.
// The output is an array with resolved values in order: [promise1, promise2, promise3].
// If any promise rejects, Promise.all rejects immediately with that error.
