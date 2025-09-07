// 1. Retrieve the form and console.log it
const form = document.querySelector('form');
console.log('Form element:', form);

// 2. Retrieve the inputs by their ID and console.log them
const fnameInput = document.getElementById('fname');
const lnameInput = document.getElementById('lname');
console.log('First name input by ID:', fnameInput);
console.log('Last name input by ID:', lnameInput);

// 3. Retrieve the inputs by their name attribute and console.log them
const fnameByName = document.getElementsByName('firstname')[0];
const lnameByName = document.getElementsByName('lastname')[0];
console.log('First name input by Name:', fnameByName);
console.log('Last name input by Name:', lnameByName);

// 4. Handle form submission
form.addEventListener('submit', function(event) {
    // Prevent the default form action (page reload)
    event.preventDefault();
    /**
     * Why we use preventDefault():
     * By default, when a form is submitted, the browser refreshes or
     * navigates away to send data. We use preventDefault() to stop this behavior
     * and instead handle the form data with JavaScript.
     */

    // Get the values of the inputs and trim any extra spaces
    const firstName = fnameInput.value.trim();
    const lastName = lnameInput.value.trim();

    // Check if the inputs are empty
    if (firstName === '' || lastName === '') {
        alert('Please fill in both fields before submitting.');
        return;
    }

    // Select the <ul> element
    const ul = document.querySelector('.usersAnswer');

    // Clear the previous results (optional, for clean output)
    ul.innerHTML = '';

    // Create an <li> for each input value
    const li1 = document.createElement('li');
    li1.textContent = firstName;

    const li2 = document.createElement('li');
    li2.textContent = lastName;

    // Append the new <li> elements to the <ul>
    ul.appendChild(li1);
    ul.appendChild(li2);

        // Clear input fields after submission
    fnameInput.value = '';
    lnameInput.value = '';

    // Focus back on the first input for convenience
    fnameInput.focus();
});
