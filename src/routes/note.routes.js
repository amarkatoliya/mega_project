import { Router } from "express";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "../controllers/note.controllers.js";

const router = Router();

router.route("/getNote/:projectId").get(getNotes);
router.route("/create-note").post(createNote);
router.route("/delete/:id").delete(deleteNote);
router.route("/update-note/:id").patch(updateNote);
router.route("/get-note/:id").get(getNoteById);

export default router;
