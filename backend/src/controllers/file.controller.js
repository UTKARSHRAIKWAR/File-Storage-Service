import fs from "fs";
import s3 from "../config/s3.js";
import File from "../models/files.model.js";
import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const uploadFile = async (req, res) => {
  const userId = req.user._id;

  try {
    if (!req.file) {
      res.status(400);
      throw new Error("No file uploaded");
    }

    const localPath = req.file.path;
    const key = `${userId}/${Date.now()}-${req.file.originalname}`;

    //aws upload
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: fs.createReadStream(localPath),
      ContentType: req.file.mimetype,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    //save metaData to database
    const newFile = await File.create({
      ownerId: userId,
      fileName: req.file.originalname,
      size: req.file.size,
      key: key,
      mimeType: req.file.mimetype,
    });

    fs.unlinkSync(localPath);

    res.status(200).json({ success: true, file: newFile });
  } catch (error) {
    console.error("Upload error", error);
    res.status(500);
    throw new Error("File upload error");
  }
};
const getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      res.status(404);
      throw new Error("File not found");
    }
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.key,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    res.status(200).json({
      success: true,
      url,
    });
  } catch (error) {
    res.status(500);
    throw new Error("could not generate url");
  }
};
const deleteFile = async (req, res) => {
  try {
    const file = await File.findByIdAndDelete(req.params.id);
    if (!file) {
      res.status(404);
      throw new Error("file not found");
    }

    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.key,
      })
    );

    res.status(200).json({ success: true, message: "File deleted" });
  } catch (error) {
    res.status(500);
    throw new Error("Failed to delete file");
  }
};
const shareFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      res.status(404);
      throw new Error("File not found");
    }
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.key,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 86400 });

    res.status(200).json({
      success: true,
      shareUrl: url,
    });
  } catch (error) {
    res.status(500);
    throw new Error("could not generate url");
  }
};
const listFile = async (req, res) => {
  try {
    const userId = req.user._id;
    const files = await File.find({ ownerId: userId }).select(
      "fileName size mimeType key uploadedAt"
    );
    res.status(200).json({ success: true, files });
  } catch (error) {
    res.status(500);
    throw new Error("could not list files");
  }
};

export { uploadFile, getFile, listFile, deleteFile, shareFile };
