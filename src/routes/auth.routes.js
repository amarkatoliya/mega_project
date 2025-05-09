
import { Router } from "express";
import {registerUser, verifyEmail} from "../controllers/auth.controllers.js";
import {validate} from "../middlewares/validator.middleware.js";
import {userRegisterValidator} from "../validators/index.js";

const router = Router();

router.route("/register").post(userRegisterValidator(),validate,registerUser);

// router.route("/varify").post(verifyEmail)

export default router;