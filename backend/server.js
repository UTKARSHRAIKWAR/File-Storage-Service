import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB.js";

dotenv.config();
connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("Working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
