import express from "express";
import {
  createUser,
  deleteById,
  findAllUser,
  findById,
  loginUser,
  updateById,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
// router.get("/", findAllUser);
// router.delete("/remove/:id", deleteById);
// router.put("/update/:id", updateById);
// router.get("/:id", findById);

export default router;
