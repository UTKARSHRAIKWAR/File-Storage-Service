import { Router } from "express";
import { uploadFile } from "../controllers/file.controller";
import upload from "../middlewares/multer";

const router = Router();

router.post("/upload", upload.single("file"), uploadFile);

export default router;
