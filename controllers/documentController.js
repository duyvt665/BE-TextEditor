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
  const getUserInfoController = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const userInfo = await documentService.getUserInfoService(userId);
      return sendSuccessResponse(res, userInfo);
    } catch (error) {
      console.log(error);
      const errorCode = error.code || "INTERNAL_SERVER_ERROR";
      return sendErrorResponse(res, errorCode);
    }
  };
  const updateUserInfoController = async (req, res) => {
    const userId = req.user._id;
    const { email, username, password } = req.body;
  
    const updateData = {};
    if (email) updateData.email = email;
    if (username) updateData.username = username;
    if (password) updateData.password = password;
  
    try {
      const updatedUserInfo = await documentService.updateUserInfoService(userId, updateData);
      return sendSuccessResponse(res, updatedUserInfo);
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
    updateDocumentTitleController,
    getUserInfoController,
    updateUserInfoController
    
}

