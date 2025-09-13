// Given object
const users = { 
    user1: 18273, 
    user2: 92833, 
    user3: 90315 
};

// -------- PART 1: Convert object into an array --------
// Object.entries() converts an object into an array of [key, value] pairs
const usersArray = Object.entries(users);

console.log("Part 1 Output:", usersArray);
// Expected output: [ ['user1', 18273], ['user2', 92833], ['user3', 90315] ]


// -------- PART 2: Multiply the IDs by 2 --------
// Use .map() to create a new array with modified values
const updatedUsersArray = usersArray.map(([key, value]) => [key, value * 2]);

console.log("Part 2 Output:", updatedUsersArray);
// Expected output: [ ['user1', 36546], ['user2', 185666], ['user3', 180630] ]
