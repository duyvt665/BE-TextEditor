// controllers/documentController.js
const {createDocumentService, getAllDocumentsService,signInService} = require('../services/documentService');
const {sendErrorResponse, sendSuccessResponse} = require("../utils/apiRespondUtil");

const getAllDocumentsController = async (req, res) => {
    try {
       const documents= await getAllDocumentsService();
       return sendSuccessResponse(res, {message: "Documents fetched successfully", documents})
    }
    catch (error) {
      console.log(error);
      const errorCode = error.code || "INTERNAL_SERVER_ERROR";
      return sendErrorResponse(res, errorCode);
    }};


const addDocumentController = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user._id;
        const newDocument = await createDocumentService({ title, content, userIds: [userId] });
        return res.status(201).json({
            message: "Document added successfully",
            document: newDocument
        });
    } catch (error) {
        if (error.code === "DOCUMENT_CREATION_FAILED") {
            return res.status(500).json({
                status: "error",
                statusCode: 500,
                error: {
                    code: "DOCUMENT_CREATION_FAIRSLED",
                    message: "Failed to create document"
                }
            });
        }
    }
};

// const signIn = async (req, res) => {
//     const { username, password } = req.body;
//     try {
//       const { token, user } = await authService.signInService({
//         username,
//         password,
//       });
//       return sendSuccessResponse(res, { message: "Login successful", token, user });
//     } catch (error) {
//       console.log(error);
//       const errorCode = error.code || "INTERNAL_SERVER_ERROR";
//       return sendErrorResponse(res, errorCode);
//     }
//   };
const signIn = async (req, res) => {
      const { username, password } = req.body;
      try {
        const { token, user } = await signInService({
          username,
          password,
        });
        return sendSuccessResponse(res, { message: "Login successful", token, user });
      } catch (error) {
        console.log(error);
        const errorCode = error.code || "INTERNAL_SERVER_ERROR";
        return sendErrorResponse(res, errorCode);
      }
    };
// const updateDocument = async (req, res) => {
//     const document = await documentService.updateDocument(req.params.id, req.body);
//     if (document) {
//         res.json(document);
//     } else {
//         res.status(404).json({ message: 'Document not found' });
//     }
// };

// const deleteDocumentController = async (req, res) => {
//     const result = await documentService.deleteDocument(req.params.id);
//     if (result) {
//         res.status(204).end();
//     } else {
//         res.status(404).json({ message: 'Document not found' });
//     }
// };
const deleteUserControllerByUsername = async (req, res) => {
    try {
      const { username } = req.params;
      console.log(`Request to delete user with username: ${username}`);
      const deletedUser = await deleteUserServiceByUsername(username);
      return res.status(200).json({
        message: "User deleted successfully",
        user: deletedUser
      });
    } catch (error) {
      console.error("Error in deleteUserControllerByUsername", error);
      if (error.code === "USER_NOT_FOUND") {
        return res.status(404).json({
          status: "error",
          statusCode: 404,
          error: {
            code: "USER_NOT_FOUND",
            message: "User not found"
          }
        });
      }
      if (error.code === "USER_DELETION_FAILED") {
        return res.status(500).json({
          status: "error",
          statusCode: 500,
          error: {
            code: "USER_DELETION_FAILED",
            message: "Failed to delete user"
          }
        });
      }
      return res.status(500).json({
        status: "error",
        statusCode: 500,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal Server Error"
        }
      });
    }
  };

module.exports = {
    addDocumentController,
    getAllDocumentsController,
    deleteUserControllerByUsername,
    signIn
}

