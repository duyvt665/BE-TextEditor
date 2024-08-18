const express = require("express");
const {
  signUp,
  signIn,
  userForgotPassword
  } = require("../controllers/authControllers");
const {
  addDocumentController,
  getDocumentsController,
  deleteDocumentController,
  updateDocumentTitleController,
  getInforDocumentById,
  updateDocument,
  shareDocument,
  getUserOwnDocument,
  updatePermission
} = require("../controllers/documentController");
const {
  getUserInfoController,
  updateUserInfoController,
  changePassword
}= require("../controllers/userController");
const {addFolder, getAllFolderForUser}  = require("../controllers/folderController");

const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

//Authorization
router.post("/user/sign-up", signUp);
router.post("/user/sign-in", signIn);
router.post("/user/forgot-password", userForgotPassword)

//////Document
router.post("/user/add-document",authenticateToken, addDocumentController)
router.get("/user/get-documents",authenticateToken, getDocumentsController);
router.get("/user/infor-document/:documentId", authenticateToken, getInforDocumentById)
router.delete("/user/documents/:documentId",authenticateToken, deleteDocumentController);
router.post("/user/documents/update-title", authenticateToken, updateDocumentTitleController);
router.post("/user/documents-update", authenticateToken, updateDocument)
router.post("/user/documents-share", authenticateToken, shareDocument);
router.post("/user/user-owners", authenticateToken, getUserOwnDocument)
router.post("/user/update-permissions", authenticateToken, updatePermission)

//User
router.get("/user/get-info",authenticateToken, getUserInfoController);
router.put("/user/update-user",authenticateToken, updateUserInfoController);
router.post("/user/change-password", authenticateToken, changePassword)

//Folder
router.post("/add-folder", authenticateToken, addFolder);
router.get("/folder/get-all", authenticateToken, getAllFolderForUser)

module.exports = router;
