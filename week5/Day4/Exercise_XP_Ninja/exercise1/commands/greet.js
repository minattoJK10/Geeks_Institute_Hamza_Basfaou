// commands/greet.js
import chalk from 'chalk';

export function greet() {
  console.log(chalk.green.bold('👋 Hello, Ninja! Welcome to your utility tool!'));
  console.log(chalk.blue('This is a colorful greeting powered by Chalk!'));
}
