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
// const signIn = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const { token, user } = await authService.signInService({
//       username,
//       password,
//     });
//     return sendSuccessResponse(res, { message: "Login successful", token, user });
//   } catch (error) {
//     console.log(error);
//     const errorCode = error.code || "INTERNAL_SERVER_ERROR";
//     return sendErrorResponse(res, errorCode);
//   }
// };

const getAllUsers = async (req, res) => {
  try {
     const users= await getAllUserService();
     return sendSuccessResponse(res, {message: "Users fetched successfully", users})
  }
  catch (error) {
    console.log(error);
    const errorCode = error.code || "INTERNAL_SERVER_ERROR";
    return sendErrorResponse(res, errorCode);
  }
};

// const addUserController = async (req, res) => {
//   try {
//     const { username, password, email } = req.body;
//     console.log(`Request to add user with username: ${username}`);
//     const newUser = await addUserService({ username, password, email });
//     return res.status(201).json({
//       message: "User added successfully",
//       user: newUser
//     });
//   } catch (error) {
//     console.error("Error in addUserController:", error);
//     if (error.code === "USER_CREATION_FAILED") {
//       return res.status(500).json({ 
//         status: "error",
//         statusCode: 500,
//         error: {
//           code: "USER_CREATION_FAILED",
//           message: "Failed to create user"
//         }
//       });
//     }
//     return res.status(500).json({ 
//       status: "error",
//       statusCode: 500,
//       error: {
//         code: "INTERNAL_SERVER_ERROR",
//         message: "Internal Server Error"
//       }
//     });
//   }
// };
const deleteUserControllerByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    console.log(`Request to delete user with username: ${username}`);
    const deletedUser = await deleteUserServiceByUsername(username);
    return res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser
    });
  } catch (error) {
    console.error("Error in deleteUserControllerByUsername", error);
    if (error.code === "USER_NOT_FOUND") {
      return res.status(404).json({
        status: "error",
        statusCode: 404,
        error: {
          code: "USER_NOT_FOUND",
          message: "User not found"
        }
      });
    }
    if (error.code === "USER_DELETION_FAILED") {
      return res.status(500).json({
        status: "error",
        statusCode: 500,
        error: {
          code: "USER_DELETION_FAILED",
          message: "Failed to delete user"
        }
      });
    }
    return res.status(500).json({
      status: "error",
      statusCode: 500,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal Server Error"
      }
    });
  }
};
const updateUserWebsite = async (req, res) =>  {
  try {
    const { id } = req.params;
   
    const newData = req.body; // Dữ liệu mới để cập nhật
    console.log(`Request to update user with ID: ${id}`);
    const updatedUser = await updateUserService(id, newData);
    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Error in updateUserController:", error);
    if (error.code === "USER_NOT_FOUND") {
      return res.status(404).json({
        status: "error",
        statusCode: 404,
        error: {
          code: "USER_NOT_FOUND",
          message: "User not found"
        }
      });
    }
    if (error.code === "USERNAME_ALREADY_EXISTS") {
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        error: {
          code: "USERNAME_ALREADY_EXISTS",
          message: "Username already exists"
        }
      });
    }
    if (error.code === "INVALID_USERNAME") {
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        error: {
          code: "INVALID_USERNAME",
          message: "Username should not contain spaces"
        }
      });
    }
    if (error.code === "EMAIL_ALREADY_EXISTS") {
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        error: {
          code: "EMAIL_ALREADY_EXISTS",
          message: "Email already exists"
        }
      });
    }
    return res.status(500).json({
      status: "error",
      statusCode: 500,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal Server Error"
      }
    });
  }
};

module.exports = {
  // signUp,
  // signIn,
  // getAllUsers,
  // addUserController,
  // deleteUserControllerByUsername,
  // updateUserWebsite
};
