
import { Router } from "express";

import {forgotPasswordRequest,
        loginUser,
        logoutUser,
        registerUser,
        resetForgottenPassword,
        resetForgottenPasswordVarify,
        verifyEmail
    } from "../controllers/auth.controllers.js";

import {validate} from "../middlewares/validator.middleware.js";
import {userLoginValidator, userRegisterValidator} from "../validators/index.js";

const router = Router();

router.route("/register").post(userRegisterValidator(),validate,registerUser);
router.route("/varify/:hashedToken").post(verifyEmail);
router.route("/login").post(userLoginValidator(),validate,loginUser);
router.route("/logout").post(logoutUser);
router.route("/forgetPass").post(forgotPasswordRequest);
router.route("/varifyPass/:hashedToken").post(resetForgottenPasswordVarify)
router.route("/resetPass").post(resetForgottenPassword);


export default router;