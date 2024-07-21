require("dotenv").config();
const authService = require("../services/authService");
const {sendErrorResponse, sendSuccessResponse} = require("../utils/apiRespondUtil");


//SIGN UP
const signUp = async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;
  try {
    await authService.signUpService({
      email,
      username,
      password,
      confirmPassword,
    });
    return sendSuccessResponse(res, { message: "User created successfully" });
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
};

//SIGN IN
const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const { token, user } = await authService.signInService({
      username,
      password,
    });
    return sendSuccessResponse(res, { message: "Login successful", token, user });
  } catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
};
const getAllDocumentsController = async (req, res) => {
  try {
     const documents= await getAllDocumentsService();
     return sendSuccessResponse(res, {message: "Documents fetched successfully", documents})
  }
  catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }};


const addDocumentController = async (req, res) => {
  try {
      const { title, content } = req.body;
      const userId = req.user._id;
      const newDocument = await createDocumentService({ title, content, userIds: [userId] });
      return res.status(201).json({
          message: "Document added successfully",
          document: newDocument
      });
  } catch (error) {
      if (error.code === "DOCUMENT_CREATION_FAILED") {
          return res.status(500).json({
              status: "error",
              statusCode: 500,
              error: {
                  code: "DOCUMENT_CREATION_FAIRSLED",
                  message: "Failed to create document"
              }
          });
      }
  }
};

module.exports = {
  signUp,
  signIn,
  getAllDocumentsController,
  addDocumentController

};
