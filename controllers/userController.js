const userService = require("../services/userService");

const { sendErrorResponse, sendSuccessResponse } = require("../utils/apiRespondUtil");

// Get Info User
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

//Update Info User
const updateUserInfoController = async (req, res) => {
    const userId = req.user._id;
    const { email, username } = req.body;



    try {
        const updatedUserInfo = await authService.updateUserInfoService(userId, email, username);
        return sendSuccessResponse(res, updatedUserInfo);
    } catch (error) {
        console.log(error);
        const errorCode = error.code || "INTERNAL_SERVER_ERROR";
        return sendErrorResponse(res, errorCode);
    }
};

module.exports = {
    getUserInfoController,
    updateUserInfoController



};
