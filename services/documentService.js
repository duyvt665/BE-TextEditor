const Document = require('../models/document');
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//Create Document
const createDocumentService = async (title, content, userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      const customError = new Error('Invalid user ID');
      customError.code = 'INVALID_USERID';
      throw customError;
    }
    let uniqueTitle = title;
    let suffix = 1;
    while (await Document.exists({ title: uniqueTitle, userIds: userId })) {
      uniqueTitle = `${title} (${suffix})`;
      suffix++;
    }
    const document = new Document({
      title: uniqueTitle,
      content,
      userIds: [userId]
    });
    return await document.save();
  } catch (error) {
    console.error('Error in createDocumentService:', error);
    const customError = new Error();
    customError.code = 'DOCUMENT_CREATION_FAILED';
    throw customError;
  }
};

//Get Document By UserId     
const getDocumentsByUserIdService = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      const customError = new Error('Invalid user ID');
      customError.code = 'INVALID_USERID';
      throw customError;
    }

    const documents = await Document.find({ userIds: userId });
    if (!documents) {
      const customError = new Error('No documents found for this user');
      customError.code = 'DOCUMENT_NOT_FOUND';
      throw customError;
    } 
    if(documents && documents.length <= 0){
        const documentsEmpty = {}
      return {documentsEmpty};
    }

    return documents;
  } catch (error) {
    console.error("Error in getDocumentsByUserId:", error);
    throw error;
  }
};

// Update Document 
const updateDocumentTitleService = async (userId, documentId, newTitle) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      const customError = new Error('Invalid user ID');
      customError.code = 'INVALID_USERID';
      throw customError;
    }

    const existingDocument = await Document.findOne({ title: newTitle });
    if (existingDocument && existingDocument._id.toString() == documentId.toString()) {
      const customError = new Error('Title already exists');
      customError.code = 'TITLE_ALREADY_EXISTS';
      throw customError;
    }

    const updatedDocument = await Document.findOneAndUpdate(
      { _id: documentId, userIds: userId }, 
      { title: newTitle }, 
    );

    if (!updatedDocument) {
      const customError = new Error('No documents found for this user');
      customError.code = 'DOCUMENT_NOT_FOUND';
      throw customError;
    }

    return updatedDocument;
  } catch (error) {
    console.error("Error in updateDocumentTitleService:", error);
    const customError = new Error();
    customError.code = error.code || 'UPDATE_TITLE_FAILED';
    throw customError;
  }
};

// Delete Document
const deleteDocumentByTitleService = async (documentId, userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      const customError = new Error('Invalid user ID');
      customError.code = 'INVALID_USERID';
      throw customError;
    }

    const document = await Document.findOne ({ documentId: documentId, userIds: userId });
    if (!document) {
      const customError = new Error('No documents found for this user');
      customError.code = 'DOCUMENT_NOT_FOUND';
      throw customError;
    }

    await Document.findByIdAndDelete(document._id);

    return { message: 'Document deleted successfully' };
  } catch (error) {
    console.error("Error in deleteDocumentByTitleService:", error);
    throw error;
  }
};

module.exports = {
  createDocumentService,
  getDocumentsByUserIdService,
  deleteDocumentByTitleService,
  updateDocumentTitleService

}
