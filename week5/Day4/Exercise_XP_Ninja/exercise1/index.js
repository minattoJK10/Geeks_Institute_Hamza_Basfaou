// index.js
import { Command } from 'commander';
import { greet } from './commands/greet.js';
import { fetchData } from './commands/fetch.js';
import { readFile } from './commands/read.js';

const program = new Command();

program
  .name('ninja-utility')
  .description('A versatile command-line tool with multiple utilities')
  .version('1.0.0');

// Greet Command
program
  .command('greet')
  .description('Display a colorful greeting message')
  .action(() => {
    greet();
  });

// Fetch Command
program
  .command('fetch')
  .description('Fetch data from a public API')
  .action(() => {
    fetchData();
  });

// Read Command
program
  .command('read <filePath>')
  .description('Read and display the contents of a file')
  .action((filePath) => {
    readFile(filePath);
  });

program.parse(process.argv);
