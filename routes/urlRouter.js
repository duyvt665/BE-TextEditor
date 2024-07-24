const express = require("express");
const {
  signUp,
  signIn,
  getUserInfoController,
  updateUserInfoController

} = require("../controllers/authControllers");

const {
   
  addDocumentController,
  getDocumentsController,
  deleteDocumentController,
  updateDocumentTitleController,
 
} = require("../controllers/documentController");

const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

//Authorization
router.post("/user/sign-up", signUp);
router.post("/user/sign-in", signIn);
router.get("/user/get-info",authenticateToken, getUserInfoController);
router.put("/user/update-user",authenticateToken, updateUserInfoController);
//////document
router.post("/user/add-document",authenticateToken, addDocumentController)
router.get("/user/get-documents",authenticateToken, getDocumentsController);
router.delete("/user/documents/:title", deleteDocumentController);
router.put("/user/documents/update-title", authenticateToken, updateDocumentTitleController);



module.exports = router;
