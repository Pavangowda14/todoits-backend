import Project from "../models/project.model.js";
import * as Yup from "yup";
import logger from "../utils/logger.js";

const schema = Yup.object().shape({
  project_name: Yup.string().required("Project name is required"),
  color: Yup.string().strict().required("Color is required"),
  is_favorite: Yup.boolean("is_favorite must be a boolean value").notRequired(),
  user_id: Yup.number()
    .positive("User ID must be a positive number")
    .integer("User ID must be an integer")
    .required("User ID is required"),
});

export const createProject = async (req, res) => {
  console.log(req.body)
  try {
    const validatedData = await schema.validate(req.body, {
      abortEarly: false,
    });

    const project = new Project(validatedData);
    const result = await Project.create(project);
    logger.info("Project created successfully");
    res.status(201).send({ data: { id: result.insertId, ...project } });
  } catch (error) {
    logger.error(`error occured while creating project ${error.message}`);
    if (error.name === "ValidationError") {
      return res.status(400).send({
        message: "Validation error",
        errors: error.errors,
      });
    }

    res.status(500).send({
      message: "An error occurred while creating the project",
      error: error.message,
    });
  }
};

export const findAllProject = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    const userId=req.user.id
    const result = await Project.findAll(userId,offset, limit);
    logger.info("Project retrieved successfully");
    res.status(200).send({ data: result});
  } catch (error) {
    logger.error(`error occured while retrieving projects ${error.message}`);
    res.status(500).send({
      message: "error occured while retrieving projects",
      error: error.message,
    });
  }
};

export const deleteById = async (req, res) => {
  try {
    const result = await Project.delete(req.params.id);
    logger.info("Project deleetd successfully");
    res.status(200).send({ data: result });
  } catch (error) {
    logger.error(`error occured while deleting project ${error.message}`);
    res.status(500).send({
      message: "error occured while deleting project",
      error: error.message,
    });
  }
};

export const deleteAll = async (req, res) => {
  try {
    const result = await Project.deleteAll();
    logger.info("Project deleted successfully");
    res.status(200).send({ data: result });
  } catch (error) {
    logger.error(`error occured while deleting projects ${error.message}`);
    res.status(500).send({
      message: "error occured while deleting projects",
      error: error.message,
    });
  }
};

export const updateById = async (req, res) => {
  try {
    const validatedData = await schema.validate(req.body, {
      abortEarly: false,
    });
    const result = await Project.updateById(
      req.params.id,
      new Project(validatedData)
    );
    logger.info("Project updated successfully");
    res.status(200).send({ data: result });
  } catch (error) {
    logger.error(`error occured while updating projects ${error.message}`);
    if (error.name === "ValidationError") {
      return res.status(400).send({
        message: "Validation error",
        errors: error.errors,
      });
    }
    res.status(500).send({
      message: "error occured while updating project",
      error: error.errors,
    });
  }
};

export const findById = async (req, res) => {
  try {
    const result = await Project.findById(req.params.id);
    logger.info("Project retrieving successfully");
    res.status(200).send({ data: result[0] });
  } catch (error) {
    logger.error(`error occured while retrieving project ${error.message}`);
    res.status(500).send({
      message: "error occured while retrieving project",
      error: error.message,
    });
  }
};
