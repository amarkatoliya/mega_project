import { asyncHandler } from "../utils/async-handler.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-responce.js";
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js";
import { subtle } from "crypto";
import { error } from "console";

const registerUser = asyncHandler(async (req, res) => {
  // console.log(req.body);

  const { email, username, password, role } = req.body;

  // check if user is already exists if not then create one
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(409)
      .json(new ApiResponse(409, { message: "User is already exists" }));
  }
  const user = await User.create({
    username,
    email,
    password,
    role,
  });

  //send temp varification token
  if (!user) {
    return res
      .status(400)
      .json(new ApiResponse(400, { message: "User is not registerd" }));
  }

  const { unHashedToken, hashedToken, tokenExpiry } =
    await user.generateTemporaryToken();
  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;
  console.log(hashedToken);

  await user.save();

  //send email
  const mail = sendEmail({
    email: user.email,
    subject: "Verify Email",
    mailgenContent: emailVerificationMailgenContent(
      await user.username,
      `${process.env.BASE_URL}/api/v1/users/varify/${hashedToken}`,
    ),
  });
  return res
    .status(200)
    .json(new ApiResponse(200, { message: "User register successfully" }));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json(new ApiResponse(400, { message: "User is not registered" }));
  }

  const isPassMatch = await user.isPasswordCorrect(password);
  if (!isPassMatch) {
    return res
      .status(400)
      .json(new ApiResponse(400, { message: "password is not matched" }));
  }

  const refreshToken = await user.generateRefreshToken();
  // console.log(refreshToken);
  const accessToken = await user.generateAccessToken();
  console.log(user);
  const cookieOption = {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000, //24 hour
  };
  res.cookie("accessToken", accessToken, cookieOption);
  res
    .status(200)
    .json(new ApiResponse(200, { message: "user login succesfully" }));
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("accessToken", "", {});
  res
    .status(200)
    .json(new ApiResponse(200, { message: "user logout succesfully" }));
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { hashedToken } = req.params;

  if (!hashedToken) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, { message: "failed to fetch varification token" }),
      );
  }

  const user = await User.findOne({ emailVerificationToken: hashedToken });
  if (!user) {
    return res.status(400).json(
      new ApiResponse(400, {
        message: "failed to find and match token in db",
      }),
    );
  }

  user.emailVerificationToken = undefined;
  user.isEmailVerified = true;
  // user.emailVerificationExpiry = tokenExpiry;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, { message: "User varify successfully" }));
});

const resendEmailVerification = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const resetForgottenPassword = asyncHandler(async (req, res) => {
  const { email, confpass, password } = req.body;

  if (!email || !password || !confpass) {
    return res
      .status(400)
      .json(new ApiResponse(400, { message: "all feild are required" }));
  }

  if (password != confpass) {
    return res.status(400).json(
      new ApiResponse(400, {
        message: "please select select valid password",
      }),
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, { message: "failed to find user based on email" }),
      );
  }

  user.password = confpass;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, { message: "succesfully password reset" }));
});

const resetForgottenPasswordVarify = asyncHandler(async (req, res) => {
  const { hashedToken } = req.params;

  if (!hashedToken) {
    return res
      .status(400)
      .json(new ApiResponse(400, { message: "token not found" }));
  }

  const user = await User.findOne({ forgotPasswordToken: hashedToken });

  if (!user) {
    return res
      .status(400)
      .json(new ApiResponse(400, { message: "token not matched" }));
  }

  user.isrestPassEmailVerified = true;
  user.forgotPasswordToken = undefined;
  await user.save();

  return res.status(200).json(
    new ApiResponse(200, {
      message: "user is successfully varify for pass reset",
    }),
  );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, { message: "failed to find user based on email" }),
      );
  }
  const { unHashedToken, hashedToken, tokenExpiry } =
    await user.generateTemporaryToken();
  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;
  console.log(unHashedToken);
  // console.log(user);
  await user.save();

  //send mail for varify
  const passVarifyMail = sendEmail({
    email: user.email,
    subject: "for password varify ",
    mailgenContent: emailVerificationMailgenContent(
      await user.username,
      `${process.env.BASE_URL}/api/v1/users/varifyPass/${hashedToken}`,
    ),
  });

  return res.status(200).json(
    new ApiResponse(200, {
      message: "User pleaes varify for reset password",
    }),
  );
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiResponse(400, { message: "all feilds are required" }, error);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiResponse(400, { message: "user not found" }, error);
  }

  (await user).password = password;
  await user.save();

  res
    .status(200)
    .json(
      new ApiResponse(200, { message: "succesfully password updated" }, error),
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  console.log(user);

  if (!user) {
    return res
      .status(400)
      .json(new ApiResponse(400, { message: "user not found in database" }));
  }
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
  resetForgottenPasswordVarify,
};
