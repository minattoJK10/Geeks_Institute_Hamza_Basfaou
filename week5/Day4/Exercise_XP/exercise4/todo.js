// todo.js
export class TodoList {
  constructor() {
    this.tasks = [];
  }

  // Add a new task
  addTask(taskName) {
    const task = {
      id: this.tasks.length + 1,
      name: taskName,
      completed: false
    };
    this.tasks.push(task);
    console.log(`✅ Task added: "${taskName}"`);
  }

  // Mark a task as complete by ID
  markComplete(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = true;
      console.log(`🎉 Task completed: "${task.name}"`);
    } else {
      console.log(`⚠️ Task with ID ${taskId} not found.`);
    }
  }

  // List all tasks
  listTasks() {
    console.log("\n📋 Todo List:");
    if (this.tasks.length === 0) {
      console.log("No tasks available.");
    } else {
      this.tasks.forEach(task => {
        const status = task.completed ? "✔️ Completed" : "⏳ Pending";
        console.log(`ID: ${task.id} | ${task.name} | Status: ${status}`);
      });
    }
    console.log();
  }
}
