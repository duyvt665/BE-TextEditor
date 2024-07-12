const { StatusCodes } = require('http-status-codes');

const errors = {
    RESOURCE_NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        code: "RESOURCE_NOT_FOUND",
        message: "The requested resource was not found."
    },
    EMAIL_NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        code: "EMAIL_NOT_FOUND",
        message: "Email not found!"
    },
    EMAIL_EXISTS: {
        status: StatusCodes.CONFLICT,
        code: "EMAIL_EXISTS",
        message: "Email already exists!"
    },
    USERNAME_EXISTS: {
        status: StatusCodes.CONFLICT,
        code: "USERNAME_EXISTS",
        message: "Username already exists!"
    },
    INCORRECT_PASSWORD: {
        status: StatusCodes.UNAUTHORIZED,
        code: "INCORRECT_PASSWORD",
        message: "Current password is incorrect."
    },
    PASSWORD_MISMATCH: {
        status: StatusCodes.BAD_REQUEST,
        code: "PASSWORD_MISMATCH",
        message: "New password and confirm password do not match."
    },
    INTERNAL_SERVER_ERROR: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal Server Error"
    },
    USER_NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        code: " USER_NOT_FOUND",
        message: "User not found!"
    },
    
};

module.exports = errors;