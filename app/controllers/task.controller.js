import Task from "../models/task.model.js";
import * as Yup from "yup";

const schema = Yup.object().shape({
  content: Yup.string().required("task content is required"),
  description: Yup.string().strict().required("task description is required"),
  due_date: Yup.date("due date should be in date format").required(
    "due date is required"
  ),
  is_completed: Yup.boolean(
    "is_completed must be a boolean value"
  ).notRequired(),
  project_id: Yup.number()
    .positive("project ID must be a positive number")
    .integer("project ID must be an integer")
    .required("project ID is required"),
});

export const createTask = async (req, res) => {
  try {
    const validatedData = await schema.validate(req.body, {
      abortEarly: false,
    });
    const result = await Task.create(new Task(validatedData));
    res.status(201).send({ result });
  } catch (error) {
    res.status(500).send({
      message: "error occured while creating project",
      error: error.errors,
    });
  }
};

export const findAllTask = async (req, res) => {
  try {
    const filter = req.query;
    const result = await Task.findAll(filter);
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({
      message: "error occured while retrieving task",
      error: error.message,
    });
  }
};

export const deleteById = async (req, res) => {
  try {
    const result = await Task.delete(req.params.id);
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({
      message: "error occured while deleting task",
      error: error.message,
    });
  }
};

export const updateById = async (req, res) => {
  try {
    const validatedData = await schema.validate(req.body, {
      abortEarly: false,
    });
    const result = await Task.updateById(
      req.params.id,
      new Task(validatedData)
    );
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({
      message: "error occured while updating task",
      error: error.errors,
    });
  }
};

export const findById = async (req, res) => {
  try {
    const result = await Task.findById(req.params.id);
    res.status(200).send({ result });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error occured while retrieving task",
      error: error.message,
    });
  }
};
