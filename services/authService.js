const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const asyncHandler = require('express-async-handler');
require("dotenv").config();

const SALT_ROUNDS = 10;

// SIGN UP SERVICE
const signUpService = async ({
  email,
  username,
  password,
  confirmPassword,
}) => {
  const existingUser = await User.findOne({ email });
  const existingUserName = await User.findOne({ username });
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

// SIGN IN SERVICE
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

// FORGOT PASSWORD SERVICE
const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error();
    error.code = "EMAIL_NOT_FOUND";
    throw error;
  }

  const now = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  if (
    user.resetPassword.lastRequest &&
    now - user.resetPassword.lastRequest < oneDay
  ) {
    if (user.resetPassword.count >= 5) {
      const error = new Error();
      error.code = "FORGOT_PASSWORD_LIMIT_EXCEEDED";
      throw error;
    }
  } else {
    user.resetPassword.count = 0;
  }

  user.resetPassword.count += 1;
  user.resetPassword.lastRequest = now;

  const generateRandomPassword = () => {
    return crypto.randomBytes(5).toString("hex");
  };

  const newPassword = generateRandomPassword();

  const sendResetEmail = asyncHandler(async (email, newPassword) => {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      secure: true,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "text-editor@gmail.com",
      to: email,
      subject: "Request a password reset from Text-Editor",
      text: `Your new password is: ${newPassword}`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
    }
  });

  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

  user.password = hashedPassword;
  await user.save();

  await sendResetEmail(email, newPassword);
};

module.exports = {
  signUpService,
  signInService,
  forgotPasswordService,
};
