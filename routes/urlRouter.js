const express = require("express");
const {
  signUp,
  signIn

} = require("../controllers/authControllers");

const {
   
  addDocumentController
} = require("../controllers/documentController");

const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

//Authorization
router.post("/user/sign-up", signUp);
router.post("/user/sign-in", signIn);

router.post("/user/add",authenticateToken, addDocumentController)


module.exports = router;
