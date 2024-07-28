const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

//SIGN UP SERVICE
const signUpService = async ({
  email,
  username,
  password,
  confirmPassword,
}) => {
  const existingUser = await User.findOne({ email });
  const existingUserName = await User.findOne({ username })
  if (existingUser) {
    const error = new Error();
    error.code = "EMAIL_EXISTS";
    throw error;
  }
  if (existingUserName) {
    const error = new Error();
    error.code = "USERNAME_EXISTS";
    throw error;
  }
  if (password !== confirmPassword) {
    const error = new Error();
    error.code = "PASSWORD_MISMATCH";
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    username,
    password: hashedPassword,
  });

  return newUser;
};

//SIGN IN SERVICE
const signInService = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) {
    const error = new Error();
    error.code = "EMAIL_NOT_FOUND";
    throw error;
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    const error = new Error();
    error.code = "INCORRECT_PASSWORD";
    throw error;
  }

  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "168h",
    }
  );

  return { token, user };
};


module.exports = {
  signUpService,
  signInService


};
