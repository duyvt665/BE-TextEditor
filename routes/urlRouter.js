const express = require("express");
const {
  signUp,
  signIn,
  addDocumentController,
  getAllDocumentsController
} = require("../controllers/authControllers");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

//Authorization
router.post("/user/sign-up", signUp);
router.post("/user/sign-in", signIn);
router.get('/user/all',authenticateToken ,getAllDocumentsController);
router.post("/user/add",authenticateToken, addDocumentController)

module.exports = router;
