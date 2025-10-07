import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectDB from "./src/utils/connectDB.js";
import userRouter from "./src/routes/user.routes.js";
import filesRoute from "./src/routes/file.router.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use("/temp", express.static("temp"));

app.use("/api/auth", userRouter);
app.use("/api/files", filesRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
