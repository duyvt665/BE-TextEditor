const Document = require("../models/document");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ADD DOCUMENT SERVICE
const createDocumentService = async (title, content, userId) => {
  const user = await User.findById(userId);
  if (!user) {
    const customError = new Error();
    customError.code = "INVALID_USERID";
    throw customError;
  }

  const existingDocuments = await Document.find({
    title: new RegExp(`^${title}( \\(\\d+\\))?$`), 
    userIds: userId,
  });

  let newTitle = title;
  if (existingDocuments.length > 0) {
    const highestCount = existingDocuments.reduce((max, doc) => {
      const match = doc.title.match(/\((\d+)\)$/);
      const count = match ? parseInt(match[1], 10) : 0;
      return Math.max(max, count);
    }, 0);
    newTitle = `${title} (${highestCount + 1})`;
  }

  const document = new Document({
    title: newTitle,
    content,
    owner: user.email,
    userIds: [userId],
  });

  return await document.save();
};
// GET ALL DOCUMENTS BY USER SERVICE
const getDocumentsByUserIdService = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      const customError = new Error();
      customError.code = "INVALID_USERID";
      throw customError;
    }

    const documents = await Document.find({ userIds: userId });
    if (!documents) {
      const customError = new Error();
      customError.code = "DOCUMENT_NOT_FOUND";
      throw customError;
    }
    if (documents && documents.length <= 0) {
      const documentsEmpty = {};
      return { documentsEmpty };
    }

    return documents;
  } catch (error) {
    console.error("Error in getDocumentsByUserId:", error);
    throw error;
  }
};

// GET INFOR DOCUMENT BY ID DOCUMENT SERVICE
const getDocumentByIdService = async (documentId, userId) => {
  const user = await User.findById(userId);
  if (!user) {
    const customError = new Error();
    customError.code = "INVALID_USERID";
    throw customError;
  }

  const document = await Document.findById(documentId);
  if (!document) {
    const customError = new Error();
    customError.code = "DOCUMENT_NOT_FOUND";
    throw customError;
  }
  return document;
};

// UPDATE TITLE DOCUMENT SERVICE
const updateDocumentTitleService = async (userId, documentId, newTitle) => {
  const user = await User.findById(userId);
  const document = await Document.findById(documentId);
  if (!user) {
    const customError = new Error();
    customError.code = "INVALID_USERID";
    throw customError;
  }

  if (!document) {
    const customError = new Error();
    customError.code = "DOCUMENT_NOT_FOUND";
    throw customError;
  }

  const existingDocument = await Document.findOne({
    title: newTitle,
    userIds: userId,
  });

  if (existingDocument) {
    const customError = new Error();
    customError.code = "TITLE_ALREADY_EXISTS";
    throw customError;
  }

  document.title = newTitle;
  await document.save();

  return { message: "Document Title Updated Successfully" };
};

// EDIT DOCUMENT SERVICE
const updateDocumentService = async (
  userId,
  documentId,
  newTitle,
  newContent
) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      const customError = new Error();
      customError.code = "INVALID_USERID";
      throw customError;
    }
    const existingDocument = await Document.findOne({
      _id: documentId,
      userIds: userId,
    });

    if (!existingDocument) {
      const customError = new Error();
      customError.code = "DOCUMENT_NOT_FOUND";
      throw customError;
    }

    if (newTitle !== existingDocument.title) {
      const duplicateTitle = await Document.findOne({
        userIds: userId,
        title: newTitle,
        _id: { $ne: documentId },
      });

      if (duplicateTitle) {
        const customError = new Error();
        customError.code = "TITLE_ALREADY_EXISTS";
        throw customError;
      }
    }

    const updatedFields = {};
    if (newTitle !== undefined && newTitle !== existingDocument.title) {
      updatedFields.title = newTitle;
    }
    if (newContent !== undefined && newContent !== existingDocument.content) {
      updatedFields.content = newContent;
    }

    if (Object.keys(updatedFields).length > 0) {
      await Document.findByIdAndUpdate(documentId, updatedFields, {
        new: true,
      });
    }

    return { message: "Document updated successfully" };
  } catch (error) {
    console.error("Error in updateDocumentService:", error);
    throw error;
  }
};

// DELETE DOCUMENT SERVICE
const deleteDocumentByTitleService = async (documentId, userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      const customError = new Error();
      customError.code = "INVALID_USERID";
      throw customError;
    }

    const document = await Document.findOne({
      _id: documentId,
      userIds: userId,
    });
    if (!document) {
      const customError = new Error();
      customError.code = "DOCUMENT_NOT_FOUND";
      throw customError;
    }

    if (document.owner === user.email) {
      await Document.findByIdAndDelete(document._id);
      return { message: "Document deleted successfully" };
    } else {
      document.userIds = document.userIds.filter((id) => !id.equals(userId));
      await document.save();
    }

    return { message: "Document deleted successfully" };
  } catch (error) {
    console.error("Error in deleteDocumentByTitleService:", error);
    throw error;
  }
};

// SHARE DOCUMENT SERVICE
const shareDocumentService = async (email, documentId,permission, userId) => {
  const user = await User.findById(userId);
  if (!user) {
    const customError = new Error();
    customError.code = "INVALID_USERID";
    throw customError;
  }

  const newUser = await User.findOne({ email });
  if (!newUser) {
    const customError = new Error();
    customError.code = "USER_NOT_FOUND";
    throw customError;
  }

  const document = await Document.findById(documentId);
  if (!document) {
    const customError = new Error();
    customError.code = "DOCUMENT_NOT_FOUND";
    throw customError;
  }

  const newUserId = newUser._id;
  if (document.userIds.includes(newUserId)) {
    const customError = new Error();
    customError.code = "USER_ALREADY_SHARED";
    throw customError;
  }
  document.userIds.push(newUserId);
  document.permissions.set(newUserId.toString(), permission);
  await document.save();

  return { message: "Share document successfully" };
};

// GET USERS WHO OWN DOCUMENTS BY DOCUMENT ID SERVICE
const getUserOwnDocumentService = async (documentId) =>{
  const document = await Document.findById(documentId)
  if(!document){
    const customError = new Error();
    customError.code = "DOCUMENT_NOT_FOUND";
    throw customError;
  }

  const { owner, userIds, permissions } = document;
  const usersWithPermissions = [];

  for (const userId of userIds) {
    const user = await User.findById(userId).exec();
    if (user && user.email !== owner) {
      const permission = permissions.get(userId.toString());
      usersWithPermissions.push({
        email: user.email,
        permission,
      });
    }
  }

  return usersWithPermissions;
}

const updatePermissionService = async (documentId, email, permission) => {
  const user = await User.findOne({ email });
  if (!user) {
    const customError = new Error();
    customError.code = "INVALID_USERID";
    throw customError;
  }
  const userId = user._id;
  const document = await Document.findById(documentId);
  if (!document) {
    const customError = new Error();
    customError.code = "DOCUMENT_NOT_FOUND";
    throw customError;
  }

  document.permissions.set(userId.toString(), permission);
  await document.save();
  return { message: "Permission updated successfully" };
}


module.exports = {
  createDocumentService,
  getDocumentsByUserIdService,
  deleteDocumentByTitleService,
  updateDocumentTitleService,
  getDocumentByIdService,
  updateDocumentService,
  shareDocumentService,
  getUserOwnDocumentService,
  updatePermissionService
};
