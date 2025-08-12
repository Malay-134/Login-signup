import express from "express";
import { verifyToken } from "../Middlewares/authMiddleware.js";
import { addTask, getTasks } from "../controllers/taskController.js";

const router = express.Router();

router.post("/add", verifyToken, addTask);
router.get("/", verifyToken, getTasks);

export default router;
