// app.js
import { TodoList } from './todo.js';

// Create instance of TodoList
const myTodoList = new TodoList();

// Add tasks
myTodoList.addTask("Learn Node.js modules");
myTodoList.addTask("Practice ES6 syntax");
myTodoList.addTask("Build a small project");

// List tasks after adding
myTodoList.listTasks();

// Mark a task as complete
myTodoList.markComplete(2);

// List tasks after marking one complete
myTodoList.listTasks();
