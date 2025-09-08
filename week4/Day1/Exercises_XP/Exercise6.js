(function(children, partner, location, job) {
    const message = `You will be a ${job} in ${location}, and married to ${partner} with ${children} kids.`;
    // Display in the DOM
    document.body.innerHTML = `<h2>${message}</h2>`;
})(3, "Sarah", "Paris", "Software Engineer");
