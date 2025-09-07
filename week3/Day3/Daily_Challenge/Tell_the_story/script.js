const form = document.getElementById("libform");
const storySpan = document.getElementById("story");
const shuffleBtn = document.getElementById("shuffle-button");

// Array to store generated stories
let stories = [];
let currentValues = {};

// Listen for form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get input values
    const noun = document.getElementById("noun").value.trim();
    const adjective = document.getElementById("adjective").value.trim();
    const person = document.getElementById("person").value.trim();
    const verb = document.getElementById("verb").value.trim();
    const place = document.getElementById("place").value.trim();

    // Validate inputs
    if (!noun || !adjective || !person || !verb || !place) {
        alert("Please fill in all fields!");
        return;
    }

    // Store current values
    currentValues = { noun, adjective, person, verb, place };

    // Generate multiple story variations
    stories = generateStories(currentValues);

    // Display a random story
    const randomStory = stories[Math.floor(Math.random() * stories.length)];
    storySpan.textContent = randomStory;
});

// Listen for shuffle button click
shuffleBtn.addEventListener("click", () => {
    if (stories.length === 0) {
        alert("Please generate a story first!");
        return;
    }
    // Display a new random story
    const randomStory = stories[Math.floor(Math.random() * stories.length)];
    storySpan.textContent = randomStory;
});

// Function to create multiple story variations
function generateStories({ noun, adjective, person, verb, place }) {
    return [
        `${person} went to ${place} to ${verb} a ${adjective} ${noun}.`,
        `In ${place}, ${person} found a ${adjective} ${noun} and decided to ${verb} it.`,
        `Everyone at ${place} watched ${person} ${verb} a ${adjective} ${noun}.`,
        `${person} couldn't believe how ${adjective} the ${noun} was while trying to ${verb} at ${place}.`,
        `At ${place}, the ${adjective} ${noun} made ${person} ${verb} in excitement.`
    ];
}
