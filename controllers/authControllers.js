require("dotenv").config();
const authService = require("../services/authService");
const {sendErrorResponse, sendSuccessResponse} = require("../utils/apiRespondUtil");


//SIGN UP
const signUp = async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;
  try {
    await authService.signUpService({
      email,
      username,
      password,
      confirmPassword,
    });
    return sendSuccessResponse(res, { message: "User created successfully" });
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
};

//SIGN IN
const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const { token, user } = await authService.signInService({
      username,
      password,
    });
    return sendSuccessResponse(res, { message: "Login successful", token, user });
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
};
const getUserInfoController = async (req, res) => {
  const userId = req.user._id;

  try {
    const userInfo = await authService.getUserInfoService(userId);
    return sendSuccessResponse(res, userInfo);
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
};
const updateUserInfoController = async (req, res) => {
  const userId = req.user._id;
  const { email, username, password } = req.body;

  const updateData = {};
  if (email) updateData.email = email;
  if (username) updateData.username = username;
  if (password) updateData.password = password;

  try {
    const updatedUserInfo = await authService.updateUserInfoService(userId, updateData);
    return sendSuccessResponse(res, updatedUserInfo);
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
};


module.exports = {
  signUp,
  signIn,
  getUserInfoController,
  updateUserInfoController


};
