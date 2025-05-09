import { asyncHandler } from "../utils/async-handler.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-responce.js";
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js";

const registerUser = asyncHandler(async (req, res) => {
  // console.log(req.body);
  
  const { email, username, password, role } = req.body;
  // check if user is already exists if not then create one 
  const existingUser = await User.findOne({email})
  if(existingUser){
    return res.status(409).json(new ApiResponse(409, { message: "User is already exists"}));
  }
    const user =await User.create({
      username,
      email,
      password,
      role
    });
  
  //send temp varification token 
  if(!user){
    return res.status(400).json(new ApiResponse(400, { message: "User is not registerd"}));
  }
  
  const {unHashedToken, hashedToken, tokenExpiry} = await user.generateTemporaryToken()
   user.emailVerificationToken = hashedToken;
   user.emailVerificationExpiry = tokenExpiry;
  console.log(hashedToken);

  await user.save();

  //send email
  const mail = sendEmail({
    email:user.email,
    subject:"Verify Email",
    mailgenContent : emailVerificationMailgenContent(
      (await user).username,`${process.env.BASE_URL}/api/v1/varify/${hashedToken}`
    )
  })
  return res.status(200).json(new ApiResponse(200, { message: "User register successfully"}));
  
  //validation
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const logoutUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const resendEmailVerification = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});
const resetForgottenPassword = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

export {
  changeCurrentPassword,
  forgotPasswordRequest,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetForgottenPassword,
  verifyEmail,
};
