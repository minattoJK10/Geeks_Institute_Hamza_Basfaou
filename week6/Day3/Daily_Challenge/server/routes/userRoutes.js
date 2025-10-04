const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getAllUsers,
  getUser,
  updateUser
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);

module.exports = router;
