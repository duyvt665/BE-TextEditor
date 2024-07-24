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
      throw new Error('No documents found for this user');
    }

    return documents;
  } catch (error) {
    console.error("Error in getDocumentsByUserId:", error);
    throw error;
  }
};


const updateDocumentTitleService = async (userId, documentId, newTitle) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      const customError = new Error('Invalid user ID');
      customError.code = 'INVALID_USERID';
      throw customError;
    }
    // Tìm và cập nhật tiêu đề của document
    const updatedDocument = await Document.findOneAndUpdate(
      { _id: documentId, userIds: userId }, // Tìm tài liệu dựa trên documentId và userId
      { title: newTitle }, // Cập nhật tiêu đề
      { new: true, runValidators: true } // Đảm bảo tài liệu được trả về sau khi cập nhật
    );
    if (!updatedDocument) {
      throw new Error('Document not found or you do not have permission to update this document.');
    }

    return updatedDocument;
  } catch (error) {
    console.error("Error in updateDocumentTitleService:", error);
    throw error;
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
const getUserInfoService = async (userId) => {
  try {
    // Tìm kiếm người dùng theo userId
    const user = await User.findById(userId);
    
    if (!user) {
      const customError = new Error('Invalid user ID');
      customError.code = 'INVALID_USERID';
      throw customError;
    }

    // Trả về thông tin người dùng
    return {
      id: user._id,
      email: user.email,
      username: user.username,
      googleId: user.googleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  } catch (error) {
    console.error("Error in getUserInfoService:", error);
    throw error;
  }
};
const updateUserInfoService = async (userId, updateData) => {
  try {
    // Kiểm tra xem người dùng có tồn tại không
    const user = await User.findById(userId);
    if (!user) {
      const customError = new Error('Invalid user ID');
      customError.code = 'INVALID_USERID';
      throw customError;
    }

    // Cập nhật thông tin người dùng
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    return {
      id: updatedUser._id,
      email: updatedUser.email,
      username: updatedUser.username,
      googleId: updatedUser.googleId,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  } catch (error) {
    console.error("Error in updateUserInfoService:", error);
    throw error;
  }
};
module.exports = {
  createDocumentService,
  getDocumentsByUserIdService,
  deleteDocumentByTitleService,
  updateDocumentTitleService,
  getUserInfoService,
  updateUserInfoService
}
