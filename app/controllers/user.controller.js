import User from "../models/user.model.js";
import * as Yup from "yup";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
const { hashSync, genSaltSync, compareSync } = bcryptjs;

const schema = Yup.object().shape({
  first_name: Yup.string("enter user first name").required(
    "first_name is required"
  ),
  last_name: Yup.string("enter user last name").required(
    "last name is required"
  ),
  email: Yup.string("enter valid email")
    .email("enter valid email")
    .required("email is required"),
  password: Yup.string("enter a password").required("password is required"),
});

export const createUser = async (req, res) => {
  try {
    const validatedData = await schema.validate(req.body, {
      abortEarly: false,
    });
    let isNewUser = await User.findByEmail(req.body.email);
    if (isNewUser.length) {
      return res.status(400).send({
        message: "User already present",
      });
    }
    const salt = genSaltSync(10);
    const userData = {
      ...validatedData,
      password: hashSync(validatedData.password, salt),
    };
    const result = await User.create(new User(userData));
    const user={id:result.insertId,...userData}
    user.password=undefined
    const jsontoken = jsonwebtoken.sign(
      { user: user },
      process.env.SECRET_KEY,
      { expiresIn: "30m" }
    );
    res.cookie("token", jsontoken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Number(new Date()) + 30 * 60 * 1000),
    });
    res.json({ token: jsontoken, user });
  } catch (error) {
    logger.error(error)
    res.status(500).send({
      message: `error occured while creating user`,
      error: error,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({ message: "email and password required" });
      return;
    }
    let user = await User.findByEmail(email);
    user = user[0];
    if (!user) {
      return res.status(400).send({
        message: "Invalid email or password",
      });
    }

    const isValidPassword = compareSync(password, user.password);
    if (isValidPassword) {
      user.password = undefined;
      const jsontoken = jsonwebtoken.sign(
        { user: user },
        process.env.SECRET_KEY,
        { expiresIn: "30m" }
      );
      res.cookie("token", jsontoken, {
        httpOnly: true,
        secure: false,
        SameSite: "strict",
        expires: new Date(Number(new Date()) + 30 * 60 * 1000),
      }); 

      res.json({ token: jsontoken, user });
    } else {
      return res.json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    logger.error(error)
    res.status(500).send({
      message: "error occured while login user",
      error: error,
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
