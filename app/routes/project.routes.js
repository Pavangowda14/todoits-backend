import express from "express";
import { createProject, deleteAll, deleteById, findAllProject, updateById } from "../controllers/project.controller.js";

const router=express.Router()

router.post("/new",createProject)
router.get("/",findAllProject)
router.delete("/remove/:id",deleteById)
router.delete("/removeall",deleteAll)
router.put("/update/:id",updateById)

export default router;