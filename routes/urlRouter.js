const express = require("express");
const {
  signUp,
  signIn
  } = require("../controllers/authControllers");

const {
  addDocumentController,
  getDocumentsController,
  deleteDocumentController,
  updateDocumentTitleController
} = require("../controllers/documentController");

const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

//Authorization
router.post("/user/sign-up", signUp);
router.post("/user/sign-in", signIn);

//////document
router.post("/user/add-document",authenticateToken, addDocumentController)
router.get("/user/get-documents",authenticateToken, getDocumentsController);
router.delete("/user/documents/:documentId",authenticateToken, deleteDocumentController);
router.put("/user/documents/update-title", authenticateToken, updateDocumentTitleController);



module.exports = router;
