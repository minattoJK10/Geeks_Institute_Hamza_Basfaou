const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const SECRET_KEY = "mysecretkey"; // in real apps, put in .env

app.use(express.json());

// Fake in-memory database
let users = [];

// Track login attempts for lockout
let loginAttempts = {}; // { username: { attempts: 0, lockedUntil: Date } }

// ------------------ HELPERS ------------------

// Password validation: min 6 chars, at least 1 number
function validatePassword(password) {
  const regex = /^(?=.*[0-9]).{6,}$/;
  return regex.test(password);
}

// Middleware for role-based authorization
function authorizeRole(role) {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Token required" });

    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });

      if (user.role !== role) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = user;
      next();
    });
  };
}

// ------------------ ROUTES ------------------

// REGISTER USER
app.post("/api/register", async (req, res) => {
  try {
    const { username, password, role = "user" } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    // Validate password strength
    if (!validatePassword(password)) {
      return res
        .status(400)
        .json({
          message: "Password must be at least 6 characters and contain a number",
        });
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user
    const newUser = { username, password: hashedPassword, role };
    users.push(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// LOGIN USER
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check lockout
    const attemptInfo = loginAttempts[username];
    if (attemptInfo && attemptInfo.lockedUntil > Date.now()) {
      return res.status(403).json({
        message: `Account locked. Try again after ${new Date(
          attemptInfo.lockedUntil
        ).toLocaleTimeString()}`,
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Track failed attempts
      if (!loginAttempts[username]) {
        loginAttempts[username] = { attempts: 1, lockedUntil: null };
      } else {
        loginAttempts[username].attempts++;
        if (loginAttempts[username].attempts >= 3) {
          loginAttempts[username].lockedUntil = Date.now() + 1 * 60 * 1000; // 1 min lock
          loginAttempts[username].attempts = 0;
          return res
            .status(403)
            .json({ message: "Account locked for 1 minute" });
        }
      }
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Reset attempts on success
    if (loginAttempts[username]) {
      loginAttempts[username].attempts = 0;
      loginAttempts[username].lockedUntil = null;
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: user.username, role: user.role },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// PROFILE (Protected Route)
app.get("/api/profile", (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Token required" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });

      res.json({ message: "Profile data", user });
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// ADMIN-ONLY ROUTE
app.get("/api/admin", authorizeRole("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!", user: req.user });
});

// ------------------ Start Server ------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
