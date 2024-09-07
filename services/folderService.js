const express = require("express");
const User = require("../models/user");
const Folder = require("../models/folder");
const Document = require("../models/document");
const UserFolder = require("../models/userFolder");
require("dotenv").config();

const addFolderService = async (title, parentId, userId) => {
  const user = await User.findById(userId);
  const newFolder = new Folder({
    title,
    owner: user.email,
    parent: parentId || null,
  });
  await newFolder.save();
  if (parentId) {
    await Folder.findByIdAndUpdate(parentId, {
      $push: { subfolders: newFolder._id },
    });
  }
};

const addDocumenttoFolderService = async (documentId, folderId, userId) => {
  const document = await Document.findById(documentId);
  const folder = await Folder.findById(folderId);

  if (!document || !folder) {
    const customError = new Error();
    customError.code = "DOCUMENT_OR_FOLDER_NOT_FOUND";
    throw customError;
  }

  let userFolder = await UserFolder.findOne({ user: userId, folder: folderId });
  if (!userFolder) {
    userFolder = new UserFolder({
      user: userId,
      folder: folderId,
      documents: [],
    });
  }

  if (userFolder.documents.includes(documentId)) {
    const customError = new Error();
    customError.code = "DOCUMENT_EXISTS_FOLDER";
    throw customError;
  }
  userFolder.documents.push(documentId);
  await userFolder.save();
};

const getAllFolderForUserService = async (userId) => {
  const user = await User.findById(userId);
  const folders = await Folder.find({ owner: user.email }).populate(
    "subfolders"
  );
  return folders;
};

const renameFolderService = async (folderId, newName, userId) => {
  const user = await User.findById(userId);
  const folder = await Folder.findById(folderId);
  if (!user) {
    const customError = new Error();
    customError.code = "INVALID_USERID";
    throw customError;
  }
  const existing = await Document.exists({
    title: newName,
    owner: user.email,
  });
  if (existing) {
    const customError = new Error();
    customError.code = "TITLE_ALREADY_EXISTS";
    throw customError;
  }
  folder.title = newName;
  await folder.save();
};

const deleteFolderService = async (folderId, userId) => {
  const user = await User.findById(userId);

  if (!user) {
    const customError = new Error();
    customError.code = "INVALID_USERID";
    throw customError;
  }

  const folder = await Folder.findOne({
    _id: folderId,
    owner: user.email,
  });
  if (!folder) {
    const customError = new Error();
    customError.code = "FOLDER_NOT_FOUND";
    throw customError;
  }
  await Folder.findByIdAndDelete(folderId);
};

const getAllDocumentToFolderService = async (folderId, userId) => {
  const user = await User.findOne({ _id: userId });
  const folder = await Folder.findOne({ _id: folderId, owner: user.email });
  if (!folder) {
    const customError = new Error();
    customError.code = "FOLDER_NOT_FOUND";
    throw customError;
  }
  const userFolder = await UserFolder.findOne({
    user: userId,
    folder: folderId,
  });
  if (!userFolder) {
    return [];
  }
  const documents = await Document.find({
    _id: { $in: userFolder.documents },
  });
  return documents;
};

const deleteDocumentFromFolderService = async (
  documentId,
  folderId,
  userId
) => {
  const user = await User.findOne({ _id: userId });
  const folder = await Folder.findOne({ _id: folderId, owner: user.email });
  if (!folder) {
    const customError = new Error();
    customError.code = "FOLDER_NOT_FOUND";
    throw customError;
  }
  const userFolder = await UserFolder.findOne({
    user: userId,
    folder: folderId,
  });
  if (!userFolder) {
    const customError = new Error();
    customError.code = "FOLDER_NOT_FOUND";
    throw customError;
  }
  const documentIndex = userFolder.documents.indexOf(documentId);
  if (documentIndex === -1) {
    throw new Error("Document is not in this folder");
  }

  userFolder.documents.splice(documentIndex, 1);
  await userFolder.save();
  return { message: 'Document removed from folder successfully' };
};

module.exports = {
  addFolderService,
  getAllFolderForUserService,
  deleteFolderService,
  renameFolderService,
  addDocumenttoFolderService,
  getAllDocumentToFolderService,
  deleteDocumentFromFolderService
};
