const container = document.getElementById("container");
console.log(container);

// Change Pete to Richard
document.querySelectorAll("ul.list li")[1].textContent = "Richard";

// Delete second <li> of second <ul>
document.querySelectorAll("ul.list")[1].removeChild(document.querySelectorAll("ul.list")[1].children[1]);

// Change first <li> of each <ul> to your name
document.querySelectorAll("ul.list").forEach(ul => ul.children[0].textContent = "Hamza");

// Add classes
document.querySelectorAll("ul.list").forEach(ul => ul.classList.add("student_list"));
document.querySelectorAll("ul.list")[0].classList.add("university", "attendance");

// Style modifications
container.style.backgroundColor = "lightblue";
container.style.padding = "10px";

document.querySelectorAll("ul.list li").forEach(li => {
    if (li.textContent === "Dan") li.style.display = "none";
    if (li.textContent === "Richard") li.style.border = "1px solid black";
});

document.body.style.fontSize = "16px";

// Bonus alert
if (container.style.backgroundColor === "lightblue") {
    const users = Array.from(container.parentElement.querySelectorAll("ul.list li")).map(li => li.textContent).filter(n => n);
    alert(`Hello ${users.join(" and ")}`);
}
