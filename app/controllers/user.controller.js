import User from "../models/user.model.js";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string("enter user name").required("name is required"),
  email: Yup.string("enter valid email").email("enter valid email").required("email is required"),
});

export const createUser = async (req, res) => {
  try {
    const validatedData = await schema.validate(req.body, {
      abortEarly: false,
    });
    const result = await User.create(new User(validatedData));
    res.status(201).send({ result });
  } catch (error) {
    res.status(500).send({
      message: "error occured while creating user",
      error: error.errors,
    });
  }
};

export const findAllUser = async (req, res) => {
  try {
    const result = await User.findAll();
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({
      message: "error occured while retrieving user",
      error: error.message,
    });
  }
};

export const deleteById = async (req, res) => {
  try {
    const result = await User.delete(req.params.id);
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({
      message: "error occured while deleting user",
      error: error.message,
    });
  }
};

export const updateById = async (req, res) => {
  try {
    const validatedData = await schema.validate(req.body, {
      abortEarly: false,
    });
    const result = await User.updateById(
      req.params.id,
      new User(validatedData)
    );
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({
      message: "error occured while updating user",
      error: error.errors,
    });
  }
};

export const findById = async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({
      message: "error occured while retrieving user",
      error: error.message,
    });
  }
};
