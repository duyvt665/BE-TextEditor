const documentService = require("../services/documentService");

const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/apiRespondUtil");

//Add Document
const addDocumentController = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user._id;

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

//Get All Document By User
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

//Get Infor Document By Id
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

//Delete Document
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

// Update Title Document
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

// Update Title and Content Document
const updateDocument = async (req, res) => {
  try {
    const userId = req.user._id;
    const { documentId, newTitle, newContent } = req.body;
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

const shareDocument = async (req, res) => {
  const {email, documentId} = req.body;
  const userId = req.user._id;
  try {
    const updatedDocument = await documentService.shareDocumentService(email, documentId,userId)
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
  shareDocument
};
