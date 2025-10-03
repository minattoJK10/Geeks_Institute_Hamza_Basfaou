const express = require("express");
const app = express();
const postRoutes = require("./server/routes/postRoutes");

app.use(express.json()); // parse JSON body

// Handle JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  next(err);
});

app.use("/posts", postRoutes);

// Error handling for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
