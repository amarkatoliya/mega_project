import { ApiResponse } from "../utils/api-responce.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ProjectNote } from "../models/note.models.js";
import mongoose from "mongoose";

const getNotes = asyncHandler(async (req, res) => {
  // const {projectId} = req.params.projectId
  // console.log(projectId)
  // const projectNotes = await ProjectNote.findById(projectId)
  // console.log("hii")
  // console.log(projectNotes);
});

const getNoteById = asyncHandler(async (req, res) => {
  const noteId = req.params.id;

  const getNote = ProjectNote.findOne({ noteId });
  if (!getNote) {
    throw new ApiResponse(400, null, "id not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, noteId, "Invalid ID format"));
});

const createNote = asyncHandler(async (req, res) => {
  const { project, createdBy, content } = req.body;

  if (!project || !createdBy || !content) {
    throw new ApiResponse(400, { message: "all feilds are neccessory" });
  }

  const newNote = new ProjectNote({
    project,
    createdBy,
    content,
  });
  if (!newNote) {
    throw new ApiResponse(400, { message: "note is not created" });
  }
  await newNote.save();
  return res
    .status(201)
    .json(
      new ApiResponse(201, newNote, {
        message: "new note created succesfully",
      }),
    );
});

const updateNote = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const { content } = req.body;

  const updatedNote = await ProjectNote.findByIdAndUpdate(req.params.id, {
    content,
  });
  if (!updatedNote) {
    return res.status(404).json(new ApiResponse(404, null, "Note not found"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updatedNote, "Note updated successfully"));
});

const deleteNote = asyncHandler(async (req, res) => {
  const noteId = req.params.id;

  // Optional: Check if it's a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Invalid ID format"));
  }

  const deletedNote = await ProjectNote.findByIdAndDelete(noteId);

  if (!deletedNote) {
    return res.status(404).json(new ApiResponse(404, null, "Note not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedNote, "Note deleted successfully"));
});

export { createNote, deleteNote, getNoteById, getNotes, updateNote };
