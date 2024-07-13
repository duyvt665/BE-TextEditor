// services/documentService.js
const Document = require('../models/document');
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllDocumentsService = async () => {
    const listDocuments = await Document.find();
    if (!listDocuments) {
        const error = new Error();
        error.code = "DOCUMENT_NOT_FOUND";
        throw error;
    }
    return listDocuments;
}
    ;
    const signInService = async ({ username, password }) => {
        const user = await User.findOne({ username });
        if (!user) {
          const error = new Error();
          error.code = "EMAIL_NOT_FOUND";
          throw error;
        }
      
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          const error = new Error();
          error.code = "INCORRECT_PASSWORD";
          throw error;
        }
      
        const token = jwt.sign(
          {
            _id: user._id,
            email: user.email,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "168h",
          } 
        );
      
        return { token, user };
      };
      

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
        console.log(document);
        return await document.save();
    } catch (error) {
        console.error("Error in createDocumentService:", error);
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

const deleteUserServiceByUsername = async (username) => {
    try {
      const deletedUser = await User.findOneAndDelete({ username });
  
      if (!deletedUser) {
        const error = new Error();
        error.code = "USER_NOT_FOUND";
        throw error;
      }
      return deletedUser;
    } catch (error) {
      console.error("Error in deleteUserServiceByUsername:", error);
      const customError = new Error();
      customError.code = "USER_DELETION_FAILED";
      throw customError;
    }
  };

module.exports = {
    createDocumentService,
    getAllDocumentsService,
    deleteUserServiceByUsername,
    signInService
}

