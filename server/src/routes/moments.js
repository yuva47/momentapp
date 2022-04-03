import express from "express";
import { getMomentById, getMoments, delelteMoment, updateMoment, createMoment, getImage } from "../controller/MomentController.js";
import upload from "../lib/mutler.js";
import sessionValidate from "../middlewares/sessionValidate.js"
const router = express.Router();

router.get("/", sessionValidate, getMoments);
router.get("/image/:id", sessionValidate, getImage);
router.get("/:id", sessionValidate, getMomentById);
router.post("/", sessionValidate, upload.single("image"), createMoment);
router.put("/:id", sessionValidate, upload.single("image"), updateMoment);
router.delete("/:id", sessionValidate, delelteMoment);


export default router;