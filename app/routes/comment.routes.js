import express from "express";
import { createComment, deleteById, findAllComment, findById, updateById } from "../controllers/comment.controller.js";

const router = express.Router()

router.post("/new",createComment)
router.get("/",findAllComment)
router.delete("/remove/:id", deleteById);
router.put("/update/:id", updateById);
router.get("/:id", findById);

export default router;