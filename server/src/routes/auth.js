import express from "express";
import { auth, signup, logout } from "../controller/AuthController.js";

const router = express.Router();

router.post("/", auth);
router.post("/signup", signup);
router.post("/logout", logout);

export default router;