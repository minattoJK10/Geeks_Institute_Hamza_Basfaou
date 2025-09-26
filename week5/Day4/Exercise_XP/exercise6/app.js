// app.js
import chalk from 'chalk';

console.log(chalk.green('Hello World! This is a green message.'));
console.log(chalk.blue.bold('This is a bold blue message!'));
console.log(chalk.red.underline('This is an underlined red warning!'));
console.log(chalk.yellow.bgBlack('Yellow text with black background!'));

// Combine styles
console.log(chalk.magenta.bold.italic('Chalk makes terminal output beautiful 🎨'));
