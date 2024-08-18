const express = require("express");
const folderService = require("../services/folderService");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/apiRespondUtil");

const addFolder = async (req, res) => {
  const { title, parentId } = req.body;
  const userId =  req.user._id
  try {
    await folderService.addFolderService(title, parentId, userId);
    return sendSuccessResponse(res, { message: "folder added successfully" });
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
};

const addDocumenttoFolder = async (req, res) => {
  const { documentId } = req.body;
  try {
    await folderService.addDocumenttoFolderService(documentId);
    return sendSuccessResponse(res, {
      message: "Document added to folder successfully",
    });
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
};

const addFoldertoFolder = async (req, res) => {
  const { folderId } = req.body;
  try {
    await folderService.addFoldertoFolderService(folderId);
    return sendSuccessResponse(res, {
      message: "Folder added to folder successfully",
    });
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
};

const deleteDocumentFromFolder = async (req, res) => {
    const { documentId } = req.body;
    try {
      await folderService.deleteDocumentFromFolderService(documentId);
      return sendSuccessResponse(res, {
        message: "Document deleted from folder successfully",
      });
    } catch (error) {
      console.log(error);
      const errorCode = error.code || "INTERNAL_SERVER_ERROR";
      return sendErrorResponse(res, errorCode);
    }
};

const deleteFolderFromFolder = async (req, res) => {
    const { folderId } = req.body;
    try {
      await folderService.deleteFolderFromFolderService(folderId);
      return sendSuccessResponse(res, {
        message: "Folder deleted from folder successfully",
      });
    } catch (error) {
      console.log(error);
      const errorCode = error.code || "INTERNAL_SERVER_ERROR";
      return sendErrorResponse(res, errorCode);
    }
};

const getAllFolderForUser = async (req,res) => {
    const userId =  req.user._id
    try {
      const folders = await folderService.getAllFolderForUserService(userId);
      return sendSuccessResponse(res, folders);
    } catch (error) {
      console.log(error);
      const errorCode = error.code || "INTERNAL_SERVER_ERROR";
      return sendErrorResponse(res, errorCode);
    }
}

module.exports = {
  addFolder,
  addDocumenttoFolder,
  addFoldertoFolder,
  deleteDocumentFromFolder,
  deleteFolderFromFolder,
  getAllFolderForUser
};
