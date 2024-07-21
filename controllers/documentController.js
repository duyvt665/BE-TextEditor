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
// const addDocumentController = async (req, res) => {
//     try {
//         const { title, content } = req.body;
//         const userId = req.user._id;
//         const newDocument = await createDocumentService({ title, content, userIds: [userId] });
//         return res.status(201).json({
//             message: "Document added successfully",
//             document: newDocument
//         });
//     } catch (error) {
//         if (error.code === "DOCUMENT_CREATION_FAILED") {
//             return res.status(500).json({
//                 status: "error",
//                 statusCode: 500,
//                 error: {
//                     code: "DOCUMENT_CREATION_FAIRSLED",
//                     message: "Failed to create document"
//                 }
//             });
//         }
//     }
// };


module.exports = {
    addDocumentController,
   
}

