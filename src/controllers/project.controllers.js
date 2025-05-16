import { Project } from "../models/project.models.js";
import { ApiResponse } from "../utils/api-responce.js";
import { ProjectMember } from "../models/projectmember.models.js";

import mongoose from "mongoose";

const getProjects = async (req, res) => {
  // get all projects
};

const getProjectById = async (req, res) => {
  const projectId = req.params.id;

  if (!projectId) {
    throw new ApiResponse(400, null, "projectId not found");
  }

  const id = await Project.findById(projectId);

  if (!id) {
    throw new ApiResponse(400, null, "projectId not matched in db");
  }

  return res.status(200).json(new ApiResponse(200, id, "Here is your project"));
};

const createProject = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    throw new ApiResponse(400, { message: "all feilds are required" });
  }

  const newProject = await Project.create({
    name,
    description,
    createdBy: req.user._id,
  });

  if (!newProject) {
    throw new ApiResponse(400, null, "error creating project");
  }
  await newProject.save();
  return res
    .status(200)
    .json(new ApiResponse(200, newProject, "new project created succesfullt"));
};

const updateProject = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    throw new ApiResponse(400, { message: "all feilds are required" });
  }

  const updatedProject = await Project.findByIdAndUpdate(req.params.id, {
    name,
    description,
  });

  if (!updatedProject) {
    return res.status(400).json(new ApiResponse(400, null, "Invalid Request"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProject, "project updated"));
};

const deleteProject = async (req, res) => {
  const projectId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new ApiResponse(400, null, "Invalid Id Format");
  }

  const deletedProject = await Project.findByIdAndDelete(projectId);

  if (!deletedProject) {
    return res.status(400).json(new ApiResponse(400, null, "Invalid Request"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, projectId, "project succesfully deleted"));
};

const getProjectMembers = async (req, res) => {
  // get project members
};

const addMemberToProject = async (req, res) => {
  // add member to project
};

const deleteMember = async (req, res) => {
  // delete member from project
};

const updateMemberRole = async (req, res) => {
  // update member role
};

export {
  addMemberToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getProjects,
  updateMemberRole,
  updateProject,
};
