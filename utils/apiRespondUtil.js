const errors = require('./errorMessages');

const sendErrorResponse = (res, code) => {
    const error = errors[code] || errors.INTERNAL_SERVER_ERROR;
    
    return res.status(error.status).json({
        status: "error",
        statusCode: error.status,
        error: {
            code: error.code,
            message: error.message,
        }
    });
};

const sendSuccessResponse = (res, data) =>{
    return res.status(200).json({
        status: "success",
        statusCode: 200,
        ...data
    })
}

module.exports = {sendErrorResponse, sendSuccessResponse};
