// Import dependencies
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// GET route
app.get("/api/hello", (req, res) => {
  res.send("Hello From Express");
});

// POST route
app.post("/api/world", (req, res) => {
  console.log("Received data from client:", req.body);
  res.send(`I received your POST request. This is what you sent me: ${req.body.message}`);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
