const express = require("express");
const {
  signUp,
  signIn,
} = require("../controllers/authControllers");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

//Authorization
router.post("/user/sign-up", signUp);
router.post("/user/sign-in", signIn);

module.exports = router;
