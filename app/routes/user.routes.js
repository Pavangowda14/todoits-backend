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
router.get("/verify-token", verifyToken, (req, res) => {
  res.status(200).json({
    message: "Token is valid",
    user: req.user,
  });
});
// router.get("/", findAllUser);
// router.delete("/remove/:id", deleteById);
// router.put("/update/:id", updateById);
// router.get("/:id", findById);

export default router;
