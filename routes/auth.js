import express from "express";
import { signUp, signIn, googleAuth } from "../controllers/authController.js";

const router = express.Router();

//create user
router.post("/signUp", signUp);

//signIn
router.post("/signIn", signIn);

//Google Authentication
router.post("/google", googleAuth)

export default router;
