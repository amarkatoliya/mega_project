import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  updateProject,
} from "../controllers/project.controllers.js";
import { isLoggedIn } from "../middlewares/isLoggedin.middleware.js";

const router = Router();

router.route("/").post(isLoggedIn, createProject);
router.route("/delete/:id").delete(isLoggedIn, deleteProject);
router.route("/update/:id").patch(isLoggedIn, updateProject);
router.route("/get-project/:id").get(isLoggedIn, getProjectById)

export default router;
