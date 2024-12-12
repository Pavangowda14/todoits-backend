import Project from "../models/project.model.js";
import * as Yup from "yup";

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
  try {
    const validatedData = await schema.validate(req.body, {
      abortEarly: false,
    });

    const project = new Project(validatedData);
    const result = await Project.create(project);

    res.status(201).send({ result });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).send({
        message: "Validation error",
        errors: error,
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
    const result = await Project.findAll();
    res.status(200).send({ result });
  } catch (error) {
    res
      .status(500)
      .send({
        message: "error occured while retrieving projects",
        error: error.message,
      });
  }
};

export const deleteById = async (req, res) => {
  try {
    const result = await Project.delete(req.params.id);
    res.status(200).send({ result });
  } catch (error) {
    res
      .status(500)
      .send({
        message: "error occured while deleting project",
        error: error.message,
      });
  }
};

export const deleteAll = async (req, res) => {
  try {
    const result = await Project.deleteAll();
    res.status(200).send({ result });
  } catch (error) {
    res
      .status(500)
      .send({
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
    res.status(200).send({ result });
  } catch (error) {
    res
      .status(500)
      .send({
        message: "error occured while updating project",
        error: error.message,
      });
  }
};

export const findById = async (req, res) => {
  try {
    const result = await Project.findById(req.params.id);
    res.status(200).send({ result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        message: "error occured while retrieving project",
        error: error.message,
      });
  }
};
