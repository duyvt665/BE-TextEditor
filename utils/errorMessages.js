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
    DOCUMENT_NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        code: "DOCUMENT_NOT_FOUND",
        message: "The requested resource was not found."
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
    TITLE_ALREADY_EXISTS: {
        status: StatusCodes.CONFLICT,
        code: "TITLE_ALREADY_EXISTS",
        message: "Title document already exists!"
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
    INVALID_USERID: {
        status: StatusCodes.BAD_REQUEST,
        code: "INVALID_USERID",
        message: "Invalid user ID provided. Please check and try again."
    },
    DOCUMENT_CREATION_FAILED: {
        status: StatusCodes.BAD_REQUEST,
        code: "DOCUMENT_CREATION_FAILED",
        message: "Document creation failed. Please try again later or contact support if the issue persists."
    }, UPDATE_TITLE_FAILED: {
        status: StatusCodes.BAD_REQUEST,
        code: "UPDATE_TITLE_FAILED",
        message: "Update title document failed. Please try again later or contact support if the issue persists."
    },
    INTERNAL_SERVER_ERROR: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal Server Error"
    },

};

module.exports = errors;