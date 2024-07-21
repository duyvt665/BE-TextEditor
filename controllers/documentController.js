// controllers/documentController.js
const {createDocumentService} = require('../services/documentService');
const {sendErrorResponse, sendSuccessResponse} = require("../utils/apiRespondUtil");



const addDocumentController = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user._id;
        const newDocument = await createDocumentService({ title, content, userIds: [userId] });
        return sendSuccessResponse(res, { message: "Document created successfully" });
    } catch (error) {
      console.log(error);
      const errorCode = error.code || "INTERNAL_SERVER_ERROR";
      return sendErrorResponse(res, errorCode);
    }
};



module.exports = {
    addDocumentController,
   
}

