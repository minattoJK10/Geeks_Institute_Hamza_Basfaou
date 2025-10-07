const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use(express.static("public"));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));