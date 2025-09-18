function delayedSuccess() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("success");
    }, 4000);
  });
}

delayedSuccess()
  .then(result => console.log(result));
