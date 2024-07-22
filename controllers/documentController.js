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
    const { userId } = req.params;
  
    try {
      const documents = await documentService.getDocumentsByUserIdService(userId);
      res.status(200).json(documents);
    } catch (error) {
      console.error("Error in getDocumentsController:", error);
      res.status(500).json({ message: error.message });
    }
  };
  const deleteDocumentController = async (req, res) => {
    const { userId, documentId } = req.params;
  
    try {
      const result = await  documentService.deleteDocumentByUDIDService(userId, documentId);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error in deleteDocumentController:", error);
      res.status(500).json({ message: error.message });
    }
  };
  


module.exports = {
    addDocumentController,
    getDocumentsController,
    deleteDocumentController
    
}

