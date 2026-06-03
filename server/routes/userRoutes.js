const express = require("express");
const tokenHandler = require("../middleware/validateTokenHandler");
const adminValidator = require("../middleware/adminValidator");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  getUsers,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", tokenHandler, getCurrentUser);
router.get("/", tokenHandler, adminValidator, getUsers);

module.exports = router;
