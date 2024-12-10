import express from "express";
import { createTask, deleteById, findAllTask, findById, updateById } from "../controllers/task.controller.js";

const router=express.Router()

router.post("/new",createTask)
router.get("/",findAllTask)
router.delete("/remove/:id",deleteById)
router.put("/update/:id",updateById)
router.get("/:id",findById)

export default router;