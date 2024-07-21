const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

//SIGN UP SERVICE
const signUpService = async ({
  email,
  username,
  password,
  confirmPassword,
}) => {
  const existingUser = await User.findOne({ email });
  const existingUserName = await User.findOne({username})
  if (existingUser) {
    const error = new Error();
    error.code = "EMAIL_EXISTS";
    throw error;
  }
  if (existingUserName){
    const error = new Error();
    error.code = "USERNAME_EXISTS";
    throw error;
  }
  if (password !== confirmPassword) {
    const error = new Error();
    error.code = "PASSWORD_MISMATCH";
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    username,
    password: hashedPassword,
  });

  return newUser;
};

//SIGN IN SERVICE
const signInService = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) {
    const error = new Error();
    error.code = "EMAIL_NOT_FOUND";
    throw error;
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    const error = new Error();
    error.code = "INCORRECT_PASSWORD";
    throw error;
  }

  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "168h",
    }
  );

  return { token, user };
};
const getAllDocumentsService = async () => {
  const listDocuments = await Document.find();
  if (!listDocuments) {
      const error = new Error();
      error.code = "DOCUMENT_NOT_FOUND";
      throw error;
  }
  return listDocuments;
};
const createDocumentService = async (title,content) => {
  try {
      const document = new Document(title,content);
      console.log(document);
      return await document.save();
  } catch (error) {
      console.error("Error in createDocumentService:", error);
      const customError = new Error();
      customError.code = "DOCUMENT_CREATION_FAILED";
      throw customError;
  };
};

module.exports = {
  signUpService,
  signInService,
  getAllDocumentsService,
  createDocumentService
};
