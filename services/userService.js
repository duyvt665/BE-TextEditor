const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Update User Info
const updateUserInfoService = async (userId, email, username) => {
    try {

        const user = await User.findById(userId);
        if (!user) {
            const customError = new Error('Invalid user ID');
            customError.code = 'INVALID_USERID';
            throw customError;
        }
        if (email) {
            const existingEmailUser = await User.findOne({ email });
            if (existingEmailUser && existingEmailUser._id.toString() == userId.toString()) {
                const customError = new Error('Email already exists');
                customError.code = 'EMAIL_EXISTS';
                throw customError;
            }
        }

        if (username) {
            const existingUsernameUser = await User.findOne({ username });
            if (existingUsernameUser && existingUsernameUser._id.toString() == userId.toString()) {
                const customError = new Error('Username already exists');
                customError.code = 'USERNAME_EXISTS';
                throw customError;
            }
        }

        if (email) user.email = email;
        if (username) user.username = username;

        const updatedUser = await user.save();

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

//Get User Info
const getUserInfoService = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            const customError = new Error('Invalid user ID');
            customError.code = 'INVALID_USERID';
            throw customError;
        }

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
    getUserInfoService,
    updateUserInfoService

};
