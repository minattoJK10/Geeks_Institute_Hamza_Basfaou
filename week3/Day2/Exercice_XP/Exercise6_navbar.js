const nav = document.getElementById("navBar");
nav.setAttribute("id", "socialNetworkNavigation");

// Add new <li> Logout
const li = document.createElement("li");
li.textContent = "Logout";
nav.querySelector("ul").appendChild(li);

// Retrieve first and last <li>
const ul = nav.querySelector("ul");
console.log("First:", ul.firstElementChild.textContent);
console.log("Last:", ul.lastElementChild.textContent);
