import { Router } from "express";
import { uploadFile } from "../controllers/file.controller.js";
import upload from "../middlewares/multer.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/upload", auth, upload.single("file"), uploadFile);

export default router;
