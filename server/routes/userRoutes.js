const express = require("express");
const tokenHandler = require("../middleware/validateTokenHandler");
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/userController");
const router = express.Router();

//Localhost:3000/register?

// POST REGISTER
router.post("/register", registerUser);

//POST LOGIN
router.post("/login", loginUser);

// GET CurrentUser
router.get("/current", tokenHandler, getCurrentUser);

module.exports = router;
