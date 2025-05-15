import { Router } from "express";

import {
  changeCurrentPassword,
  forgotPasswordRequest,
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  resetForgottenPassword,
  resetForgottenPasswordVarify,
  verifyEmail,
} from "../controllers/auth.controllers.js";

import { validate } from "../middlewares/validator.middleware.js";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/index.js";
import { isLoggedIn } from "../middlewares/isLoggedin.middleware.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/varify/:hashedToken").post(verifyEmail);
router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/logout").post(logoutUser);
router.route("/forgetPass").post(forgotPasswordRequest);
router.route("/varifyPass/:hashedToken").post(resetForgottenPasswordVarify);
router.route("/resetPass").post(resetForgottenPassword);
router.route("/changePass").post(changeCurrentPassword);
router.route("/getUser").get(isLoggedIn, getCurrentUser);

export default router;
