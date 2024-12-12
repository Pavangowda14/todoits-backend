import express from "express";
import { createUser, deleteById, findAllUser, findById, updateById } from "../controllers/user.controller.js";

const router=express.Router();

router.post("/new", createUser);
router.get("/", findAllUser);
router.delete("/remove/:id", deleteById);
router.put("/update/:id", updateById);
router.get("/:id", findById);

export default router;
