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
const loginUser = asyncHandler(async (req, res) => {
  //HÄMTA DATA
  const { email, password } = req.body;
  // VALIDERA INPUT
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all the fields");
  }

  // CHECK MED DATABASEN
  const userAvailable = await User.findOne({ email });

  // JÄMFÖRA INPUT MED DATABASEN
  //Vi hashar input-lösenordet på nytt och jämför med lagrade hashed password
  if (
    userAvailable &&
    (await bcrypt.compare(password, userAvailable.password))
  ) {
    const accessToken = jwt.sign(
      {
        user: {
          name: userAvailable.name,
          email: userAvailable.email,
          id: userAvailable.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );
    res.status(200).json(accessToken); // VIKTIGT för att kunna använda vid framtida requests
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // OM KORREKT => LOG IN (JTW-token med user info)

  // RESPONSE token
});

// @desc Get a user
// @route GET /api/users/:id
// @access private
const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, getCurrentUser };
