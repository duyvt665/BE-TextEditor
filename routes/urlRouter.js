const express = require("express");
const {
  // signUp,
  // signIn,
  // getAllUsers,
  // addUserController,
  // deleteUserControllerByUsername,
  // updateUserWebsite
  addDocumentController,
} = require("../controllers/documentController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();
  
//Authorization
// router.post("/user/sign-up", signUp);
// router.post("/user/sign-in", signIn);
// router.get("/user/all", getAllUsers);
// router.post("/user/add", addUserController);
// router.delete("/user/delete/:username", deleteUserControllerByUsername);
// router.put("/user/updateUser/:id",updateUserWebsite);
// router.get('/', getAllDocuments);
// router.get('/:id',getDocumentById);
// router.post('/add', createDocument);
// router.put('/:id', updateDocument);
// router.delete('/:id',deleteDocument);
router.post("/user/add", addDocumentController)

module.exports = router;




