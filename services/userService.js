const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Update User Info
const updateUserInfoService = async (userId, email, username) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      const customError = new Error("Invalid user ID");
      customError.code = "INVALID_USERID";
      throw customError;
    }
    if (!email || !username) {
      const customError = new Error();
      customError.code = "INVALID_INPUT";
      throw customError;
    }
    if (email) {
      const existingEmailUser = await User.findOne({ email });
      console.log(existingEmailUser);
      if (
        existingEmailUser &&
        existingEmailUser._id.toString() !== userId.toString()
      ) {
        const customError = new Error("Email already exists");
        customError.code = "EMAIL_EXISTS";
        throw customError;
      }
    }

    if (username) {
      const existingUsernameUser = await User.findOne({ username });
      if (
        existingUsernameUser &&
        existingUsernameUser._id.toString() !== userId.toString()
      ) {
        const customError = new Error("Username already exists");
        customError.code = "USERNAME_EXISTS";
        throw customError;
      }
    }

    if (email) user.email = email;
    if (username) user.username = username;

    await user.save();
  } catch (error) {
    console.error("Error in updateUserInfoService:", error);
    throw error;
  }
};

//Get User Info
const getUserInfoService = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      const customError = new Error("Invalid user ID");
      customError.code = "INVALID_USERID";
      throw customError;
    }

    return user;
  } catch (error) {
    console.error("Error in getUserInfoService:", error);
    throw error;
  }
};
module.exports = {
  getUserInfoService,
  updateUserInfoService,
};
