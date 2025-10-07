import mongoose from "mongoose";
import { type } from "os";

const fileSchema = mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
    },
  },
  { timestamps: true }
);

const fileModel = mongoose.model("File", fileSchema);

export default fileModel;
