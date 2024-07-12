// services/documentService.js
const Document = require('../models/document');

// const getAllDocuments = async () => {
//     const listDocuments = await Document.find();
//     if (!listDocuments) {
//         const error = new Error();
//         error.code = "DOCUMENT_NOT_FOUND";
//         throw error;
//     }
//     return listDocuments;
// }
//     ;

// const getDocumentById = async (id) => {
//     try {
//         const document = await Document.findById(id);
//         if (!document) {
//             const error = new Error('Document not found');
//             error.code = 'DOCUMENT_NOT_FOUND';
//             throw error;
//         }
//         return document;
//     } catch (error) {
//         throw new Error(`Error fetching document by ID: ${error.message}`);
//     }
// };

const createDocumentService = async (title,content) => {
    try {
        const document = new Document(title,content);
        return await document.save();
    } catch (error) {
        console.error("Error in addUserService:", error);
        const customError = new Error();
        customError.code = "DOCUMENT_CREATION_FAILED";
        throw customError;
    };
};


// const updateDocument = async (id, data) => {
//   try {
//     const document = await Document.findByIdAndUpdate(id, data, { new: true });
//     if (!document) {
//       const error = new Error('Document not found');
//       error.code = 'DOCUMENT_NOT_FOUND';
//       throw error;
//     }
//     return document;
//   } catch (error) {
//     throw new Error(`Error updating document: ${error.message}`);
//   }
// };

// const deleteDocument = async (id) => {
//   try {
//     const document = await Document.findByIdAndDelete(id);
//     if (!document) {
//       const error = new Error('Document not found');
//       error.code = 'DOCUMENT_NOT_FOUND';
//       throw error;
//     }
//     return document;
//   } catch (error) {
//     throw new Error(`Error deleting document: ${error.message}`);
//   }
// };

module.exports = {
    createDocumentService
}

