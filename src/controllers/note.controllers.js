import {ApiResponse} from "../utils/api-responce.js";
import {asyncHandler} from "../utils/async-handler.js";
import{ProjectNote} from "../models/note.models.js";

  const getNotes = asyncHandler(async (req, res) => {
    const {projectId} = req.params.projectId
    console.log(projectId)

    const projectNotes = await ProjectNote.findById(projectId)
    console.log("hii")
    console.log(projectNotes);
    
  });
  
  const getNoteById = asyncHandler(async (req, res) => {
    // get all notes
  });
  
  const createNote = asyncHandler(async (req, res) => {
    // get all notes
  });
  
  const updateNote = asyncHandler(async (req, res) => {
    // get all notes
  });
  
  const deleteNote = asyncHandler(async (req, res) => {
    // get all notes
  });
  
  export { createNote, deleteNote, getNoteById, getNotes, updateNote };
  