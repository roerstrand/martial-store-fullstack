const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser } = require("../repositories/userRepository");

const registerUserService = async ({ name, email, password }) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({ name, email, password: hashedPassword });
  return { _id: user.id, name: user.name, email: user.email };
};

const loginUserService = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const accessToken = jwt.sign(
    { user: { name: user.name, email: user.email, id: user.id } },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "24h" },
  );

  return accessToken;
};

module.exports = { registerUserService, loginUserService };
