// controllers/documentController.js
const documentService = require('../services/documentService');
// const {createDocumentService} = require('../services/documentService');

const {sendErrorResponse, sendSuccessResponse} = require("../utils/apiRespondUtil");



const addDocumentController = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user._id;
       
        const newDocument = await documentService.createDocumentService(title, content, userId);
        return sendSuccessResponse(res, newDocument);
    } catch (error) {
      console.log(error);
      const errorCode = error.code || "INTERNAL_SERVER_ERROR";
      return sendErrorResponse(res, errorCode);
    }
};
const getDocumentsController = async (req, res) => {
    const userId  = req.user._id;
    
    try {
      const documents = await documentService.getDocumentsByUserIdService(userId);
      return sendSuccessResponse(res, documents);
    } catch (error) {
      console.log(error);
      const errorCode = error.code || "INTERNAL_SERVER_ERROR";
      return sendErrorResponse(res, errorCode);
    }
  };
  const deleteDocumentController = async (req, res) => {
    const { title } = req.params;
  
    try {
      const result = await documentService.deleteDocumentByTitleService(title);
      return sendSuccessResponse(res, result);
    } catch (error) {
      console.log(error);
      const errorCode = error.code || "INTERNAL_SERVER_ERROR";
      return sendErrorResponse(res, errorCode);
    }
  };
  
  const updateDocumentTitleController = async (req, res) => {
    const { documentId, newTitle } = req.body;
    const userId  = req.user._id;
    


    try {
      const result = await documentService.updateDocumentTitleService(userId, documentId, newTitle);
      return sendSuccessResponse(res, result);
    } catch (error) {
      console.log(error);
      const errorCode = error.code || "INTERNAL_SERVER_ERROR";
      return sendErrorResponse(res, errorCode);
    }
  };
  
  
module.exports = {
    addDocumentController,
    getDocumentsController,
    deleteDocumentController,
    updateDocumentTitleController
   
    
}

