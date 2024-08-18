const express = require("express");
const User = require("../models/user");
const Folder = require("../models/folder");
const Document = require("../models/document");
require("dotenv").config();

const addFolderService = async (title, parentId, userId) => {
  const user = await User.findById(userId);
  const newFolder = new Folder({ title, owner: user.email, parent: parentId || null });
  await newFolder.save();
  if (parentId) {
    await Folder.findByIdAndUpdate(parentId, {
      $push: { subfolders: newFolder._id },
    });
  }
};

const getAllFolderForUserService = async (userId) => {
    const user = await User.findById(userId);
    const folders = await Folder.find({ owner: user.email }).populate("subfolders");
    return folders;
}

module.exports = {addFolderService, getAllFolderForUserService}
