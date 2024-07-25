const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// const updateUserInfoService = async (userId, email, username) => {
//     try {
//       // Kiểm tra xem người dùng có tồn tại không
//       const user = await User.findById(userId);
//       if (!user) {
//         const customError = new Error('Invalid user ID');
//         customError.code = 'INVALID_USERID';
//         throw customError;
//       }

//       // Kiểm tra trùng lặp email
//       if (updateData.email) {
//         const existingEmailUser = await User.findOne({ email: updateData.email });
//         if (existingEmailUser && existingEmailUser._id.toString() == userId.toString()) {
//           const customError = new Error('Email already exists');
//           customError.code = 'EMAIL_EXISTS';
//           throw customError;
//         }
//       }

//       // Kiểm tra trùng lặp username
//       if (updateData.username) {
//         const existingUsernameUser = await User.findOne({ username: updateData.username });
//         if (existingUsernameUser && existingUsernameUser._id.toString() == userId.toString()) {
//           const customError = new Error('Username already exists');
//           customError.code = 'USERNAME_EXISTS';
//           throw customError;
//         }
//       }

//       // Cập nhật thông tin người dùng
//       const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
//         new: true

//       });

//       return {
//         email: updatedUser.email,
//         username: updatedUser.username,
//         password: updatedUser.password,
//         googleId: updatedUser.googleId,
//         createdAt: updatedUser.createdAt,
//         updatedAt: updatedUser.updatedAt,
//       };
//     } catch (error) {
//       console.error("Error in updateUserInfoService:", error);
//       throw error;
//     }
//   };
const updateUserInfoService = async (userId, email, username) => {
    try {
        // Kiểm tra xem người dùng có tồn tại không
        const user = await User.findById(userId);
        if (!user) {
            const customError = new Error('Invalid user ID');
            customError.code = 'INVALID_USERID';
            throw customError;
        }

        // Kiểm tra trùng lặp email
        if (email) {
            const existingEmailUser = await User.findOne({ email });
            if (existingEmailUser && existingEmailUser._id.toString() == userId.toString()) {
                const customError = new Error('Email already exists');
                customError.code = 'EMAIL_EXISTS';
                throw customError;
            }
        }

        // Kiểm tra trùng lặp username
        if (username) {
            const existingUsernameUser = await User.findOne({ username });
            if (existingUsernameUser && existingUsernameUser._id.toString() == userId.toString()) {
                const customError = new Error('Username already exists');
                customError.code = 'USERNAME_EXISTS';
                throw customError;
            }
        }

        // Cập nhật thông tin người dùng
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
    getUserInfoService,
    updateUserInfoService

};
