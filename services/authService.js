// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/user");
// require("dotenv").config();

// //SIGN UP SERVICE
// const signUpService = async ({
//   email,
//   username,
//   password,
//   confirmPassword,
// }) => {
//   const existingUser = await User.findOne({ email });
//   const existingUserName = await User.findOne({username})
//   if (existingUser) {
//     const error = new Error();
//     error.code = "EMAIL_EXISTS";
//     throw error;
//   }
//   if (existingUserName){
//     const error = new Error();
//     error.code = "USERNAME_EXISTS";
//     throw error;
//   }
//   if (password !== confirmPassword) {
//     const error = new Error();
//     error.code = "PASSWORD_MISMATCH";
//     throw error;
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = await User.create({
//     email,
//     username,
//     password: hashedPassword,
//   });

//   return newUser;
// };

// SIGN IN SERVICE
// const signInService = async ({ username, password }) => {
//   const user = await User.findOne({ username });
//   if (!user) {
//     const error = new Error();
//     error.code = "EMAIL_NOT_FOUND";
//     throw error;
//   }

//   const validPassword = await bcrypt.compare(password, user.password);
//   if (!validPassword) {
//     const error = new Error();
//     error.code = "INCORRECT_PASSWORD";
//     throw error;
//   }

//   const token = jwt.sign(
//     {
//       _id: user._id,
//       email: user.email,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: "168h",
//     } 
//   );

//   return { token, user };
// };

// const getAllUserService = async () =>{
//   const listUsers = User.find();
//   if (!listUsers) {
//     const error = new Error();
//     error.code = "USER_NOT_FOUND";
//     throw error;
//   }
//   return listUsers;
// }


// const addUserService = async ({ username, password, email }) => {
//   try {
//     const newUser = new User({ username, password, email });
//     const savedUser = await newUser.save();
//     return savedUser;
//   } catch (error) {
//     console.error("Error in addUserService:", error);
//     const customError = new Error();
//     customError.code = "USER_CREATION_FAILED";
//     throw customError;
//   }
// };
// const deleteUserServiceByUsername = async (username) => {
//   try {
//     const deletedUser = await User.findOneAndDelete({ username });

//     if (!deletedUser) {
//       const error = new Error();
//       error.code = "USER_NOT_FOUND";
//       throw error;
//     }
//     return deletedUser;
//   } catch (error) {
//     console.error("Error in deleteUserServiceByUsername:", error);
//     const customError = new Error();
//     customError.code = "USER_DELETION_FAILED";
//     throw customError;
//   }
// };
// const updateUserService = async (id, newData) => {
//   try {
//     if (newData.username && /\s/.test(newData.username)) {
//       const error = new Error('Username should not contain spaces');
//       error.code = "INVALID_USERNAME";
//       throw error;
//     }

//     // Kiểm tra khoảng trắng trong email
//     if (newData.email && /\s/.test(newData.email)) {
//       const error = new Error('Email should not contain spaces');
//       error.code = "INVALID_EMAIL";
//       throw error;
//     }
//     if (newData.username) {
//       const existingUser = await User.findOne({ username: newData.username, _id: { $ne: id } });
//       if (existingUser) {
//         const error = new Error('Username already exists');
//         error.code = "USERNAME_ALREADY_EXISTS";
//         throw error;
//       }
//     }

//     // Kiểm tra trùng lặp email
//     if (newData.email) {
//       const existingUser = await User.findOne({ email: newData.email, _id: { $ne: id } });
//       if (existingUser) {
//         const error = new Error('Email already exists');
//         error.code = "EMAIL_ALREADY_EXISTS";
//         throw error;
//       }
//     }
//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       newData,
//       { new: true } // Trả về tài liệu sau khi cập nhật
      
//     );
   
//     console.log(":::::", updatedUser);
   
//     if (!updatedUser) {
//       const error = new Error();
//       error.code = "USER_NOT_FOUND";
//       throw error;
//     }
//     return updatedUser;
//   } catch (error) {
//     console.error("Error in updateUserService:", error);
//     throw error; 
//   }

// };
// module.exports = {
//   // signUpService,
//   // signInService,
//   // getAllUserService,
//   // addUserService,
//   // deleteUserServiceByUsername,
//   // updateUserService

// };
