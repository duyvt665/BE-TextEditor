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
  const existingUserName = await User.findOne({username})
  if (existingUser) {
    const error = new Error();
    error.code = "EMAIL_EXISTS";
    throw error;
  }
  if (existingUserName){
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

const updateUserInfoService = async (userId, updateData) => {
  try {
    // Kiểm tra xem người dùng có tồn tại không
    const user = await User.findById(userId);
    if (!user) {
      const customError = new Error('Invalid user ID');
      customError.code = 'INVALID_USERID';
      throw customError;
    }

    // Kiểm tra trùng lặp email
    if (updateData.email) {
      const existingEmailUser = await User.findOne({ email: updateData.email });
      if (existingEmailUser && existingEmailUser._id.toString() == userId.toString()) {
        const customError = new Error('Email already exists');
        customError.code = 'EMAIL_EXISTS';
        throw customError;
      }
    }

    // Kiểm tra trùng lặp username
    if (updateData.username) {
      const existingUsernameUser = await User.findOne({ username: updateData.username });
      if (existingUsernameUser && existingUsernameUser._id.toString() == userId.toString()) {
        const customError = new Error('Username already exists');
        customError.code = 'USERNAME_EXISTS';
        throw customError;
      }
    }

    // Cập nhật thông tin người dùng
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true
     
    });

    return {
      email: updatedUser.email,
      username: updatedUser.username,
      password: updatedUser.password,
      googleId: updatedUser.googleId,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  } catch (error) {
    console.error("Error in updateUserInfoService:", error);
    throw error;
  }
};
const getUserInfoService = async (userId) => {
  try {
    // Tìm kiếm người dùng theo userId
    const user = await User.findById(userId);
    
    if (!user) {
      const customError = new Error('Invalid user ID');
      customError.code = 'INVALID_USERID';
      throw customError;
    }

    // Trả về thông tin người dùng
    return {
      id: user._id,
      email: user.email,
      username: user.username,
      googleId: user.googleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  } catch (error) {
    console.error("Error in getUserInfoService:", error);
    throw error;
  }
};
module.exports = {
  signUpService,
  signInService,
  getUserInfoService,
  updateUserInfoService
  
};
