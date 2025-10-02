// app.js
const express = require("express");
const app = express();

// Import the router
const indexRouter = require("./routes/index");

// Mount the router
app.use("/", indexRouter);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
