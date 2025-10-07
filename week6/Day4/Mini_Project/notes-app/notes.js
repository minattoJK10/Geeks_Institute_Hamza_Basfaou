import fs from 'fs';

export const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    return JSON.parse(dataBuffer.toString());
  } catch (e) {
    return [];
  }
};

export const saveNotes = (notes) => fs.writeFileSync('notes.json', JSON.stringify(notes));

export const addNote = (title, body) => {
  const notes = loadNotes();
  if (!notes.find(n => n.title === title)) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log('New note added!');
  } else console.log('Note already exists');
};

export const listNotes = () => {
  const notes = loadNotes();
  console.log('Your notes:');
  notes.forEach(n => console.log(`- ${n.title}`));
};

export const readNote = (title) => {
  const note = loadNotes().find(n => n.title === title);
  if (note) console.log(`Title: ${note.title}\nBody: ${note.body}`);
  else console.log('Note not found');
};

export const removeNote = (title) => {
  const notes = loadNotes();
  const filtered = notes.filter(n => n.title !== title);
  if (filtered.length < notes.length) {
    saveNotes(filtered);
    console.log('Note removed!');
  } else console.log('Note not found');
};
