const asyncHandler = require("express-async-handler");
const {
  registerUserService,
  loginUserService,
} = require("../services/userService");

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const user = await registerUserService({ name, email, password });
  res.status(201).json(user);
});

// @desc Login a user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Please fill in all the fields");
  }

  const accessToken = await loginUserService({ username, password });
  res.status(200).json(accessToken);
});

// @desc Get current user
// @route GET /api/users/current
// @access private
const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(req.user);
});

// @desc Get all users
// @route GET /api/users
// @access private/admin
const getUsers = asyncHandler(async (req, res) => {
  const User = require("../models/userModel");
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

module.exports = { registerUser, loginUser, getCurrentUser, getUsers };
