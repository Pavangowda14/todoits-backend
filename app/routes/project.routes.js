import express from "express";
import {
  createProject,
  deleteAll,
  deleteById,
  findAllProject,
  findById,
  updateById,
} from "../controllers/project.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", verifyToken,createProject);
router.get("/",verifyToken, findAllProject);
router.get("/:id",verifyToken, findById);
router.delete("/remove/:id",verifyToken, deleteById);
router.delete("/removeall",verifyToken, deleteAll);
router.put("/update/:id",verifyToken, updateById);

export default router;
