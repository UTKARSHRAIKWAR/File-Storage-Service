import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("failed to connect MongoDb", error);
    process.exit(1);
  }
};

export default connectDB;
