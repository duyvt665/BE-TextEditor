const express = require("express");
const {
  signUp,
  signIn

} = require("../controllers/authControllers");

const {
   
  addDocumentController,
  getDocumentsController,
  deleteDocumentController,
  updateDocumentTitleController,
  getUserInfoController,
  updateUserInfoController
} = require("../controllers/documentController");

const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

//Authorization
router.post("/user/sign-up", signUp);
router.post("/user/sign-in", signIn);
//////document
router.post("/user/add-document",authenticateToken, addDocumentController)
router.get("/user/get-documents",authenticateToken, getDocumentsController);
router.delete("/user/documents/:title", deleteDocumentController);
router.put("/user/documents/update-title", authenticateToken, updateDocumentTitleController);
router.get("/user/get-info",authenticateToken, getUserInfoController);
router.put("/user/user-update",authenticateToken, updateUserInfoController);


module.exports = router;
