// shop.js
import chalk from 'chalk';          // ✅ ESM import for chalk
import products from './products.js'; // ✅ ESM import for local file

// Function to search for a product by name
function findProductByName(productName) {
  const product = products.find(
    (item) => item.name.toLowerCase() === productName.toLowerCase()
  );

  if (product) {
    console.log(chalk.green.bold("Product found:"));
    console.log(chalk.blue(`Name: ${product.name}`));
    console.log(chalk.yellow(`Price: $${product.price}`));
    console.log(chalk.magenta(`Category: ${product.category}`));
  } else {
    console.log(chalk.red.bold(`❌ Product "${productName}" not found.`));
  }
}

// Test the function
findProductByName("Laptop");
findProductByName("Shoes");
findProductByName("Tablet");
