import express from "express";
import { auth, signup, logout, profile } from "../controller/AuthController.js";
import sessionValidate from "../middlewares/sessionValidate.js";

const router = express.Router();

router.post("/", auth);
router.post("/signup", signup);
router.post("/logout", sessionValidate, logout);
router.get("/profile", sessionValidate, profile);

export default router;