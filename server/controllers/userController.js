const asyncHandler = require("express-async-handler"); // slippa skriva try/catch
const User = require("../models/userModel"); // databashantering (kommunicering)
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  // HÄMTAR DATA FRÅN BODY
  const { name, email, password } = req.body;
  //   VALIDERA INPUT
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  // KONTROLLERA OM EMAIL REDAN FINNS
  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("Email already exists");
  }
  // HASCHA LÖSENORDET
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password", hashedPassword);
  // SKAPA USER
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  // SPARA I MONGODB
  console.log(`User ceated: ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, name: user.name, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  // RESPONSE (nya usern)
  res.status(201).json(user);
});

// @desc Login a user
// @route POST /api/users/login
// @access public
const loginUser = (req, res) => {
  return res.status(200).json({ message: "Du är nu inloggad" });
};

const getCurrentUser = (req, res) => {
  return res.status(200).json({ message: "Current user" });
};

module.exports = { registerUser, loginUser, getCurrentUser };
