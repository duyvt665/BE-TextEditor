const userService = require("../services/userService");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/apiRespondUtil");

// GET INFOR USER
const getUserInfoController = async (req, res) => {
  const userId = req.user._id;
  try {
    const userInfo = await userService.getUserInfoService(userId);
    return sendSuccessResponse(res, { userInfo });
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
};

//UPDATE INFOR USER
const updateUserInfoController = async (req, res) => {
  const userId = req.user._id;
  const { email, username } = req.body;
  try {
    await userService.updateUserInfoService(userId, email, username);
    return sendSuccessResponse(res, { message: "Update Success!" });
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
};

//CHANGE PASSWORD
const changePassword = async (req, res) => {
    const { password, newPassword } = req.body;
    const currentUserID = req.user._id;
  try {
    await userService.changePasswordService(
      currentUserID,
      password,
      newPassword
    );
    return sendSuccessResponse(res, {
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
};



module.exports = {
  getUserInfoController,
  updateUserInfoController,
  changePassword,
};
