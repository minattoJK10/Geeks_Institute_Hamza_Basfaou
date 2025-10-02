// app.js
const express = require("express");
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Import the todos router
const todosRouter = require("./routes/todos");

// Mount the router at /todos
app.use("/todos", todosRouter);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
