// Define an object called "person"
const person = {
    name: 'John Doe', // Key "name" with value "John Doe"
    age: 25,          // Key "age" with value 25
    location: {       // Nested object "location"
        country: 'Canada',        // Key "country" with value "Canada"
        city: 'Vancouver',        // Key "city" with value "Vancouver"
        coordinates: [49.2827, -123.1207] // Array containing latitude and longitude
    }
}

// ----------- OBJECT DESTRUCTURING --------------
// Here, we extract data from the "person" object in one single line

const {
    name, // Extract the "name" directly from the main object
    location: { // Go inside the "location" object
        country, // Extract "country"
        city,    // Extract "city"
        coordinates: [lat, lng] // Destructure the "coordinates" array into two variables: lat & lng
    }
} = person;

// ----------- DISPLAY THE RESULT --------------
// Using a template literal to dynamically display the extracted values
console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);
