const allBooks = [
    {
        title: "Harry Potter",
        author: "JK Rowling",
        image: "https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg",
        alreadyRead: true
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        image: "https://upload.wikimedia.org/wikipedia/en/4/4a/TheHobbit_FirstEdition.jpg",
        alreadyRead: false
    }
];

const section = document.querySelector(".listBooks");

allBooks.forEach(book => {
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.textContent = `${book.title} written by ${book.author}`;
    if (book.alreadyRead) p.style.color = "red";

    const img = document.createElement("img");
    img.src = book.image;
    img.width = 100;

    div.appendChild(p);
    div.appendChild(img);
    section.appendChild(div);
});
