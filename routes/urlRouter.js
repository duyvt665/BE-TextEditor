const express = require("express");
const {
  signUp,
  signIn

} = require("../controllers/authControllers");

const {
   
  addDocumentController,
  getDocumentsController,
  deleteDocumentController 
} = require("../controllers/documentController");

const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

//Authorization
router.post("/user/sign-up", signUp);
router.post("/user/sign-in", signIn);
//////document
router.post("/user/add-document",authenticateToken, addDocumentController)
router.get("/user/documents/:userId",authenticateToken, getDocumentsController);
router.delete("/user/documents/:title", deleteDocumentController);



module.exports = router;
