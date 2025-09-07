// 1. Retrieve the h1 and console.log it
const h1 = document.querySelector('article h1');
console.log(h1);

// 2. Remove the last paragraph
const article = document.querySelector('article');
const paragraphs = article.querySelectorAll('p');
paragraphs[paragraphs.length - 1].remove();

// 3. Change h2 background color on click
const h2 = document.querySelector('article h2');
h2.addEventListener('click', () => {
    h2.style.backgroundColor = 'red';
});

// 4. Hide h3 on click
const h3 = document.querySelector('article h3');
h3.addEventListener('click', () => {
    h3.style.display = 'none';
});

// 5. Make all paragraphs bold when button clicked
const boldButton = document.getElementById('boldButton');
boldButton.addEventListener('click', () => {
    const allParagraphs = article.querySelectorAll('p');
    allParagraphs.forEach(p => p.style.fontWeight = 'bold');
});

// BONUS 1: Random font size on h1 hover
h1.addEventListener('mouseover', () => {
    const randomSize = Math.floor(Math.random() * 101); // 0 to 100 px
    h1.style.fontSize = `${randomSize}px`;
});

// BONUS 2: Fade out second paragraph on hover
const secondParagraph = document.querySelector('p.fade');
secondParagraph.addEventListener('mouseover', () => {
    secondParagraph.classList.add('fade-out');
});
secondParagraph.addEventListener('mouseout', () => {
    secondParagraph.classList.remove('fade-out');
});
