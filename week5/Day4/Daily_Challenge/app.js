// app.js
import { greet } from './greeting.js';

import{displayColorfulMessage} from './colorful-message.js';

import { readFileContent } from './read-file.js';

const message = greet('Hamza');
console.log(message);

displayColorfulMessage();

readFileContent();
