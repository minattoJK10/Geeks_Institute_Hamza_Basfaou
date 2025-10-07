import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as notes from './notes.js';

// Customize yargs version
yargs(hideBin(process.argv)).version('1.0.0');

// ADD command
yargs(hideBin(process.argv))
  .command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
      title: { describe: 'Note title', demandOption: true, type: 'string' },
      body: { describe: 'Note body', demandOption: true, type: 'string' }
    },
    handler(argv) {
      notes.addNote(argv.title, argv.body);
    }
  })
  .command({
    command: 'list',
    describe: 'List all notes',
    handler() { notes.listNotes(); }
  })
  .command({
    command: 'read',
    describe: 'Read a note',
    builder: {
      title: { describe: 'Note title', demandOption: true, type: 'string' }
    },
    handler(argv) { notes.readNote(argv.title); }
  })
  .command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
      title: { describe: 'Note title', demandOption: true, type: 'string' }
    },
    handler(argv) { notes.removeNote(argv.title); }
  })
  .parse();
