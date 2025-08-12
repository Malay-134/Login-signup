import express from "express";
import { login, signUp } from "../controllers/authController.js";
import {
  loginValidation,
  signUpValidation,
} from "../Middlewares/authValidation.js";

const router = express.Router();

router.post("/signUp", signUpValidation, signUp);

router.post("/login", loginValidation, login);

export default router;
