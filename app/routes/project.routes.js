import express from "express";
import { createProject, deleteAll, deleteById, findAllProject, findById, updateById } from "../controllers/project.controller.js";

const router=express.Router()

router.post("/new",createProject)
router.get("/",findAllProject)
router.get("/:id",findById)
router.delete("/remove/:id",deleteById)
router.delete("/removeall",deleteAll)
router.put("/update/:id",updateById)

export default router;