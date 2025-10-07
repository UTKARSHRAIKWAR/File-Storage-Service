import { Router } from "express";
import {
  deleteFile,
  getFile,
  uploadFile,
} from "../controllers/file.controller.js";
import upload from "../middlewares/multer.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/upload", auth, upload.single("file"), uploadFile);
router.get("/:id", getFile);
router.delete("/:id", deleteFile);

export default router;
