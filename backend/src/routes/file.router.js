import { Router } from "express";
import {
  deleteFile,
  getFile,
  shareFile,
  uploadFile,
} from "../controllers/file.controller.js";
import upload from "../middlewares/multer.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/upload", auth, upload.single("file"), uploadFile);
router.get("/:id", auth, getFile);
router.get("/share/:id", auth, shareFile);
router.delete("/:id", auth, deleteFile);

export default router;
