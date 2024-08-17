require("dotenv").config();
const authService = require("../services/authService");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/apiRespondUtil");

// SIGN UP
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

// SIGN IN
const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const { token, user } = await authService.signInService({
      username,
      password,
    });
    return sendSuccessResponse(res, {
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
};

// FORGOT PASSWORD
const userForgotPassword = async (req, res) => {
  const {email} = req.body;
  try{
    await authService.forgotPasswordService(email);
    return sendSuccessResponse(res, {message: "Forgot Password Email Sent Successfully!"});
  } catch(error){
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
}

module.exports = {
  signUp,
  signIn,
  userForgotPassword,
};
