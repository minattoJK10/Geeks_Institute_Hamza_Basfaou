// Self-invoking function (IIFE)
(function(userName) {
    // Select the navbar
    const navbar = document.getElementById('navbar');

    // Create a div to hold user info
    const userDiv = document.createElement('div');
    userDiv.classList.add('user-info');

    // Add username and profile picture
    userDiv.innerHTML = `
        <span>Welcome, ${userName}</span>
        <img src="https://i.postimg.cc/yYvZrWx7/35x45.jpg" alt="Profile Picture">
    `;

    // Append user info to the navbar
    navbar.appendChild(userDiv);
})("Hamza"); // <-- Passing "John" as the argument
