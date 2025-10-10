import { Router } from "express";
import {
  deleteFile,
  getFile,
  listFile,
  previewFile,
  shareFile,
  uploadFile,
} from "../controllers/file.controller.js";
import upload from "../middlewares/multer.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", auth, listFile);
router.post("/upload", auth, upload.single("file"), uploadFile);
router.get("/:id", auth, getFile);
router.get("/share/:id", auth, shareFile);
router.get("/preview/:id", auth, previewFile);
router.delete("/:id", auth, deleteFile);

export default router;
