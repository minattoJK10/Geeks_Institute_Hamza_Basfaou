const express = require("express");
const app = express();
const userRoutes = require("./server/routes/userRoutes");
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);

// Error handling
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
