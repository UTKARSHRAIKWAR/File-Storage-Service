import fs from "fs";
import s3 from "../config/s3.js";
import File from "../models/files.model";
import User from "../models/user.model.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error("No file uploaded");
    }

    const localPath = req.file.path;
    const key = `temp/${Date.now()}-${req.file.originalname}`;

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: fs.createReadStream(localPath),
      contentType: req.file.mimeType,
    };

    await s3.send(new PutObjectCommand(uploadParams));
    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    fs.unlinkSync(localPath);

    //save metaData to database
    const newFile = await File.Create({
      ownerId: User.id,
      
    });
  } catch (error) {
    console.log("Upload error", error);
    res.status(500);
    throw new Error("File upload error");
  }
};
const getFile = async (req, res) => {};
const listFile = async (req, res) => {};
const deleteFile = async (req, res) => {};
const shareFile = async (req, res) => {};

export { uploadFile, getFile, listFile, deleteFile, shareFile };
