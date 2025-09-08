// Initial variables
let client = "John";

const groceries = {
    fruits : ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice : "20$",
    other : {
        paid : true,
        meansOfPayment : ["cash", "creditCard"]
    }
};

//  Arrow function to display the fruits
const displayGroceries = () => {
    console.log("Fruits in groceries:");
    groceries.fruits.forEach(fruit => console.log(fruit));
};

// Invoke displayGroceries
displayGroceries();

//  Arrow function to clone and test changes
const cloneGroceries = () => {
    // Copy client (primitive) by value
    let user = client;

    // Change client
    client = "Betty";

    console.log("\nAfter changing client:");
    console.log("user:", user);   // "John" -> primitive copied by value
    console.log("client:", client); // "Betty"

    // Copy groceries object by reference
    let shopping = groceries;

    // Change totalPrice
    shopping.totalPrice = "35$";
    console.log("\nAfter changing shopping.totalPrice:");
    console.log("groceries.totalPrice:", groceries.totalPrice); // 35$ -> reference copy

    // Change paid
    shopping.other.paid = false;
    console.log("\nAfter changing shopping.other.paid:");
    console.log("groceries.other.paid:", groceries.other.paid); // false -> reference copy
};

// Invoke cloneGroceries
cloneGroceries();
