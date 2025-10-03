const express = require("express");
const app = express();
const bookRoutes = require("./server/routes/bookRoutes");

app.use(express.json());
app.use("/api/books", bookRoutes);

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));