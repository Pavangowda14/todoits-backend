import express from "express";
import { createTask, deleteById, findAllTask, findById, findByProjectId, updateById } from "../controllers/task.controller.js";

const router=express.Router()

router.post("/new",createTask)
router.get("/",findAllTask)
router.delete("/remove/:id",deleteById)
router.put("/update/:id",updateById)
router.get("/projectid/:id",findByProjectId)
router.get("/:id",findById)

export default router;