const Document = require('../models/document');
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const createDocumentService = async (title,content) => {
    try {
        const document = new Document(title,content);
        console.log(document);
        return await document.save();
    } catch (error) {
        console.error("Error in createDocumentService:", error);
        const customError = new Error();
        customError.code = "DOCUMENT_CREATION_FAILED";
        throw customError;
    };
};
module.exports = {
    createDocumentService
}
