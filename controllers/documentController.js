const documentService = require("../services/documentService");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/apiRespondUtil");

// ADD DOCUMENT
const addDocumentController = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user._id;
  try {
    const newDocument = await documentService.createDocumentService(
      title,
      content,
      userId
    );
    return sendSuccessResponse(res, newDocument);
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
};

// GET ALL DOCUMENTS BY USER
const getDocumentsController = async (req, res) => {
  const userId = req.user._id;
  try {
    const documents = await documentService.getDocumentsByUserIdService(userId);
    return sendSuccessResponse(res, documents);
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
};

// GET INFOR DOCUMENT BY ID DOCUMENT
const getInforDocumentById = async (req, res) => {
  const { documentId } = req.params;
  const userId = req.user._id;
  try {
    const document = await documentService.getDocumentByIdService(
      documentId,
      userId
    );
    return sendSuccessResponse(res, { document });
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
};

// DELETE DOCUMENT
const deleteDocumentController = async (req, res) => {
  const { documentId } = req.params;
  const userId = req.user._id;
  try {
    const result = await documentService.deleteDocumentByTitleService(
      documentId,
      userId
    );
    return sendSuccessResponse(res, result);
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
};

// UPDATE TITLE DOCUMENT
const updateDocumentTitleController = async (req, res) => {
  const { documentId, newTitle } = req.body;
  const userId = req.user._id;
  try {
    const result = await documentService.updateDocumentTitleService(
      userId,
      documentId,
      newTitle
    );
    return sendSuccessResponse(res, result);
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
};

// EDIT DOCUMENT
const updateDocument = async (req, res) => {
  const userId = req.user._id;
  const { documentId, newTitle, newContent } = req.body;
  try {
    await documentService.updateDocumentService(
      userId,
      documentId,
      newTitle,
      newContent
    );
    return sendSuccessResponse(res, {
      message: "Updated document successfully",
    });
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
};

// SHARE DOCUMENT
const shareDocument = async (req, res) => {
  const { email, documentId, permission } = req.body;
  const userId = req.user._id;
  try {
    const updatedDocument = await documentService.shareDocumentService(
      email,
      documentId,
      permission,
      userId
    );
    return sendSuccessResponse(res, updatedDocument);
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
};
 
// GET All USER OWN DOCUMENT
const getUserOwnDocument = async (req, res) => {
  const {documentId} = req.body
  try {
    const userOwnDocument = await documentService.getUserOwnDocumentService(documentId);
    return sendSuccessResponse(res, userOwnDocument);
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
}

const updatePermission = async (req, res) =>{
  const {documentId, email, permission } = req.body
  try {
    const updatedDocument = await documentService.updatePermissionService(documentId, email, permission);
    return sendSuccessResponse(res, updatedDocument);
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }    
}



module.exports = {
  addDocumentController,
  getDocumentsController,
  deleteDocumentController,
  updateDocumentTitleController,
  getInforDocumentById,
  updateDocument,
  shareDocument,
  getUserOwnDocument,
  updatePermission
};
