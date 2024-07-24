const Document = require('../models/document');
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const createDocumentService = async (title, content, userId) => {
  try {
    // Kiểm tra xem userId có hợp lệ không
    const user = await User.findById(userId);
    if (!user) {
      const customError = new Error('Invalid user ID');
      customError.code = 'INVALID_USERID';
      throw customError;
    }

    // Kiểm tra tiêu đề có bị trùng không
    let uniqueTitle = title;
    let suffix = 1;
    while (await Document.exists({ title: uniqueTitle, userIds: userId })) {
      uniqueTitle = `${title} (${suffix})`;
      suffix++;
    }

    // Tạo tài liệu với tiêu đề duy nhất
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

const getDocumentsByUserIdService = async (userId) => {
  try {
    // Truy vấn tài liệu chứa userId trong mảng userIds
    
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

    return documents;
  } catch (error) {
    console.error("Error in getDocumentsByUserId:", error);
    throw error;
  }
};


const updateDocumentTitleService = async (userId, documentId, newTitle) => {
  try {
    // Kiểm tra xem người dùng có tồn tại không
    const user = await User.findById(userId);
    if (!user) {
      const customError = new Error('Invalid user ID');
      customError.code = 'INVALID_USERID';
      throw customError;
    }

    // Kiểm tra xem tiêu đề mới có bị trùng lặp không
    const existingDocument = await Document.findOne({ title: newTitle });
    if (existingDocument && existingDocument._id.toString() == documentId.toString()) {
      const customError = new Error('Title already exists');
      customError.code = 'TITLE_ALREADY_EXISTS';
      throw customError;
    }

    // Tìm và cập nhật tiêu đề của document
    const updatedDocument = await Document.findOneAndUpdate(
      { _id: documentId, userIds: userId }, // Tìm tài liệu dựa trên documentId và userId
      { title: newTitle }, // Cập nhật tiêu đề

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


const deleteDocumentByTitleService = async (title) => {
  try {
    const document = await Document.findOne({ title: title });

    if (!document) {
      throw new Error('Document not found');
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
